using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LibararySessionController(HarnessContext context) : ControllerBase
{
    private readonly HarnessContext _context = context;

    [HttpPost("create_config")]
    public async Task<ActionResult<LibraryCreateSessionConfig>> PostLibraryCreateSessionConfig(LibraryCreateSessionConfig libraryCreateSessionConfig)
    {
        _context.LibraryCreateSessionConfig.Add(libraryCreateSessionConfig);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLibraryCreateSessionConfig", new { config_id = libraryCreateSessionConfig.Id }, libraryCreateSessionConfig);
    }

    [HttpGet("create_config")]
    public async Task<ActionResult<IEnumerable<LibraryCreateSessionConfig>>> GetLibraryCreateSessionConfigs()
    {
        var configs = await _context.LibraryCreateSessionConfig
            .OrderBy(g => g.Name).ToListAsync();

        return Ok(configs);
    }

    [HttpGet("create_config/{config_id}")]
    public async Task<ActionResult<LibraryCreateSessionConfig>> GetLibraryCreateSessionConfig(Guid config_id)
    {
        var config = await _context.LibraryCreateSessionConfig.FindAsync(config_id);

        if (config == null)
        {
            return NotFound();
        }

        return Ok(config);
    }
}