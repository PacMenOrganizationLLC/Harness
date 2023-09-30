namespace api.models;

public class SessionClient
{
    public int Id { get; set; }
    public int SessionId { get; set; }
    public Guid UserId { get; set; }
    public Guid Token { get; set; }
    public int? Rank { get; set; }
    public int? Score { get; set; }
}