using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    _context.Session.Add(session);

    await _context.SaveChangesAsync();

    return Ok("Added Session Successfully");
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Session>>> GetSessionsAsync()
  {
    List<Session> sessions = await _context.Session.ToListAsync();
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