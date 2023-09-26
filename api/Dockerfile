FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

COPY ./api/*.csproj ./
RUN dotnet restore

COPY ./api/ ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 5000

# Set environment variables if necessary
# ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "api.dll"]
