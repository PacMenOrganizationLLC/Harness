```Mermaid
sequenceDiagram
    title  Competition Creation Process

    participant admin as Game Administrator
    participant client as Harness Client Application
    participant api as Harness API Server
    participant db as Harness Database

    admin->>+client: Request to Create Competition
    client->>+api: Send Competition Creation Request
    api->>+db: Store Competition Information
    db-->>-api: Confirm Competition Creation
    api-->>-client: Return Confirmation
    client-->>-admin: Display Confirmation
```