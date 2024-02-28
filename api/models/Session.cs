namespace api.models;

public class Session
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int? CompetitionId { get; set; }
    public DateTime CreationDate { get; set; }
    public string? HostUrl { get; set; }
    public Game Game { get; set; }
}