using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SessionConfigController : ControllerBase
{
  private readonly HarnessContext _context;
  private readonly HttpClient gameApi;

  public SessionConfigController(HarnessContext context, HttpClient gameApi)
  {
    _context = context;
    this.gameApi = gameApi;
  }

  [HttpGet("{gameId}")]
  public async Task<ActionResult<IEnumerable<SessionConfig>>> GetSessionConfigs(int gameId)
  {
    List<SessionConfig> sessionConfig = await _context.SessionConfig.Where(c => c.GameId == gameId).OrderBy(c => c.Name).ToListAsync();
    return sessionConfig;
  }

  [HttpPost]
  public async void AddSessionConfig(SessionConfig sessionConfig)
  {
    _context.SessionConfig.Add(sessionConfig);
    try
    {
      await _context.SaveChangesAsync();
    }
    catch
    {

    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateSessionConfig(int id, SessionConfig sessionConfig)
  {
    if (id != sessionConfig.Id)
    {
      return BadRequest();
    }

    SessionConfig? existingSessionConfig = await _context.SessionConfig.FindAsync(id);

    if (existingSessionConfig != null)
    {
      existingSessionConfig.Name = sessionConfig.Name;
      existingSessionConfig.JsonConfig = sessionConfig.JsonConfig;

      await _context.SaveChangesAsync();
      return Ok("Updated Session Config Successfully");
    }

    return NotFound();
  }


  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteSessionConfig(int id)
  {
    SessionConfig? sessionConfig = await _context.SessionConfig.FindAsync(id);
    if (sessionConfig == null)
    {
      return NotFound();
    }

    _context.SessionConfig.Remove(sessionConfig);
    await _context.SaveChangesAsync();

    return Ok("Session Config Deleted Successfully");
  }

  [HttpGet("template/{gameId}")]
  public async Task<List<GameConfigTemplate>> GetGameTemplateConfiguration(int gameId)
  {
    string? url = _context.Game.Where(g => g.Id == gameId).Select(g => g.ApiUrl).FirstOrDefault();
    var response = await gameApi.GetFromJsonAsync<List<GameConfigTemplate>>(url + "/config");
    return await Task.FromResult(response);
  }
}