using System.ComponentModel.DataAnnotations.Schema;

namespace api.models;

[Table("library_start_session_config")]
public class LibraryStartSessionConfig
{
    [Column("id")]
    public Guid Id { get; set; }
    [Column("library_game_id")]
    public Guid LibraryGameId { get; set; }
    [Column("is_default")]
    public bool IsDefault { get; set; }
    [Column("name")]
    public string Name { get; set; } = default!;
    [Column("json_config", TypeName = "json")]
    public Dictionary<string, object> JsonConfig { get; set; } = default!;
}