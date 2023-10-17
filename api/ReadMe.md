Generate a Controller:
```bash
dotnet aspnet-codegenerator controller -name YourController -async -api -m YourDBSet -dc HarnessContext -outDir Controllers
```
```bash
dotnet ef dbcontext scaffold "host=pacmen_db; database=Pacmen; user id=PacmenUser; password=securepassword" Npgsql.EntityFrameworkCore.PostgreSQL -o models -c HarnessContext2
```

Run Mars Rover:
```bash
docker build . -f .\Mars.Web\Dockerfile -t mars
docker run -p 80:80 mars
```