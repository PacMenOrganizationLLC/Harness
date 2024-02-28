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
        if (game.ImageSource != null)
        {
          existingGame.ImageSource = game.ImageSource;
        }
        existingGame.Details = game.Details;
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
      return Ok(game.Id);
    }

    [HttpPut("{id}/instructions")]
    public async Task<IActionResult> UpdateGameInstructions(int id, [FromBody] UpdateGameInstructions instructions)
    {
      Game? game = await _context.Game.FindAsync(id);
      if (game == null)
      {
        return BadRequest("Unable to find game");
      }
      game.GameRules = instructions.GameRules;
      game.GettingStartedInstructions = instructions.GettingStarted;
      await _context.SaveChangesAsync();
      return Ok("Updated instructions");
    }

    [HttpPut("{id}/docker")]
    public async Task<IActionResult> UpdateGameDockerConfig(int id, [FromBody] DockerConfig config)
    {
      Game? game = await _context.Game.FindAsync(id);
      if (game == null)
      {
        return BadRequest("Unable to find game");
      }
      game.DockerImage = config.DockerImage;
      game.ApiSubPath = config.ApiSubPath;
      game.MaxAmount = config.MaxAmount;
      game.Duration = config.Duration;
      await _context.SaveChangesAsync();
      return Ok("Updated docker config");
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
      List<Game> games = await _context.Game.ToListAsync();
      GameSupport.CleanUpImages(games);
      return Ok("Deleted Game");
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
        string contentType = GameSupport.GetContentType(fileName);

        // Return the file content with the appropriate content type
        return File(fileBytes, contentType);
      }
      catch (Exception ex)
      {
        // Return error response if an exception occurs
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }


    [HttpPost("Image")]
    public async Task<IActionResult> UploadImage()
    {
      try
      {
        var file = Request.Form.Files[0]; // Get the uploaded file

        // Generate a filename based on current timestamp
        string fileName = $"{DateTime.Now.Ticks}{Path.GetExtension(file.FileName)}";

        // Define the path to save the file
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName);

        // Save the file to the specified path
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }

        // Return success response with the filename
        return Ok(fileName);
      }
      catch (Exception ex)
      {
        // Return error response if an exception occurs
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }


    [HttpGet("ImageWithGame/{gameId}")]
    public async Task<IActionResult> GetImageWithGameIdAsync(int gameId)
    {
      var game = await _context.Game.FindAsync(gameId);
      if (game == null || game.ImageSource == null)
      {
        return NotFound();
      }
      try
      {
        // Define the path to the image file
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", game.ImageSource);

        // Check if the file exists
        if (!System.IO.File.Exists(filePath))
        {
          return NotFound(); // Return 404 Not Found if the file doesn't exist
        }

        // Read the file into a byte array
        byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

        // Determine the content type based on the file extension
        string contentType = GameSupport.GetContentType(game.ImageSource);

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

    public static async Task<string> SaveFile(IFormFile image)
    {
      var file = image;

      string fileExtension = Path.GetExtension(file.FileName);
      string fileName = $"{DateTime.Now.Ticks}{fileExtension}";

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

    public static void CleanUpImages(List<Game> games)
    {

      string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Images"); // Get the path to the "Images" subdirectory
      if (!Directory.Exists(directoryPath))
      {
        Console.WriteLine("Images directory not found.");
        return;
      }

      string[] imageFiles = Directory.GetFiles(directoryPath, "*.*", SearchOption.TopDirectoryOnly); // Get all files in the "Images" directory

      foreach (var imagePath in imageFiles)
      {
        string filename = Path.GetFileName(imagePath); // Extract the filename from the image path

        // Check if the file is an image (you can add more image extensions as needed)
        if (IsImage(filename))
        {
          // Check if the filename exists in the list of database objects
          if (!games.Exists(obj => obj.ImageSource == filename))
          {
            File.Delete(imagePath); // Delete the image file if it does not have a corresponding filename in the database
            Console.WriteLine($"Deleted image: {filename}");
          }
        }
      }
    }

    // Helper method to check if a file is an image based on its extension
    private static bool IsImage(string filename)
    {
      string extension = Path.GetExtension(filename)?.ToLower();
      return extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".gif" || extension == ".bmp"; // Add more extensions as needed
    }
    public static string GetContentType(string fileName)
    {
      // Get the file extension
      string fileExtension = Path.GetExtension(fileName).ToLowerInvariant();

      // Determine the content type based on the file extension
      switch (fileExtension)
      {
        case ".png":
          return "image/png";
        case ".jpg":
        case ".jpeg":
          return "image/jpeg";
        case ".gif":
          return "image/gif";
        case ".bmp":
          return "image/bmp";
        case ".webp":
          return "image/webp";
        // Add more cases as needed for other image types
        default:
          return "application/octet-stream"; // Default to binary data if the file type is unknown
      }
    }
  }

}
