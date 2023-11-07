using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly HarnessContext _context;
    private HttpClient _httpClient;

    public SessionController(HarnessContext context)
    {
        _context = context;
        _httpClient = new HttpClient();
    }

    [HttpPost]
    public async Task<IActionResult> AddSessionAsync(Session session)
    {
        try
        {
            Competition competition = await _context.Competition
                .Include(c => c.Game)
                .Where(c => c.Id == session.CompetitionId)
                .FirstOrDefaultAsync();

            GameEndpoint gameEndpoint = await _context.GameEndpoint
                .Include(e => e.EndpointType)
                .Where(e => e.EndpointType.Name == "Create Session")
                .Where(t => t.GameId == competition.GameId)
                .FirstOrDefaultAsync();
            // Make the API call and get the response
            if (competition.Game.SupportsMultiSessions == true)
            {
                HttpResponseMessage? myResponse = await _httpClient.PostAsync(gameEndpoint.Endpoint, null);
                CreateSessionResponse data = await myResponse.Content.ReadFromJsonAsync<CreateSessionResponse>();
                session.PlayId = data.GameId;
                session.PlayUrl = data.GameUrl;
            }
            else
            {
                session.PlayUrl = competition.Game.HostUrl;
                session.PlayId = "Single";
            }
            _context.Session.Add(session);

            await _context.SaveChangesAsync();

            return Ok("Added Session Successfully");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("Error creating session");
        }

    }


    [HttpGet("competition/{competitionId}")]
    public async Task<ActionResult<IEnumerable<Session>>> GetSessionsAsync(int competitionId)
    {
        List<Session> sessions = await _context.Session.Where(s => s.CompetitionId == competitionId).ToListAsync();
        return sessions;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Session>> GetSessionAsync(int id)
    {
        Session? session = await _context.Session.Where((s) => s.Id == id).FirstOrDefaultAsync();

        if (session == null)
            return NotFound();

        return session;
    }

    [HttpGet("getConfigs/{sessionId}")]
    public async Task<List<SessionConfig>> GetSessionConfigs(int sessionId)
    {
        Session session = await _context.Session.Where(s => s.Id == sessionId).FirstOrDefaultAsync();
        Competition competition = await _context.Competition
               .Where(c => c.Id == session.CompetitionId)
               .FirstOrDefaultAsync();

        List<SessionConfig> configs = await _context.SessionConfig.Where(sc => sc.GameId == competition.GameId).ToListAsync();
        return configs;
    }


    [HttpPost("startGame/{id}")]
    public async Task<IActionResult> StartSessionAsync(int id, SessionConfig config)
    {

        Session? session = await _context.Session.Where(s => s.Id == id).FirstOrDefaultAsync();

        if (session == null)
            return NotFound();

        try
        {
            GameEndpoint gameEndpoint = await _context.GameEndpoint
                .Include(e => e.EndpointType)
                .Where(e => e.EndpointType.Name == "Start Session")
                .Where(t => t.GameId == config.GameId)
                .FirstOrDefaultAsync();

            // Convert the JSON string to HttpContent

            List<GameConfigTemplate> configList = JsonSerializer.Deserialize<List<GameConfigTemplate>>(config.JsonConfig);
            Dictionary<string, string> configs = new Dictionary<string, string>();

            foreach (var configKV in configList)
            {
                configs[configKV.Key] = configKV.Value;
            }


            // Make the API call and get the response
            var response = await _httpClient.PostAsJsonAsync<Dictionary<string, string>>(gameEndpoint.Endpoint + "?sessionId=" + session.PlayId, configs);

            return Ok("Started Session Successfully");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("Error starting session");
        }
    }

    [HttpPost("stopGame")]
    public async Task<IActionResult> StopSessionAsync(int id)
    {
        Session? session = await _context.Session.Where(s => s.Id == id).FirstOrDefaultAsync();
        Competition? competition = await _context.Competition.Where(c => c.Id == session.CompetitionId).FirstOrDefaultAsync();

        if (session == null)
            return NotFound();

        var url = await _context.GameEndpoint
            .Include(e => e.Game)
            .Where(g => g.GameId == competition.GameId
                && g.EndpointType.Name == "Stop Session")
            .Select(e => e.Endpoint)
            .FirstOrDefaultAsync();

        if (url != null)
        {
            var response = await _httpClient.PostAsync(url, null);

            if (!response.IsSuccessStatusCode)
                return BadRequest("Could not stop session.");
        }

        return Ok("Session has been stopped");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSessionAsync(int id)
    {
        Session? session = await _context.Session.FindAsync(id);

        if (session == null)
            return NotFound();

        _context.Session.Remove(session);
        await _context.SaveChangesAsync();

        return Ok("Session Deleted Successfully");
    }

    [HttpGet("sessionScoreboard/{sessionId}")]
    public async Task<ActionResult<IEnumerable<SessionScoreboard>>> GetSessionScoreboard(int sessionId)
    {
        var scoreboard = await _context.SessionScoreboard.Where(s => s.SessionId == sessionId).ToListAsync();
        return Ok(scoreboard);
    }

}
