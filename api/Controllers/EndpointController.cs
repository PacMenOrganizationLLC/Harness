using api.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EndpointController : ControllerBase
{
    private readonly HarnessContext context;

    public EndpointController(HarnessContext context)
    {
        this.context = context;
    }

    [HttpGet("types")]
    public async Task<ActionResult<IEnumerable<EndpointType>>> GetEnpointTypesAsync()
    {
        var endpointTypes = await context.EndpointType.ToListAsync();
        return Ok(endpointTypes);
    }


    [HttpGet("{gameId}")]
    public async Task<ActionResult<IEnumerable<GameEndpoint>>> GetGameEndpointAsync(int gameId)
    {
        var endpoints = await context.GameEndpoint.Where(ge => ge.GameId == gameId).ToListAsync();
        return Ok(endpoints);
    }


    [HttpPost]
    public async Task<IActionResult> AddOrUpdateEnpointAsync(IEnumerable<GameEndpoint> endpoints)
    {
        foreach (var endpoint in endpoints)
        {

            if (endpoint == null)
            {
                return BadRequest("Endpoint object cannot be null.");
            }

            var existingEndpoint = await context.GameEndpoint.FindAsync(endpoint.Id);

            if (existingEndpoint == null)
            {
                context.Add(endpoint);
            }
            else
            {
                existingEndpoint.Endpoint = endpoint.Endpoint;
                existingEndpoint.EndpointTypeId = endpoint.EndpointTypeId;
                existingEndpoint.GameId = endpoint.GameId;
            }

            await context.SaveChangesAsync();
        }

        return Ok();
    }
}
