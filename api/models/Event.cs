namespace api.models;

public class Event 
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string? Description { get; set; }
  public string? ImageFilename { get; set; }
  public DateTime Day { get; set; }
  public string Location { get; set; }
}