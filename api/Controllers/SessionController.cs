using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                .Where(c => c.Id == session.CompetitionId)
                .FirstOrDefaultAsync();

            GameEndpoint gameEndpoint = await _context.GameEndpoint
                .Include(e => e.EndpointType)
                .Where(e => e.EndpointType.Name == "Create Session")
                .Where(t => t.GameId == competition.GameId)
                .FirstOrDefaultAsync();
            // Make the API call and get the response
            HttpResponseMessage? myResponse = await _httpClient.PostAsync(gameEndpoint.Endpoint, null);
            CreateSessionResponse data = await myResponse.Content.ReadFromJsonAsync<CreateSessionResponse>();
            session.PlayId = data.GameId;
            session.PlayUrl = data.GameUrl;
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


    [HttpPut("{startSessionId}")]
    public async Task<IActionResult> StartSessionAsync(int id)
    {
        Session? session = await _context.Session.FindAsync(id);

        if (session == null)
            return NotFound();

        //TODO: Call game API to start game. Pass in config

        await _context.SaveChangesAsync();

        return Ok("Session has been started");
    }





    [HttpPut("{stopSessionId}")]
    public async Task<IActionResult> StopSessionAsync(int id)
    {
        Session? session = await _context.Session.FindAsync(id);

        if (session == null)
            return NotFound();

        //TODO: Call game API to stop game.

        await _context.SaveChangesAsync();

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
}
