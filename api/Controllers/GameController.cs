using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
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
        existingGame.SupportsMultiSessions = game.SupportsMultiSessions;
        existingGame.ImageSource = game.ImageSource;
        await _context.SaveChangesAsync();
        return Ok("Updated Game Successfully");
      }

      return NotFound();
    }

    // POST: api/Game
    [HttpPost]
    public async Task<IActionResult> AddGame(Game game)
    {
      if (game.ImageFile != null)
      {
        game.ImageSource = await GameSupport.SaveFile(game.ImageFile);
        game.ImageFile = null;
      }

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

    [HttpPost("Image")]
    public async Task<IActionResult> UploadImage()
    {
      try
      {
        var file = Request.Form.Files[0];

        string fileName = $"{DateTime.Now.Ticks}.png";

        var imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Images");

        if (!Directory.Exists(imageDirectory))
        {
          Directory.CreateDirectory(imageDirectory);
        }

        var filePath = Path.Combine(imageDirectory, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }

        return Ok(fileName);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }

    [HttpGet("Image/{fileName}")]
    public IActionResult GetImage(string fileName)
    {
      try
      {
        // Define the path to the image file
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName);

        // Check if the file exists
        if (!System.IO.File.Exists(filePath))
        {
          return NotFound(); // Return 404 Not Found if the file doesn't exist
        }

        // Read the file into a byte array
        byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

        // Determine the content type based on the file extension
        string contentType = "image/png";

        // Return the file content with the appropriate content type
        return File(fileBytes, contentType);
      }
      catch (Exception ex)
      {
        // Return error response if an exception occurs
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }
  }

  public class GameSupport
  {

    public static async Task<string> SaveFile(FormFile image)
    {
      var file = image;

      string fileName = $"{DateTime.Now.Ticks}.png";

      var imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Images");

      if (!Directory.Exists(imageDirectory))
      {
        Directory.CreateDirectory(imageDirectory);
      }

      var filePath = Path.Combine(imageDirectory, fileName);

      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(stream);
      }
      return fileName;
    }
  }
}
