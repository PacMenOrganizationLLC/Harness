
using System.ComponentModel.DataAnnotations.Schema;

namespace api.models;


public class Game
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string HostUrl { get; set; }
  public string? RepoLink { get; set; }
  public string? Details { get; set; }
  public string CreatedBy { get; set; }
  public bool SupportsMultiSessions { get; set; }
  public DateTime CreatedAt { get; set; }
  public string? ImageSource { get; set; }
  public string? GameRules { get; set; }
  public string? GettingStartedInstructions { get; set; }
}