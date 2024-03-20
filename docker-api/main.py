import string
import docker
import random
import asyncio
import threading
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import os

from googleapiclient import discovery
import json


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

class toxicityConfig(BaseModel):
    value: str

def split_text_on_punctuation(text):
    # Use regular expression to split text on punctuation
    return re.split(r'[,.!?]+', text)


@app.post("/createContainer")
async def create_container(container_request: ContainerRequest):
    
    def time_out():
        print(delay)
        container.stop(timeout = delay)
    async def end_container():
        containers = client.containers.list(all=True)
        for container in containers:
            if container.status == 'exited':
                container.remove()
                
    asyncio.create_task(end_container())
    delay = container_request.duration * 60  # conver to seconds
    gameName = container_request.name
    random_number = generate_random_string()
    internal_port = container_request.internal_port



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
    }

    container = client.containers.run(**container_config)
    container_info = container.attrs
    container_ip = container_info["NetworkSettings"]["IPAddress"]
    stop_thread = threading.Thread(target=time_out)
    stop_thread.start()
    url = f"{gameName}{random_number}.{TRAEFIK_HOST}:{TRAEFIK_PORT}"

    return {"message": f"{url}"}


@app.post("/pullImage")
async def downloadImage(container_request: ContainerRequest):

    client.images.pull(container_request.image)


@app.post("/toxicityscore")
def toxicityscoreGet(info: toxicityConfig):
    API_KEY = 'AIzaSyD0YwXo5Eh'

    API_KEY = API_KEY +'LcNbeHK5YJX'
    API_KEY = API_KEY +'YSzPNK1Sryh3s'
    client = discovery.build(
        "commentanalyzer",
        "v1alpha1",
        developerKey=API_KEY,
        discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
        static_discovery=False,
    )
    text_parts = split_text_on_punctuation(info.value)

    # Initialize variables to keep track of the highest toxicity score and its corresponding text
    max_toxicity_score = 0
    max_toxicity_text = ""

    
    for text_part in text_parts:
        if len(text_part) > 0:
            analyze_request = {
                'comment': {'text': text_part},
                'requestedAttributes': {'TOXICITY': {}}
            }

            # Execute the analysis
            response = client.comments().analyze(body=analyze_request).execute()
            toxicity_score = response['attributeScores']['TOXICITY']['summaryScore']['value']

            # Update max toxicity score and corresponding text if the current score is higher
            if toxicity_score > max_toxicity_score:
                max_toxicity_score = toxicity_score
                print(toxicity_score)
                max_toxicity_text = text_part

    # Analyze toxicity for the entire text
    analyze_request = {
        'comment': {'text': info.value},
        'requestedAttributes': {'TOXICITY': {}}
    }
    response = client.comments().analyze(body=analyze_request).execute()
    toxicity_score = response['attributeScores']['TOXICITY']['summaryScore']['value']
    print(toxicity_score)

    # Compare the toxicity score for the entire text with the max toxicity score from individual parts
    if toxicity_score > max_toxicity_score:
        return {toxicity_score}  # Return the toxicity score for the entire text
    else:
        return {max_toxicity_score}  # Return the max toxicity score from individual parts
