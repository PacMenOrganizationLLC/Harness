# Space Wars

**Console Program:** It is how players connect to the game server and play. Players will enter their key input which it then sends to the server. It has all the interfaces necessary for players to add their own custom macros and hotkeys.

**HUD Browser Page:** Requires token input from the console program. Entering the token in the page will open up the dashboard/HUD.

The HUD displays:
- A high-resolution of their ship's surroundings
- Health status
- Shield status
- Owned weapons
- Repair currency
- Upgrade currency
- Action queue

**Player Ship:** It contains the player's:
- Name
- Health
- Shield
- Coordinates
- Orientation
- Repair currency balance
- Upgrade currency balance

## Before Starting
Players have the opportunity to access the console program code and implement their own custom hotkeys and macros. This feature allows players to give themselves the extra edge they need to win the game.

## Rules
1. All players start on equal footing:
   - Health bar is full
   - Shield bar is full
   - Both currency starts at $0.00
   - Players spawn at random coordinates on the map
2. Players are free to move anywhere on the map  
&emsp;At a minimum, they can always:
   - Move at a default speed
   - Use their default (weak) weapon

3. Repair/Upgrade credits increase over time
4. A player's overall score is based on their total currency
5. Hitting or killing an opponent grants additional credits to the player
6. Hits decrease your shield points first before decreasing your health
7. When health reaches 0, the player dies and can no longer participate
8. To win the game:
   - Host sets a timer for an arbitrary amount of time. When time is up, the player with the highest score wins the game
   
   OR

   - The game is played until all but one player are dead. The last player standing wins the game.