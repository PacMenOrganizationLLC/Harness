import string
import docker
import random
import asyncio
import threading
import re
import time
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
    while True:
        if container.status == "running":
            break
        time.sleep(.5)
    return {"message": f"{url}"}


@app.post("/pullImage")
async def downloadImage(container_request: ContainerRequest):

    client.images.pull(container_request.image)


@app.post("/toxicityscore")
def toxicityscoreGet(info: toxicityConfig):
    return toxicityScoreRun(info)

@app.post("/spamtoxicityapi")
def spamScore():
    spamTarget = toxicityConfig(value = "a")
    for i in range(120):
        time.sleep(.5)
        print(i)
        toxicityScoreRun(spamTarget)

def toxicityScoreCall(text: str, client):
    retry_delay = 5  # Initial retry delay in seconds
    max_delay = 60   # Maximum retry delay in seconds

    trying = True  # Flag to ensure the function is retried only once

    max_tries = 5
    tries = 0
    while trying:
        try:
            # Your original function logic goes here
            analyze_request = {
                'comment': {'text': text},
                'requestedAttributes': {'TOXICITY': {}}
            }
            response = client.comments().analyze(body=analyze_request).execute()

            print(response)
            toxicity_score = response['attributeScores']['TOXICITY']['summaryScore']['value']
            trying = False
            return toxicity_score

        except Exception as e:
            # Handle the failure and retry if necessary
            print(f"Encountered an error: {e}")
            print(f"Retrying after {retry_delay} seconds...")
            time.sleep(retry_delay)
            tries +=1
            if(tries >= max_tries):
                trying = False
            # Increment retry delay exponentially, up to the maximum delay
            retry_delay = min(retry_delay +4, max_delay)

def toxicityScoreRun(info: toxicityConfig):
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
            toxicity_score = toxicityScoreCall(text_part, client)

            # Update max toxicity score and corresponding text if the current score is higher
        if toxicity_score > max_toxicity_score:
            max_toxicity_score = toxicity_score
            print(toxicity_score)
            max_toxicity_text = text_part

    # Analyze toxicity for the entire text
    toxicity_score = toxicityScoreCall(info.value, client)
    print(toxicity_score)

    # Compare the toxicity score for the entire text with the max toxicity score from individual parts
    if toxicity_score > max_toxicity_score:
        return {toxicity_score}  # Return the toxicity score for the entire text
    else:
        return {max_toxicity_score}  # Return the max toxicity score from individual parts