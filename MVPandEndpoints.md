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

_Create Session_
- post id CreateSession(config)
- get string GetSessionStatus(id)
_Start Session_
- post StartSession(id, config)
_Game Config_
- post AddConfig(gameid, config)
- delete deleteConfig(configId)
- put updateConfig(configId, config)
- get GetConfigs()
- get GetConfig(id)
__Manage Events__
-Create(event)
- Update(id, updates)
- delete(id)
- get_all()
- get(id)
