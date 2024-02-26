using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompetitionController : ControllerBase
{
    private readonly HarnessContext context;

    public CompetitionController(HarnessContext context)
    {
        this.context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddCompetitionAsync(Competition competition)
    {
        if (competition == null)
        {
            return BadRequest("Competition object cannot be null.");
        }

        await context.Competition.AddAsync(competition);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCompetitionAsync), new { id = competition.Id }, competition);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Competition>>> GetAllCompetitions()
    {
        var competitions = await context.Competition.Include(c => c.Game).OrderBy(c => c.StartAt).ToListAsync();
        return Ok(competitions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Competition>> GetCompetitionAsync(int id)
    {
        var competition = await context.Competition
        .Include(c => c.Game)
        .Include(c => c.CompetitionPrizes)
        .Include(c => c.Sessions)
        .FirstOrDefaultAsync(c => c.Id == id);

        if (competition == null)
        {
            return NotFound($"Competition with id: {id} does not exist.");
        }

        foreach (var prize in competition.CompetitionPrizes)
        {
            if (prize.ImageFilename == null)
            {
                switch (prize.Placement)
                {
                    case 1:
                        prize.ImageFilename = "first_place_trophy.webp";
                        break;
                    case 2:
                        prize.ImageFilename = "second_place_trophy.webp";
                        break;
                    default:
                        prize.ImageFilename = "third_place_trophy.webp";
                        break;
                }
            }
        }

        return Ok(competition);
    }

    [HttpGet("game/{gameId}")]
    public async Task<ActionResult<IEnumerable<Competition>>> GetUpcomingCompetitionsByGameAsync(int gameId)
    {
        var competitions = await context.Competition
        .Include(c => c.Game)
        .Where(c => c.EndAt >= DateTime.UtcNow)
        .Where(c => c.GameId == gameId)
        .ToListAsync();

        return Ok(competitions);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCompetitionAsync(Competition competition)
    {
        Console.WriteLine("Competition Upate !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if (competition == null)
        {
            return BadRequest("Competition object cannot be null.");
        }

        var existingCompetition = await context.Competition.FindAsync(competition.Id);

        existingCompetition.GameId = competition.GameId;
        existingCompetition.StartAt = competition.StartAt;
        existingCompetition.EndAt = competition.EndAt;
        existingCompetition.Location = competition.Location;

        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompetitionAsync(int id)
    {
        var competition = await context.Competition.FindAsync(id);

        if (competition == null)
        {
            return NotFound($"Competition with id: {id} does not exist, cannot delete.");
        }

        context.Competition.Remove(competition);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
