## Application Description
### Need/Problem being solved
The annual SE programming challenges for Snow College need some form of standardization for how staff and students interact with the challenges. Additionally, the challenges need to become more accessible to students regardless of programming skill level.
### Customers/people it will benefit
 - Snow College Software Engineering Professors
 - Snow College Students

### Why is it large in scope?
- We must be able to handle a variety of different programming challenges
- We need to verify and record the winners of the challenges
- We will need to monitor the programming challenges as they are running to provide health telemetry
- We are going to need to refactor 4 different programming challenges, with unknown levels of technical debt, in order to make them work with this harness
  
### Why does it not have an obvious solution?
- How will the harness authenticate with the game/How will we prevent other users from bypassing the harness?
 - Pass the harness's token to the game at game start where it is in charge of storing and authenticating requests against that value token
 - Create an admin group in our auth client. The groups a user is in will be passed by the encoded JWT in the request's headers or cookies where we can check their group
- How will a user get a game token?
 - Get token directly from the game
 - User requests token through the game
- What will the game need to provide/include to be compatible with the harness?
 -Winner/leaderboard
 -Dynamic updates?
- How will general settings and configuration for a game be handled?
 - Admin settings set with basic JSON that will be deserialized with the game
 - Build an Admin UI to handle keys and values
 - Set generic keys that can be used
-Game Telemetry
 -Prometheus/Grafana
 -Capturing game-provided telemetry
 -More R&D required

### What are the many component parts and sub-problems you have identified?
 - Harness
    - Edit existing games to be compatible with the harness
    - Game Information
       - Fine grain control 
          - Start game
          - Stop game
          - Game speed
       - Kick user
       - Get list of players
       - General settings/config
       - Get list of ongoing games
       - Request game token?
       - Telemetry
       - Endpoints for if the game is running hot, slow,   
    throttled, etc.
    - Game/User Interactions
       - Tutorials
       - Information outreach
       - Chat
    - Visualization
       - Scoreboard
       - Show winner circle of all games/events
       - Display game running telemetry
    - User Information
       - Data to collect from users
       - Profiles
    - Income
       - Revenue generator? (Pay a dollar to play/register?)
       - Sponsors
 - Pacmen (Proof of Harness)
    - Framework 
       - Classic pacman but multiplayer with some twists
       - Multiple levels/maps
       - Scoreboard for ghosts and pacmen
       - Players can choose their color
       - Powerups
       - Instructions on game rules and powerups
       - Telemetry
       - Configure web socket to return data to each client at an interval
       - Select different game speeds
       - Display map with player movements on admin client
       - Players can join game using a code
       - Limit the number of times someone can join a game
    - Pacman
      - Pacmen are trying to eat all the pellets
      - If no players choose pacman, we have an npc pacman
      - Pacmen get points by eating pellets
    - Ghost
       - Ghost are trying to eliminate all pacmen
       - Ghosts get the points of the pacmen they eat
       - If <4 players choose ghost, we have npc ghosts
    
### What specified needs are you addressing (public health, safety, welfare, environmental, economic).
By introducing this coding challenge harness, we are strategically addressing several essential facets, including those related to public health, safety, welfare, environmental sustainability, and economic growth. Specifically:

- Facilitating Educational Excellence: This harness simplifies the process for the Snow College Engineering Department and other organizations to orchestrate coding challenges. It offers an optimal avenue for students to apply their programming acumen to solve real-world problems.
- Fostering Collaborative Learning: The platform not only enables students to hone their programming skills but also encourages collaboration and the exchange of knowledge among peers, contributing to a robust academic community.
- Enhancing Outreach and Visibility: Beyond its educational advantages, the harness possesses the potential to serve as a powerful promotional tool. It can effectively market Snow College and other organizations to their target audiences, showcasing their commitment to fostering innovation and academic excellence.
- In essence, this harness not only supports the educational journey of students but also aligns with broader societal and economic objectives, making it a valuable asset for multiple stakeholders.

### How will you demonstrate you are acquiring new knowledge as needed?  What is the learning strategy(ies) your team will use?

TBD

Regular updates to team members, commit history, screenshots/links to resources we used to solve a problem.

Learning Strategies:
- Collaboration
- Research
- Individual Troubleshooting
- Reviewing and Correcting Mistakes

## Stakeholders
### Role & Names of people you will be working with on the project
 - Product Owners
   - Heber Allen
   - Jonathan Allen
 - Developers
   - Bridger
   - Anthony
   - Ethan
   - Josh
 - Potential Users
   - Junior SE students
   - Computer science club members
   - Adam Teichert

### Is your list of stakeholders diverse enough? How do you know?
It may not be. As we further develop the project, we may find additional stakeholders or other roles that we did not consider yet.

### How do you plan on actively seeking stakeholder feedback?
- Regular Communication: We will maintain open and regular communication channels with our product owners and stakeholders. This includes scheduled meetings, updates, and progress reports to ensure alignment with their expectations.
- User interviews: present wireframes, prototypes, etc. to SE students and professors as part of our development process
- Surveys

- __Product Owners__
  - Frequency: Every other week
  - Description: Discuss and list features, wireframes, report our progress, discuss user feedback, etc.
- __Users__
  - Frequency: Every month
  - Description: Present wireframes, have them use the appliction and deliver feedback, discuss pain-points, etc.

### What is your plan to effectively communicate with stakeholders?
- Make a list of requirements that need clarification
- Develop questions that point out those clarifications
- Refine the questions
- Ask stakeholders our prepared questions and any that may arise during the discussion.

## SDLC Phases - Identify your plan on how to apply previous knowledge:
### Software Design & Construction
- Front End - React, componentized design
- Back End - C#(.NET), OOP, TDD
- Database - Postgres

- Getting Requirements - Two weeks
  - Talk with stakeholders and product owners
- Design - Two weeks
  - User interface
  - Back-end architecture
- Development - Till end of semester
  - One week SCRUM cycles of feedback and development
  - Develop Pacmen coding challenge

### Requirements Analysis
Interviews with stakeholders, especially product owners

### Security
- Authentication - Keycloak
- LINQ to avoid SQL injection
- ENV and Secrets will not be stored in the repository.

### Verification
- Passes unit tests
- Test app with previous coding challanges

### Validation
- User testing
- Product owner approval

## What iterative process will be used during the project? 
- Scrum:
    - Sprint length of 1 week
    - Switch SM each week
    - Scrum Master responsibilities:
      - Lead weekly standup
      - Assign tasks/stories
      - Make sure everyone feels heard and understands their responsibilites
      - Work with individuals to understand their needs and abilities
      - Setup meetings with stakeholders and other individuals as needed
- Team's rules for planning tasks: Plan features and high level goals during team meeting
  - Subteams or individuals then break those down into specifics as they are assigned related tasks/stories
- Team's rules for marking a task as done
  - Someone else must review your pull request before merging into master
    - It is the responsibility of the person making the pull request to notify a team member that it needs review
  - A story is in progress when it gets assigned to a user, in review when a pull request has been made, and complete when a pull request has been reviewed and merged into the master branch.
  - Individuals can mark their task as complete
    - Review completed tasks during team meetings
- Branch Protocols:
  - We will utilize Trunk-based development and merge small, frequent updates to the core “trunk”/main branch. Merge as often as possible with tests passing and code compiling. If you make a request that doesn't compile you must bring snacks to the next team meeting.
- Demonstration to users:
  - Schedule interviews with Heber and Jonathan (main faculty stakeholders) to get requirements gathering, review progress, etc.
  - Present different wireframes to stakeholders.
  - Review notes taken by offical notetaker during team meeting

## What parts of the project have you identified where you need a creative decision-making process?
- How will the harness authenticate with the game?
- How will a user get a game token?
- What will the game need to provide to be compatible with the harness?
- How will general settings and configuration for a game be handled?
