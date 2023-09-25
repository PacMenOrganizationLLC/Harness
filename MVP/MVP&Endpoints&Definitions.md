__Minimum Viable Product__
- Create Session
- Start Session
- Stop Session
- Manage Events
- Game Config

__V2__
- Scoreboard
- Display Game
- Validation
- Assiocate User With Game
- Manage Players
- Winner Circle

__V3__
- Chat
- User Profile
- Fine Grained Controls



__Endpoints__

Create Session
- post id CreateSession(config)
- get string GetSessionStatus(id)
  
Start Session
- post StartSession(id, config)
  
Game Config
- post AddConfig(gameid, config)
- delete deleteConfig(configId)
- put updateConfig(configId, config)
- get GetConfigs()
- get GetConfig(id)
  
Manage Events
- Create(event)
- Update(id, updates)
- delete(id)
- get_all()
- get(id)


__Definitions__
- Events: A series of games/competitions over a single day
- Game: A third-party software provided by the user that must be compatible with our code. Ex: Game of Life, Mars Rover, etc
- Competition: People get together to play a game
- Session: A single instance of a game that can be played in parallel with other sessions
