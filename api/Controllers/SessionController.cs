using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly HarnessContext _context;
    private readonly HttpClient dockerApiClient;

    public SessionController(HarnessContext context, HttpClient dockerApiClient)
    {
        _context = context;
        this.dockerApiClient = dockerApiClient;
    }

    public class NewSessionRequest
    {
        public int GameId { get; set; }
        public int? CompetitionId { get; set; }
    }

    public class NewContainerRequest
    {
        public string? Image { get; set; } = string.Empty;
        public int? Duration { get; set; }
        public int? InternalPort { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    [HttpPost]
    public async Task<IActionResult> AddSessionAsync([FromBody] NewSessionRequest body)
    {
        try
        {
            Game game = await _context.Game.Where(g => g.Id == body.GameId).FirstAsync();


            NewContainerRequest containerRequest = new()
            {
                Image = game.DockerImage,
                Duration = game.Duration,
                InternalPort = game.InternalPort,
                Name = game.Name.Replace(" ", "_")
            };

            var response = await dockerApiClient.PostAsJsonAsync("/createContainer", containerRequest);
            var result = await JsonSerializer.DeserializeAsync<Dictionary<string, string>>(await response.Content.ReadAsStreamAsync());

            Session newSession = new()
            {
                GameId = body.GameId,
                CompetitionId = body.CompetitionId,
                CreationDate = DateTime.UtcNow,
                HostUrl = result?.GetValueOrDefault("message"),
            };
            await _context.Session.AddAsync(newSession);
            await _context.SaveChangesAsync();

            return Ok("Added Session Successfully");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("Error creating session");
        }

    }

    [HttpGet("competition")]
    public async Task<ActionResult<IEnumerable<Session>>> GetSessionsForCompetitionAsync(int? competitionId = null)
    {
        List<Session> sessions = await _context.Session
            .Include(s => s.Game)
            .Where(s => s.CompetitionId == competitionId && s.CreationDate.AddMinutes(s.Game.Duration ?? 0) >= DateTime.UtcNow)
            .OrderByDescending(s => s.CreationDate)
            .ToListAsync();
        return sessions;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Session>> GetSessionAsync(int id)
    {
        Session? session = await _context.Session
            .Include(s => s.Game)
            .Where((s) => s.Id == id)
            .FirstOrDefaultAsync();

        if (session == null)
            return NotFound();

        return session;
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
}


