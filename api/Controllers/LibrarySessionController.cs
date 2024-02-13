using api.Hubs;
using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LibararySessionController(HarnessContext context, IHubContext<LibraryHub> libraryHub) : ControllerBase
{
    private readonly HarnessContext _context = context;
    private readonly IHubContext<LibraryHub> _libraryHub = libraryHub;

    [HttpPost("create")]
    public async Task PostSession()
    {
       _libraryHub.Clients.All.SendAsync($"create_session-{"some sort of id"}", "Session MetaData", "Create Session Config");
       throw new NotImplementedException();
    }
    
    
    [HttpPost("create_config")]
    public async Task<ActionResult<LibraryCreateSessionConfig>> PostLibraryCreateSessionConfig(LibraryCreateSessionConfig libraryCreateSessionConfig)
    {
        _context.LibraryCreateSessionConfig.Add(libraryCreateSessionConfig);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLibraryCreateSessionConfig", new { config_id = libraryCreateSessionConfig.Id }, libraryCreateSessionConfig);
    }

    [HttpPost("create_config/default")]
    public async Task<ActionResult<LibraryCreateSessionConfig>> PostLibraryCreateSessionConfigDefault(LibraryCreateSessionConfig libraryCreateSessionConfig)
    {
        var defaultConfig = await _context.LibraryCreateSessionConfig
            .Where(c => c.LibraryGameId == libraryCreateSessionConfig.LibraryGameId && c.IsDefault)
            .FirstOrDefaultAsync();

        if (defaultConfig != null)
        {
            defaultConfig.IsDefault = true;
            defaultConfig.Name = libraryCreateSessionConfig.Name;
            defaultConfig.JsonConfig = libraryCreateSessionConfig.JsonConfig;
            _context.LibraryCreateSessionConfig.Update(defaultConfig);
        }
        else
        {
            libraryCreateSessionConfig.IsDefault = true;
            _context.LibraryCreateSessionConfig.Add(libraryCreateSessionConfig);
        }

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

    [HttpPost("start_config")]
    public async Task<ActionResult<LibraryStartSessionConfig>> PostLibraryStartSessionConfig(LibraryStartSessionConfig libraryStartSessionConfig)
    {
        _context.LibraryStartSessionConfig.Add(libraryStartSessionConfig);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLibraryStartSessionConfig", new { config_id = libraryStartSessionConfig.Id }, libraryStartSessionConfig);
    }

    [HttpPost("start_config/default")]
    public async Task<ActionResult<LibraryStartSessionConfig>> PostLibraryStartSessionConfigDefault(LibraryStartSessionConfig libraryStartSessionConfig)
    {
        var defaultConfig = await _context.LibraryStartSessionConfig
            .Where(c => c.LibraryGameId == libraryStartSessionConfig.LibraryGameId && c.IsDefault)
            .FirstOrDefaultAsync();

        if (defaultConfig != null)
        {
            defaultConfig.IsDefault = true;
            defaultConfig.Name = libraryStartSessionConfig.Name;
            defaultConfig.JsonConfig = libraryStartSessionConfig.JsonConfig;
            _context.LibraryStartSessionConfig.Update(defaultConfig);
        }
        else
        {
            libraryStartSessionConfig.IsDefault = true;
            _context.LibraryStartSessionConfig.Add(libraryStartSessionConfig);
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLibraryStartSessionConfig", new { config_id = libraryStartSessionConfig.Id }, libraryStartSessionConfig);
    }

    [HttpGet("start_config")]
    public async Task<ActionResult<IEnumerable<LibraryStartSessionConfig>>> GetLibraryStartSessionConfigs()
    {
        var configs = await _context.LibraryStartSessionConfig
            .OrderBy(g => g.Name).ToListAsync();

        return Ok(configs);
    }


    [HttpGet("start_config/{config_id}")]
    public async Task<ActionResult<LibraryStartSessionConfig>> GetLibraryStartSessionConfig(Guid config_id)
    {
        var config = await _context.LibraryStartSessionConfig.FindAsync(config_id);

        if (config == null)
        {
            return NotFound();
        }

        return Ok(config);
    }
}