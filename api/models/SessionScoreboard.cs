namespace api.models
{
    public class SessionScoreboard
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public string PlayerName { get; set; }
        public int Rank { get; set; }
        public int? Score { get; set; }
    }
}
