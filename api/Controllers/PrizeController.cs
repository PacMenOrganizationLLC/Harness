using api.models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PrizeController : ControllerBase
{
    private readonly HarnessContext context;
    private readonly FileService fileService;

    public PrizeController(HarnessContext context, FileService fileService)
    {
        this.context = context;
        this.fileService = fileService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCompetitionPrizeAsync(CompetitionPrize prize)
    {
        if (prize == null)
        {
            return BadRequest("CompetitionPrize object cannot be null.");
        }

        prize.ImageFilename = $"{Guid.NewGuid()}_{prize.ImageFilename}";
        await context.CompetitionPrize.AddAsync(prize);
        await context.SaveChangesAsync();

        fileService.WriteAllBytes($"Images/prizes/{prize.ImageFilename}", prize.ImageData);

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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompetitionPrizeAsync(int id)
    {
        var prize = await context.CompetitionPrize.FindAsync(id);

        if (prize == null)
        {
            return NotFound($"CompetitionPrize with id: {id} does not exist, cannot delete.");
        }

        fileService.Delete($"Images/prizes/{prize.ImageFilename}");

        context.CompetitionPrize.Remove(prize);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("image/{filename}")]
    public IActionResult GetCompetitionPrizeImage(string filename)
    {
        var path = $"Images/prizes/{filename}";
        var bytes = fileService.ReadAllBytes(path);
        var extension = fileService.GetFileExtension(path);
        return File(bytes, $"image/{extension}");
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCompetitionPrizeAsync(CompetitionPrize prize)
    {
        var prizeToUpdate = await context.CompetitionPrize.FindAsync(prize.Id);

        if (prizeToUpdate == null)
        {
            return NotFound($"CompetitionPrize with id: {prize.Id} does not exist, cannot update.");
        }

        prizeToUpdate.Prize = prize.Prize;
        prizeToUpdate.CompetitionId = prize.CompetitionId;
        prizeToUpdate.Placement = prize.Placement;
        prizeToUpdate.UserId = prize.UserId;
        if (prize.ImageData != null)
        {
            var oldImageFilename = prizeToUpdate.ImageFilename;
            var newImageFilename = $"{Guid.NewGuid()}_{prize.ImageFilename}";
            
            fileService.WriteAllBytes($"Images/prizes/{newImageFilename}", prize.ImageData);
            fileService.Delete($"Images/prizes/{oldImageFilename}");
            prizeToUpdate.ImageFilename = newImageFilename;
        }

        await context.SaveChangesAsync();

        return NoContent();
    }
}