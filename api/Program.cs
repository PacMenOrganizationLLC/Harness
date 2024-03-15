using api.Hubs;
using api.models;
using Microsoft.EntityFrameworkCore;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


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
      BaseAddress = new Uri(baseAddress)
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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.Authority = "https://harnesskc.duckdns.org:25651/realms/harness";
      options.Audience = "harness";
      options.TokenValidationParameters = new TokenValidationParameters
      {
        RoleClaimType = "groups",
      };
      options.Events = new JwtBearerEvents
      {
        OnMessageReceived = context =>
        {
          if (context.Request.Cookies.ContainsKey("jwt"))
          {
            context.Token = context.Request.Cookies["jwt"];
          }
          return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
          Console.WriteLine("Authentication failed");
          Console.WriteLine(context.Exception);

          context.NoResult();

          context.Response.StatusCode = 500;
          context.Response.ContentType = "text/plain";

          return context.Response.WriteAsync("An error occurred processing your authentication.");
        },
        OnForbidden = context =>
        {
          Console.WriteLine("Forbidden");
          Console.WriteLine(context.ToString());
          context.Response.StatusCode = 403;
          return Task.CompletedTask;
        }
      };
    });

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
