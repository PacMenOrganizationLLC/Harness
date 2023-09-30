using Microsoft.EntityFrameworkCore;

namespace api.models;


public class HarnessContext : DbContext
{
  public HarnessContext(DbContextOptions<HarnessContext> options)
    : base(options)
  {
  }

  public DbSet<Event> Events { get; set; } = null!;
  public DbSet<Game> Games { get; set; } = null!;
  public DbSet<Competition> Competitions { get; set; } = null!;
  public DbSet<Session> Sessions { get; set; } = null!;
  public DbSet<SessionClient> SessionClients { get; set; } = null!;
  public DbSet<CompetitionImage> CompetitionImages { get; set; } = null!;
  public DbSet<CompetitionPrize> CompetitionPrizes { get; set; } = null!;
}