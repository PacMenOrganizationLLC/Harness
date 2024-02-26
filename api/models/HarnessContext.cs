using Microsoft.EntityFrameworkCore;

namespace api.models;


public class HarnessContext(DbContextOptions<HarnessContext> options) : DbContext(options)
{
    public DbSet<Game> Game { get; set; } = null!;
    public DbSet<Competition> Competition { get; set; } = null!;
    public DbSet<Session> Session { get; set; } = null!;
    public DbSet<SessionClient> SessionClient { get; set; } = null!;
    public DbSet<CompetitionImage> CompetitionImage { get; set; } = null!;
    public DbSet<CompetitionPrize> CompetitionPrize { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.UseSnakeCaseNamingConvention();
    }
}