namespace api.models;

public class CompetitionPrize
{
    public int Id { get; set; }
    public string Prize { get; set; }
    public int CompetitionId { get; set; }
    public string? ImageFilename { get; set; }
    public int Placement { get; set; }
    public Guid? UserId { get; set; }
}