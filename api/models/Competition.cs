namespace api.models;

public class Competition
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; }
    public string Location { get; set; } = "";
    public string? ImageFilename { get; set; }


    public Game? Game { get; set; }
    public ICollection<CompetitionPrize>? CompetitionPrizes { get; set; }
    public ICollection<Session>? Sessions { get; set; }
}