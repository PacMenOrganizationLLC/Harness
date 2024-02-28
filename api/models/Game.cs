namespace api.models;

public class Game
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? RepoLink { get; set; }
  public string? Details { get; set; }
  public DateTime CreatedAt { get; set; }
  public string? ImageSource { get; set; }
  public string? GameRules { get; set; }
  public string? GettingStartedInstructions { get; set; }
  public string? DockerImage { get; set; } = string.Empty;
  public string? ApiSubPath { get; set; } = string.Empty;
  public int? MaxAmount { get; set; }
  public int? Duration { get; set; }
}

public class DockerConfig
{
  public string DockerImage { get; set; } = string.Empty;
  public string ApiSubPath { get; set; } = string.Empty;
  public int MaxAmount { get; set; }
  public int Duration { get; set; }
}