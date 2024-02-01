using Microsoft.AspNetCore.SignalR;

namespace api.Hubs;
public class WebsocketHub : Hub
{
  public async Task NewMessage(string message)
  {
    throw new NotImplementedException();
  }
}