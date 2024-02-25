FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

COPY ["api.csproj", "api/"]
RUN dotnet restore "api/api.csproj"

COPY . api/
WORKDIR /source/api

RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "api.dll"]