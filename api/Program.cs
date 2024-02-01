using api.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using api.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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

builder.Services.AddHttpClient("GameAPI");

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("GameAPI"));

builder.Services.AddMvc(o =>
{
    o.SuppressAsyncSuffixInActionNames = false;
});

var connectionString = builder.Configuration["ConnectionString"];

builder.Services.AddDbContext<HarnessContext>(options =>
    options.UseNpgsql(connectionString));

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
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.MapHub<WebsocketHub>("/ws/chat");

app.Run();
//Make a function that increases a variable named hi to be one more than its current value
