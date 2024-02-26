using System.ComponentModel.DataAnnotations.Schema;

namespace api.models;

public class CompetitionPrize
{
    public int Id { get; set; }
    public string Prize { get; set; } = string.Empty;
    public int CompetitionId { get; set; }
    public int Placement { get; set; }
    public Guid? UserId { get; set; }
    public string? ImageFilename { get; set; }
    [NotMapped]
    public byte[]? ImageData { get; set; }
}