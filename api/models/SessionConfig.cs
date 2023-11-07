
using System.Text.Json.Serialization;

namespace api.models;


public class SessionConfig
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string JsonConfig { get; set; }
    public int GameId { get; set; }
}

public class GameConfigTemplate
{
    [JsonPropertyName("key")]
    public string Key { get; set; }

    [JsonPropertyName("value")]
    public string Value { get; set; }
    public GameConfigTemplate(string key, string value)
    {
        Key = key;
        Value = value;
    }
}