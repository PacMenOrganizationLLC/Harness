import docker
import random

import asyncio

from fastapi import FastAPI, HTTPException

from pydantic import BaseModel


app = FastAPI()

client = docker.from_env()


TRAEFIK_HOST = os.getenv('TRAEFIK_HOST')


class ContainerRequest(BaseModel):

    image: str

    duration: int
    
    internal_port: int


@app.post('/createContainer')

async def create_container(container_request: ContainerRequest):

    delay = container_request.duration

    gameName = container_request.image.replace('/', '&^4')

    gameName = gameName.replace('\\', '&^4')

    min_external_port = 1 # Minimum standard external port

    max_external_port = 999999  # Maximum standard external port

    random_number = random.randint(min_external_port, max_external_port)

    internal_port = container_request.internal_port


    async def end_container(container, delay):

        await asyncio.sleep(delay)

        container.stop()

        container.remove()


    container_config = {

        'image': container_request.image,

        'detach': True,

        'ports': {f'{internal_port}/tcp'},

        'labels': {

            "traefik.enable": "true",

            f"traefik.http.routers.{gameName}{random_number}.entrypoints": "web",

            f"traefik.http.routers.{gameName}{random_number}.rule": f"Host(`{gameName}{random_number}.{TRAEFIK_HOST}`)",

            f'traefik.http.services.{gameName}{random_number}.loadbalancer.server.port': f"{internal_port}"

        },

        'network': 'pacmen-harness_default'

    }


    container = client.containers.run(**container_config)


    container_info = container.attrs

    container_ip = container_info['NetworkSettings']['IPAddress']

    asyncio.create_task(end_container(container, delay))

    url = f'{gameName}{random_number}.{TRAEFIK_HOST}'


    return {'message': f'{url}'}




@app.post('/pullImage')

async def downloadImage(container_request: ContainerRequest):

    client.images.pull(container_request.image)

   

