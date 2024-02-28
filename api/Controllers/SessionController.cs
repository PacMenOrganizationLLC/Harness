using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly HarnessContext _context;

    public SessionController(HarnessContext context)
    {
        _context = context;
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

            // Get the multi session id if game supports
            session.PlayId = "Single";
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


