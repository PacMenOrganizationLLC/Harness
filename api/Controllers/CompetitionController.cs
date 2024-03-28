using api.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "harness-admin")]
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

  [AllowAnonymous]
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Competition>>> GetAllCompetitions()
  {
    var competitions = await context.Competition.Include(c => c.Game).OrderBy(c => c.StartAt).ToListAsync();
    return Ok(competitions);
  }

  [AllowAnonymous]
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
      prize.ImageFilename ??= prize.Placement switch
      {
        1 => "first_place_trophy.webp",
        2 => "second_place_trophy.webp",
        _ => "third_place_trophy.webp",
      };
    }

    return Ok(competition);
  }

  [AllowAnonymous]
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

    context.Competition.Update(competition);

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
