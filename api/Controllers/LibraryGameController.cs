using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LibararyGameController(HarnessContext context) : ControllerBase
{
    private readonly HarnessContext _context = context;

    [HttpPost]
    public async Task<ActionResult<LibraryGame>> PostLibraryGame(LibraryGame libraryGame)
    {
        _context.LibraryGame.Add(libraryGame);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLibraryGame", new { id = libraryGame.Id }, libraryGame);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LibraryGame>>> GetLibraryGames()
    {
        var games = await _context.LibraryGame
            .Include(lb => lb.LibraryCreateSessionConfigs)
            .OrderByDescending(g => g.CreatedAt).ToListAsync();
        return Ok(games);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LibraryGame>> GetLibraryGame(Guid id)
    {
        var game = await _context.LibraryGame.FindAsync(id);

        if (game == null)
        {
            return NotFound();
        }

        return Ok(game);
    }
}