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
      return await _context.Game.OrderByDescending(g => g.CreatedAt).ToListAsync();
    }

    // GET: api/Game/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> GetGame(int id)
    {
      Game? game = await _context.Game.FindAsync(id);

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
      Game? existingGame = await _context.Game.FindAsync(id);

      if (existingGame != null)
      {
        existingGame.CreatedBy = game.CreatedBy;
        existingGame.Details = game.Details;
        existingGame.HostUrl = game.HostUrl;
        existingGame.Name = game.Name;
        existingGame.RepoLink = game.RepoLink;
        existingGame.CreatedAt = game.CreatedAt;
        await _context.SaveChangesAsync();
        return Ok("Updated Game Successfully");
      }

      return NotFound();
    }
  
    // POST: api/Game
    [HttpPost]
    public async Task<IActionResult> AddGame(Game game)
    {
      _context.Game.Add(game);
      await _context.SaveChangesAsync();
      return Ok("Added Game");
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

      return Ok("Deleted Game");
    }
  }
}
