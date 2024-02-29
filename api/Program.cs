using api.Hubs;
using api.models;
using Microsoft.EntityFrameworkCore;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var baseAddress = string.Empty;
if (builder.Environment.IsDevelopment())
{
    baseAddress = "http://localhost:5000";
}
else
{
    baseAddress = Environment.GetEnvironmentVariable("DockerApiUrl");
}

builder.Services.AddSingleton(sp =>
    new HttpClient
    {
        "http://localhost:5000"BaseAddress = new Uri(baseAddress)
    });


builder.Services.AddMvc(o =>
{
    o.SuppressAsyncSuffixInActionNames = false;
});

var connectionString = string.Empty;

if (builder.Environment.IsDevelopment())
{
    connectionString = builder.Configuration["ConnectionString"];
}
else
{
    connectionString = Environment.GetEnvironmentVariable("ConnectionString");
}

builder.Services.AddDbContext<HarnessContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSingleton<FileService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();
app.MapHub<LibraryHub>("/libraryhub");

app.MapHub<WebsocketHub>("/ws/chat");

app.Run();
//Make a function that increases a variable named hi to be one more than its current value
