using Microsoft.EntityFrameworkCore;

namespace api.models;


public class HarnessContext : DbContext
{
    public HarnessContext(DbContextOptions<HarnessContext> options)
      : base(options)
    {
    }

    public DbSet<Game> Game { get; set; } = null!;
    public DbSet<Competition> Competition { get; set; } = null!;
    public DbSet<Session> Session { get; set; } = null!;
    public DbSet<SessionClient> SessionClient { get; set; } = null!;
    public DbSet<CompetitionImage> CompetitionImage { get; set; } = null!;
    public DbSet<CompetitionPrize> CompetitionPrize { get; set; } = null!;
    public DbSet<SessionConfig> SessionConfig { get; set; } = null!;
    public DbSet<EndpointType> EndpointType { get; set; } = null!;
    public DbSet<GameEndpoint> GameEndpoint { get; set; } = null!;
    public DbSet<SessionScoreboard> SessionScoreboard { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.UseSnakeCaseNamingConvention();
    }
}