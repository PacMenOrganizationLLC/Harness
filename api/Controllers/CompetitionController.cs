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
        var competitions = await context.Competition.OrderBy(c => c.StartAt).ToListAsync();
        return Ok(competitions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Competition>> GetCompetitionAsync(int id)
    {
        var competition = await context.Competition
        .Include(c => c.Game)
        .Include(c => c.Event)
        .Include(c => c.CompetitionPrizes)
        .Include(c => c.Sessions)
        .FirstOrDefaultAsync(c => c.Id == id);

        if (competition == null)
        {
            return NotFound($"Competition with id: {id} does not exist.");
        }

        return Ok(competition);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCompetitionAsync(Competition competition)
    {
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

    [HttpPost("prize")]
    public async Task<IActionResult> AddCompetitionPrizeAsync(CompetitionPrize prize)
    {
        if (prize == null)
        {
            return BadRequest("CompetitionPrize object cannot be null.");
        }

        await context.CompetitionPrize.AddAsync(prize);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCompetitionPrizeAsync), new { id = prize.Id }, prize);
    }

    [HttpGet("prize")]
    public async Task<ActionResult<IEnumerable<CompetitionPrize>>> GetAllCompetitionPrizes()
    {
        var prizes = await context.CompetitionPrize.OrderBy(p => p.Placement).ToListAsync();
        return Ok(prizes);
    }

    [HttpGet("prize/{id}")]
    public async Task<ActionResult<CompetitionPrize>> GetCompetitionPrizeAsync(int id)
    {
        var prize = await context.CompetitionPrize.FindAsync(id);

        if (prize == null)
        {
            return NotFound($"CompetitionPrize with id: {id} does not exist.");
        }

        return Ok(prize);
    }

    [HttpPut("prize")]
    public async Task<IActionResult> UpdateCompetitionPrizeAsync(CompetitionPrize prize)
    {
        if (prize == null)
        {
            return BadRequest("CompetitionPrize object cannot be null.");
        }

        context.CompetitionPrize.Update(prize);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("prize/{id}")]
    public async Task<IActionResult> DeleteCompetitionPrizeAsync(int id)
    {
        var prize = await context.CompetitionPrize.FindAsync(id);

        if (prize == null)
        {
            return NotFound($"CompetitionPrize with id: {id} does not exist, cannot delete.");
        }

        context.CompetitionPrize.Remove(prize);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
