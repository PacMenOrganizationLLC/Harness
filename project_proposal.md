## Application Description
### Need/Problem being solved

### Customers/people it will benefit
 - Snow College Software Engineering Professors
 - Snow College Students

### Why is it large in scope?
This coding challenge harness is designed to be versatile and adaptable, catering to a wide range of coding challenges and their corresponding inputs. It is intended for use in both future coding challenges and by organizations looking to host similar events. Its scalability and flexibility make it suitable for accommodating diverse challenges and inputs.

### Why does it not have an obvious solution?
The architecture and purpose of this harness are intentionally left open-ended initially. This approach allows us to define the most suitable requirements and determine the optimal way to meet those requirements as we progress. By maintaining flexibility in the early stages, we can adapt the harness to the specific needs of each coding challenge and organization, ensuring a customized and effective solution.

### What are the many component parts and sub-problems you have identified?
 - Harness
    - Fine grain control
    - Tutorials
    - Information outreach
    - Telemetry
    - Chat
    - Profiles
    - Endpoints for if the game is running hot, slow,   
    throttled, etc.
    - Sponsors
    - Data to collect from users
    - Show winner circle of all games/events
    - Revenue generator? (Pay a dollar to play/register?)
    - Scoreboard
    - Start game
    - Stop game
    - Game speed
    - Request game token?
    - Kick user
    - Get list of players
    - General settings/config
    - Get list of ongoing games
 - Pacmen (Proof of Harness)
    - Classic pacman but multiplayer with some twists
    - Ghost are trying to eliminate all pacmen
    - Pacmen are trying to eat all the pellets
    - Multiple levels/maps
    - Scoreboard for ghosts and pacmen
    - Players can choose their color
    - Powerups
    - Configure web socket to return data to each client at an interval
    - Select different game speeds
    - Display map with player movements on admin client
    - Players can join game using a code
    - Telemetry
    - Limit the number of times someone can join a game
    - If <4 players choose ghost, we have npc ghosts
    - If no players choose pacman, we have an npc pacman
    - Pacmen get points by eating pellets
    - Ghosts get the points of the pacmen they eat
    - Instructions on game rules and powerups

### What specified needs are you addressing (public health, safety, welfare, environmental, economic).
By introducing this coding challenge harness, we are strategically addressing several essential facets, including those related to public health, safety, welfare, environmental sustainability, and economic growth. Specifically:

- Facilitating Educational Excellence: This harness simplifies the process for the Snow College Engineering Department and other organizations to orchestrate coding challenges. It offers an optimal avenue for students to apply their programming acumen to solve real-world problems.
- Fostering Collaborative Learning: The platform not only enables students to hone their programming skills but also encourages collaboration and the exchange of knowledge among peers, contributing to a robust academic community.
- Enhancing Outreach and Visibility: Beyond its educational advantages, the harness possesses the potential to serve as a powerful promotional tool. It can effectively market Snow College and other organizations to their target audiences, showcasing their commitment to fostering innovation and academic excellence.
- In essence, this harness not only supports the educational journey of students but also aligns with broader societal and economic objectives, making it a valuable asset for multiple stakeholders.

### How will you demonstrate you are acquiring new knowledge as needed?  What is the learning strategy(ies) your team will use?
Regular updates to team members, commit history, screenshots/links to resources we used to solve a problem.

Learning Strategies:
- Collaboration
- Research
- Individual Troubleshooting
- Reviewing and Correcting Mistakes

## Stakeholders
### Role & Names of people you will be working with on the project
 - __Bridger__: Merge resolution expert
 - __Josh__: Wordsmith
 - __Anthony__: R&D expert
 - __Ethan__: Documentor

### Is your list of stakeholders diverse enough? How do you know?
While we believe that we have identified key stakeholders at this moment, we acknowledge that the stakeholder landscape may evolve as development progresses. Our approach is dynamic, and we remain open to the possibility of discovering new stakeholders with unique and invaluable perspectives as we continue to refine and expand our project.

### How do you plan on actively seeking stakeholder feedback?
- Regular Communication: We will maintain open and regular communication channels with our product owners and stakeholders. This includes scheduled meetings, updates, and progress reports to ensure alignment with their expectations.
- User interviews: present wireframes, prototypes, etc. to SE students and professors as part of our development process
- Surveys

### What is your plan to effectively communicate with stakeholders?
- Draft questions that we can ask stakeholders to get feedback.

## SDLC Phases - Identify your plan on how to apply previous knowledge:
### Software Design & Construction
Front End - React, componentized design
Back End - C#(.NET), OOP, TDD
Database - Postgres

### Requirements Analysis
Interviews with stakeholders, especially product owners
### Security
- Authentication - Keycloak
- LINQ to avoid SQL injection
- ENV and Secrets will not be stored in the repository. 

### Verification
Keycloak?
### Validation
See above?
## What iterative process will be used during the project?
Agile/Scrum
## What parts of the project have you identified where you need a creative decision-making process?
- How will the harness authenticate with the game?
- How will a user get a game token?
- What will the game need to provide to be compatible with the harness?
- How will general settings and configuration for a game be handled?
