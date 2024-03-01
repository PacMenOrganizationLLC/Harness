import string
import docker
import random
import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import os

app = FastAPI()
client = docker.from_env()

TRAEFIK_HOST = os.getenv("TRAEFIK_HOST")
TRAEFIK_PORT = os.getenv("TRAEFIK_PORT")   

def generate_random_string():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))

class ContainerRequest(BaseModel):
    image: str
    duration: int
    internal_port: int = Field(..., alias="internalPort")
    name: str 

    class Config:
        populate_by_name = True


@app.post("/createContainer")
async def create_container(container_request: ContainerRequest):
    asyncio.create_task(end_container())
    delay = container_request.duration * 60  # conver to seconds
    gameName = container_request.name
    random_number = generate_random_string()
    internal_port = container_request.internal_port

    async def end_container():
        containers = client.containers.list(all=True)
        for container in containers:
            if container.status == 'exited':
                container.remove()


    container_config = {
        "image": container_request.image,
        "name": f"{gameName}{random_number}",
        "detach": True,
        "labels": {
            "traefik.enable": "true",
            f"traefik.http.routers.{gameName}{random_number}.entrypoints": "web",
            f"traefik.http.routers.{gameName}{random_number}.rule": f"Host(`{gameName}{random_number}.{TRAEFIK_HOST}`)",
            f"traefik.http.services.{gameName}{random_number}.loadbalancer.server.port": f"{internal_port}",
        },
        "network": "pacmen-harness_default",
        "stop_timeout": delay,
    }

    container = client.containers.run(**container_config)
    container_info = container.attrs
    container_ip = container_info["NetworkSettings"]["IPAddress"]
    asyncio.create_task(end_container(container, delay))
    url = f"{gameName}{random_number}.{TRAEFIK_HOST}:{TRAEFIK_PORT}"

    return {"message": f"{url}"}


@app.post("/pullImage")
async def downloadImage(container_request: ContainerRequest):

    client.images.pull(container_request.image)
