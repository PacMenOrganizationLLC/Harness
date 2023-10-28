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
    [HttpPut("createSession/{gameId}")]
    public async Task<string> CreateSessionAsync(int gameId)
    {
        // Replace with your actual API endpoint
        string apiUrl = "https://marswebpacmen.azurewebsites.net/Admin/createSession";

        // Make the API call and get the response
        string myResponse = await _httpClient.GetFromJsonAsync<string>(apiUrl);

        // Check if the call was successful
        if (myResponse == null || myResponse == "")
        {
            // Read and return the response content as a string
            return await "error: something's wrong";
        }
        else
        {
            // Handle the error case (you can throw an exception or return an error message)
            return myResponse;
        }
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