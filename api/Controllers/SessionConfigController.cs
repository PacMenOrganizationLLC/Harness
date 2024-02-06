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
  public async Task<ActionResult<List<GameConfigTemplate>>> GetGameTemplateConfiguration(int gameId)
  {

    Game? currentGame = await _context.Game.FirstOrDefaultAsync(g => g.Id == gameId);
    string? url = await _context.GameEndpoint
                                .Where(g => g.GameId == gameId && g.EndpointTypeId == 2)
                                .Select(g => g.Endpoint)
                                .FirstOrDefaultAsync();

    if (string.IsNullOrWhiteSpace(url))
    {
      if (currentGame != null)
      {
        return BadRequest($"Error getting game configuration template for game {currentGame.Name}. Please make sure you've provided the endpoint.");
      }
      return BadRequest("Error getting game configuration template. Please make sure you've provided the endpoint.");
    }

    try
    {
      // Retrieve game configuration template from the provided URL
      var response = await gameApi.GetFromJsonAsync<List<GameConfigTemplate>>(url);
      return Ok(response);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      if (currentGame != null)
      {
        return BadRequest($"Error getting game configuration template for game {currentGame.Name} from game API.");
      }
      return BadRequest("Error getting game configuration template from game API.");
    }
  }

}