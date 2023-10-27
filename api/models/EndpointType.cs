namespace api.models;

public class EndpointType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Method { get; set; }
    public bool Required { get; set; }
    public string? QueryParamName { get; set; }
}
