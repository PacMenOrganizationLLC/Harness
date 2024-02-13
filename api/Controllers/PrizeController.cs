using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PrizeController : ControllerBase
{
    private readonly HarnessContext context;

    public PrizeController(HarnessContext context)
    {
        this.context = context;
    }

    [HttpPost]
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompetitionPrize>>> GetAllCompetitionPrizes()
    {
        var prizes = await context.CompetitionPrize.OrderBy(p => p.Placement).ToListAsync();
        return Ok(prizes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CompetitionPrize>> GetCompetitionPrizeAsync(int id)
    {
        var prize = await context.CompetitionPrize.FindAsync(id);

        if (prize == null)
        {
            return NotFound($"CompetitionPrize with id: {id} does not exist.");
        }

        return Ok(prize);
    }

    [HttpPut]
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

    [HttpDelete]
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