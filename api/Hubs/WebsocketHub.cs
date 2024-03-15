using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;
public class WebsocketHub : Hub
{

  public async Task NewMessage(string message, string groupName)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    if (await ToxicityHandler.PassesTestAsync(message))
    {
      await Clients.Others.SendAsync("messageReceived", message);
    }
    else
    {
      await Clients.Others.SendAsync("messageReceived", ToxicityHandler.GetRandomSweetMessage());

    }
  }
}

public class ToxicityHandler
{
  static Random random = new Random();
  static readonly string uri = Environment.GetEnvironmentVariable("DockerApiUrl") ?? "";

  static string[] sweetMessages = {
    "Let's keep the conversation kind and uplifting. This comment has been replaced.",
    "We believe in spreading positivity. Comment updated for a better vibe.",
    "Every interaction counts. Let's make them all pleasant. Comment replaced.",
    "Words have power. Let's use them to spread warmth and kindness.",
    "We're all about good vibes here. This comment has been sweetened.",
    "In this space, we choose kindness. Comment swapped for a kinder one.",
    "Love and kindness prevail. Comment updated to reflect our values.",
    "Let's sprinkle kindness everywhere. This comment has been gently revised.",
    "Your words matter. Let's make them all uplifting. Comment replaced.",
    "Sending love and positivity your way. Comment replaced for a sweeter tone."
};

  public static async Task<bool> PassesTestAsync(string input)
  {
    HttpClient toxicityClient = new() { BaseAddress = new Uri(uri) };

    var config = new toxicityConfig { value = input }
    ;
    HttpResponseMessage response = await toxicityClient.PostAsJsonAsync("toxicityscore", config);

    response.EnsureSuccessStatusCode();

    double toxicityScore = double.Parse(await response.Content.ReadAsStringAsync());
    toxicityScore = Math.Round(toxicityScore * 100) / 100.0;
    return toxicityScore < .75;
  }

  public static string GetRandomSweetMessage()
  {
    int randomIndex = random.Next(0, sweetMessages.Length);
    return sweetMessages[randomIndex];
  }
}
public class toxicityConfig
{
  public string value { get; set; }
}