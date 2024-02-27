import docker
import random
import asyncio
from fastapi import FastAPI, Path

app = FastAPI()
client = docker.from_env()


@app.get('/getContainer/{delay}')
async def get_container(delay: int = 30):
    min_external_port = 3000  # Minimum standard external port
    max_external_port = 8500  # Maximum standard external port

    external_port = random.randint(min_external_port, max_external_port)
    internal_port = 80

    async def endContainer(container, delay):
        await asyncio.sleep(delay)
        container.stop()
        container.remove()

    container_config = {
        'image': 'nginx',
        'detach': True,
        'ports': {f'{internal_port}/tcp': external_port},
        'labels': {
            "traefik.enable": "true",
            "traefik.http.middlewares.mars-stripprefix.stripprefix.prefixes": "/mars",
            "traefik.http.routers.mars.entrypoints": "web",
            "traefik.http.routers.mars.rule": "PathPrefix(`/mars`)",
            "traefik.http.routers.mars.middlewares": "mars-stripprefix@docker"
        },
        # 'environment': {'DEBUG': 'true', 'LOG_LEVEL': 'verbose'}
    }

    container = client.containers.run(**container_config)

    container_info = container.attrs
    container_ip = container_info['NetworkSettings']['IPAddress']
    asyncio.create_task(endContainer(container, delay))
    url = f'144.17.92.11:{external_port}'

    return f'Container is running at: {url} with delay set to {delay} seconds'