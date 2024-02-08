using System.ComponentModel.DataAnnotations.Schema;

namespace api.models;

[Table("library_game")]
public class LibraryGame {
    [Column("id")]
    public Guid Id { get; set; } = default!;
    [Column("name")]
    public string Name { get; set; } = default!;
    [Column("description")]
    public string Description { get; set; } = default!;
    [Column("created_by")]
    public string CreatedBy { get; set; } = default!;
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
    public IEnumerable<LibraryCreateSessionConfig>? LibraryCreateSessionConfigs { get; set; } = null!;
    public IEnumerable<LibraryStartSessionConfig>? LibraryStartSessionConfigs { get; set; } = null!;
}