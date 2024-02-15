using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;
public class WebsocketHub : Hub
{
  public async Task NewMessage(string message)
  {
    string clientId = Context.ConnectionId;

    await Clients.AllExcept(clientId).SendAsync("messageReceived", message);
  }
}