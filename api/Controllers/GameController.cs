using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class GameController : ControllerBase
  {
    private readonly HarnessContext _context;

    public GameController(HarnessContext context)
    {
      _context = context;
    }

    // GET: api/Game
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Game>>> GetGames()
    {
      return await _context.Game.ToListAsync();
    }

    // GET: api/Game/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> GetGame(int id)
    {
      var game = await _context.Game.FindAsync(id);

      if (game == null)
      {
        return NotFound();
      }

      return game;
    }

    // PUT: api/Game/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGame(int id, Game game)
    {
      if (id != game.Id)
      {
        return BadRequest();
      }

      _context.Entry(game).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!GameExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Game
    [HttpPost]
    public async Task<ActionResult<Game>> AddGame(Game game)
    {
      _context.Game.Add(game);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
    }

    // DELETE: api/Game/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(int id)
    {
      var game = await _context.Game.FindAsync(id);
      if (game == null)
      {
        return NotFound();
      }

      _context.Game.Remove(game);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool GameExists(int id)
    {
      return _context.Game.Any(e => e.Id == id);
    }
  }
}
