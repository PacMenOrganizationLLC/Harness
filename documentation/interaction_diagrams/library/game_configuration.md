```mermaid
sequenceDiagram
    title  Game Configuration Process
    
    participant admin as Game Administrator
    participant api as Harness API Server
    participant db as Harness Database
    participant lib as Harness Library(Game) 

    admin->>+lib: Configure with Game ID and Harness API
    lib->>+api: Initiate Session and Start Template
    api->>+db: Save Session and Template Details
    db-->>-api: Confirm Session and Template Storage
```