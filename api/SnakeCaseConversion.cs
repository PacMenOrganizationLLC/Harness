using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

public static class ModelBuilderExtensions
{
  public static ModelBuilder UseSnakeCaseNamingConvention(this ModelBuilder modelBuilder)
  {
    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
    {
      foreach (var property in entityType.GetProperties())
      {
        var snakeCaseName = ToSnakeCase(property.GetColumnName());
        property.SetColumnName(snakeCaseName);
      }

      var tableSnakeCaseName = ToSnakeCase(entityType.GetTableName());
      entityType.SetTableName(tableSnakeCaseName);
    }

    return modelBuilder;
  }

  private static string ToSnakeCase(string input)
  {
    if (string.IsNullOrEmpty(input))
      return input;

    // Convert camelCase to snake_case using a regular expression
    return Regex.Replace(input, "(?<=.)([A-Z])", "_$1").ToLower();
  }
}
