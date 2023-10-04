using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EventController : ControllerBase
  {
    private readonly HarnessContext _context;

    public EventController(HarnessContext context)
    {
      _context = context;
    }

    // GET: api/Event
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
      return await _context.Event.OrderByDescending(g => g.Time).ToListAsync();
    }

    // GET: api/Event/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
      Event? Event = await _context.Event.FindAsync(id);

      if (Event == null)
      {
        return NotFound();
      }

      return Event;
    }

    // PUT: api/Event/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, Event event){
      if (id != Event.Id)
      {
        return BadRequest();
      }
      Event? existingEvent = await _context.Event.FindAsync(id);

      if (existingEvent != null)
      {
        existingEvent.Name = event.name;
        existingEvent.Description = event.Description;
        if(!string.IsNullorEmpty(existingEvent.ImageFilename)){
        existingEvent.ImageFilename = event.ImageFilename;
        }
        await _context.SaveChangesAsync();
        return Ok("Updated Event Successfully");
      }

      return NotFound();
    }

    // POST: api/Event
    [HttpPost]
    public async Task<IActionResult> AddEvent(Event Event)
    {
      _context.Event.Add(Event);
      await _context.SaveChangesAsync();
      return Ok("Added Event");
    }

    // DELETE: api/Event/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
      var Event = await _context.Event.FindAsync(id);
      if (Event == null)
      {
        return NotFound();
      }

      _context.Event.Remove(Event);
      await _context.SaveChangesAsync();

      return Ok("Deleted Event");
    }
  }
}
