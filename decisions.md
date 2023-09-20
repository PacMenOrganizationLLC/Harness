# Decion Pro/Con List

**Authorize Harness vs other users**
- Option 1: Pass the harness's token to the game at game start where it is in charge of storing and authenticating requests against that value token
  - Pros:
    - Dynamic
  - Cons:
    - Any user could hijack the game as long as it hasn't been started yet
    - Our endpoint to give harness token is exposed
      - What do we do if we already have a token but another request is sent to become an admin?
    - Only 1 admin allowed
- **Option 2**: Create an admin group in our auth client. The groups a user is in will be passed by the encoded JWT in the request's headers or cookies where we can check their group.
  - Pros:
    - Multiple admins allowed
    - No vulnerable endpoint to register an admin
    - Don't have to reset it up every game
  - Cons: 
    - Static, manual configuration

**Get Game Token for User**
- Vocab:
  - User token - token given from the harness when a user registers. Auth client token.
  - Game token - token given by the game when a client registers so it can distinguish between clients
- **Option 1**: When a user is requesting a game token, they pass their user token to the game which the game then generates a game token and passes it and the user token to the harness for validation against the harness's list of valid user tokens before returning the game token to the user
  - Pros: 
    - User only talks to game api
  - Cons:
    - Game is in charge of associating user token with game token
- Option 2: User requests a game token through the harness which acts like a middle man by forwarding the request to the game where the game token gets generated, stored, and returned to the harness. The harness then returns it to the user. The user now has a game token that the game can validate against on each request.
  - Pros:
    - Since the request came from the harness we know it is a valid user request without further validation
    - Harness can associate game token with user token
    - Wouldn't have to advertize user token to user
  - Cons:
    - User has to use both the game api (to play) and harness api (to join/register)

**Passing General Settings/Config**
- Option 1: Either text entry or file upload a json file that will get passed as the body to the game for deserialization
  - Pros:
    - Maximum admin flexibility
    - Fast to flip between configs
  - Cons:
    - Doesn't automatically protect from typos that could stop the JSONification (like having a missing curly)
- Option 2: Build an admin UI to input x number of keys and values. We would then JSONify the form data and pass it to the game for deserialization
  - Pros:
    - Harness-native data
    - Easy for the admin to edit/update
  - Cons:
    - More work
    - Difficult with nested objects, arrays, etc.
- Option 3: Have a set number of generic keys that the game can use.
  - Pros:
    - Simple
  - Cons:
    - Removes game flexibility
- Notes:
  - No matter what approach we go, if would be helpful to handle this in a game config section, not on game start. Then we can store the data for easier game restarts.
    - Add a note/toast when they try to start the game if they have no config file
