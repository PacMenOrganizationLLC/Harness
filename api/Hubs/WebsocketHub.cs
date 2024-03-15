using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;
public class WebsocketHub : Hub
{

  public async Task NewMessage(string message, string groupName)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    if (await toxicityHandler.PassesTestAsync(message))
    {
      await Clients.Others.SendAsync("messageReceived", message);
    }
  }
}

public class toxicityHandler
{
  static string uri = Environment.GetEnvironmentVariable("DockerApiUrl") ?? "";

  public static async Task<bool> PassesTestAsync(string input)
  {
    HttpClient toxicityClient = new() { BaseAddress = new Uri(uri) };

    var config = new toxicityConfig { value = input }
    ;
    HttpResponseMessage response = await toxicityClient.PostAsJsonAsync("toxicityscore", config);

    response.EnsureSuccessStatusCode();

    double toxicityScore = double.Parse(await response.Content.ReadAsStringAsync());
    return toxicityScore < .75;
  }
}
public class toxicityConfig
{
  public string value { get; set; }
}