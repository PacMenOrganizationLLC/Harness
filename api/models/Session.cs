namespace api.models;

public class Session
{
    public int Id { get; set; }
    public int CompetitionId { get; set; }
    public string? PlayId { get; set; }
    public string? PlayUrl { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreationDate { get; set; }
}