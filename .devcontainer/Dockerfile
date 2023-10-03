FROM mcr.microsoft.com/dotnet/sdk:7.0

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y npm && \
    apt-get install -y openssh-server

RUN groupadd --gid 1000 developer \
    && useradd --uid 1000 --gid 1000 -m developer \
    && chown -R developer. /home/developer

USER developer

WORKDIR /app