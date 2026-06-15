# Architecture

Drizzle Editor is built around a custom **bidirectional synchronization engine** that keeps a visual ER diagram and Drizzle ORM TypeScript schema perfectly aligned.

## High-Level Architecture

```text
                    ┌─────────────────────┐
                    │   Monaco Editor     │
                    │ (Drizzle TS Code)   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   AST Parser Engine │
                    │   (@babel/parser)   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Internal Schema     │
                    │ Representation       │
                    └───────┬─────┬───────┘
                            │     │
                Graph → Code│     │Code → Graph
                            │     │
                            ▼     ▼
                 ┌─────────────────────┐
                 │ Code Generator      │
                 │ (Drizzle ORM TS)    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ React Flow Canvas   │
                 │ ER Diagram Editor   │
                 └─────────────────────┘
```

---

## Synchronization Engine

The core of the application is a custom synchronization engine composed of two independent modules:

### 1. Parser Engine (Code → Graph)

When a schema is edited inside Monaco Editor:

* The TypeScript source is parsed into an Abstract Syntax Tree (AST) using `@babel/parser`
* Table definitions, columns, constraints, and relationships are extracted
* The AST is transformed into an internal schema model
* React Flow nodes and edges are generated from this model

This approach avoids fragile string parsing and provides reliable support for complex Drizzle schemas.

### 2. Code Generator (Graph → Code)

When changes are made visually:

* Table edits update the internal schema model
* Foreign key connections update relationship metadata
* Constraints and column settings are stored in state
* A code generation engine produces valid Drizzle ORM TypeScript

The generated code becomes the single source of truth displayed in Monaco Editor.

---

## Frontend Layer

The frontend is built using React and Vite.

### React Flow Canvas

Responsible for:

* Rendering tables as draggable nodes
* Displaying foreign key relationships as edges
* Creating references through drag-and-connect interactions
* Auto-layout using Dagre

### Monaco Editor

Provides:

* TypeScript schema editing
* Real-time code synchronization
* Schema import and modification

### Zustand Store

Acts as the central client-side state layer.

Stores:

* Tables
* Columns
* Relationships
* UI state
* Editor state

Both the visual editor and code editor consume the same state, ensuring consistency.

---

## Backend Layer

The backend is implemented using tRPC and Drizzle ORM.

### tRPC API

Handles:

* Schema CRUD operations
* User-specific schema retrieval
* Dashboard functionality
* Authentication-aware requests

### PostgreSQL Database

Stores:

* User accounts
* Saved schemas
* Metadata (name, timestamps, ownership)

Database access is managed through Drizzle ORM.

---

## Authentication

Authentication is handled by Supabase Auth.

Supported methods:

* Google OAuth
* Email & Password

Each schema is associated with its owner, enabling private workspaces and persistent storage across sessions.

---

## Data Flow

### Visual Editing Flow

```text
React Flow
    ↓
Zustand Store
    ↓
Code Generator
    ↓
Monaco Editor
```

### Code Editing Flow

```text
Monaco Editor
    ↓
AST Parser
    ↓
Internal Schema Model
    ↓
Zustand Store
    ↓
React Flow Canvas
```

This architecture ensures that both representations of the schema remain synchronized at all times while maintaining a clear separation between parsing, state management, visualization, and persistence.
