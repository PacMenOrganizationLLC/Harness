using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
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
            var competition = await context.Competition.FindAsync(id);

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
}
