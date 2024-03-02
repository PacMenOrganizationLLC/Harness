**Forking the Console**

- Go to [https://snowspacewars.azurewebsites.net/](https://snowspacewars.azurewebsites.net/)
- Click on the button labeled 'Fork'
- Create a new fork
- Make yourself the owner and call it whatever you want
- Once that's completed, clone the repo onto your computer
  
**Running the Console**

- If you are on Visual Studio and wish to connect with the version of the game that Johnathan Allen is using for the competitions, click the button labeled 'Azure' and begin. It will redirect you to the HUD page, so you'll have to navigate back.
  
**Connecting to Another Source**
- If you are connecting to the game through something else (for instance, this harness) then you'll need to edit some configurations
- Under the 'Properties' folder, click launchSettings.json
- You'll see several configurations for startup, with names like Azure, LocalDev, DevTunnel. Choose one that *isn't* Azure for the next part
- Change the name of the config to something you prefer, and paste the URL for the game's API into the section labeled commandLineArgs
- Save the file
- Change the button labeled 'Azure' to your chosen configuration. The dropdown box next to this button will help
- Press the button and begin!