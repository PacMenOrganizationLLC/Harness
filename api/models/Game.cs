
namespace api.models;


public class Game
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string HostUrl { get; set; }
  public string? RepoLink { get; set; }
  public string? Details { get; set; }
  public string CreatedBy { get; set; }
}