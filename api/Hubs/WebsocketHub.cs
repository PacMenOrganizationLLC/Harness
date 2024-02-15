using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;
public class WebsocketHub : Hub
{
  public async Task NewMessage(string message, string groupName)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    await Clients.Others.SendAsync("messageReceived", message);
  }
}