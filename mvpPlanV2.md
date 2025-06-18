# 3dPrintLibrarian – MVP Development Plan (v2)

This document outlines the development phases for the Minimum Viable Product (MVP), incorporating initial UI/UX enhancements.

---

## Phase 1: Project Setup & Core UI Shell

**Goal:**  
A runnable Tauri application with a basic window, dark-mode styling, and placeholder UI components (floating info panel, debug console).

### Environment Setup

- Install **Rust**, **Node.js**, and all platform-specific dependencies required by Tauri.
- Scaffold a new Tauri project using the **React (Vite)** template.

### Project Structure

- Organize the `src-tauri` directory into logical Rust modules:
  - `db`
  - `commands`
  - `state`
  - `fs_utils`
- Set up the React frontend with a basic component structure:
  - `Layout`
  - `Sidebar`
  - `MainContent`
  - `InfoPanel`
  - `MenuBar`

### Initial UI Layout & Enhancements

- **Dark Mode:**  
  Configure Tailwind CSS to use a dark grey theme by default (`dark` class on the root element).
- **Main Layout:**  
  Implement the primary layout (Sidebar, Main Content).
- **Floating Info Panel:**  
  - Separate, floating component, absolutely positioned over main content.
  - Controlled by a state (e.g., `isPanelOpen`).
  - Toggle handle/tab for open/closed state.
- **Debug Console Window:**  
  - Create a Tauri command in Rust:  
    ```rust
    open_console_window
    ```
    Creates and shows a new, separate window labeled "Debug Console".
  - Add a "Console" button to the menu bar to trigger this command.
  - Set up a Tauri event channel (e.g., `log_message`) for backend/frontend logging.

---

## Phase 2: Library Management & Filesystem Browsing

**Goal:**  
Allow the user to select a directory as a "library" and display its contents.

### Tauri Commands for Filesystem

- **Open Folder Dialog:**  
  Rust command to open the native "Open Folder" dialog.
- **List Directory Contents:**  
  Rust command that takes a path and returns a list of files and folders, including:
    - name
    - path
    - is_dir
    - modified_date

### Frontend Integration

- Add "Open Library" button to the UI (invokes Open Folder command).
- Store selected library path in React state.
- On library open:
  - Call command to list contents.
  - Display results in the MainContent area (simple list).

### Database Setup (rusqlite)

- On opening a library, create/connect to a `.3dpl.db` file in the library root.
- Define initial database schema:
  - **files** table:  
    `id`, `path`, `name`, `file_type`, `size`, `modified_date`, `rating`
  - **tags** table:  
    `id`, `name`, `color`
  - **file_tags** join table:  
    `file_id`, `tag_id`

---

## Phase 3: File Tagging & Metadata

**Goal:**  
Implement core tagging functionality and display metadata in the Info Panel.

### Tagging Commands (Rust)

- `add_tag(file_path, tag_name)`
- `remove_tag(file_path, tag_name)`
- `get_tags_for_file(file_path)`

These commands interact with the SQLite database.

### UI for Info Panel

- When a file is selected, display details in the floating Info Panel:
  - name
  - path
  - size
  - file's tags (as pills)
- Add UI element (input or dropdown) to add new tags.

### Background Syncing

- On library load:
  - Rust function to scan library and sync file list with database.
  - Runs in a background thread.
  - Uses Tauri events to notify the frontend of progress/completion.

---

## Phase 4: Utility Implementation

**Goal:**  
Build out core cleanup and extraction utilities.

### Unzip Archives

- Tauri command:
  ```rust
  unzip_archive(archive_path)
  ```
- Use the `zip` crate in Rust to handle extraction.
- Extract "in-place", optionally delete source archive on success.
- Provide feedback to UI via Tauri events (e.g., "Extraction complete", "Error: ..."), log to console.

### Duplicate Folder Cleanup

- Command:
  ```rust
  cleanup_nested_folders(path)
  ```
- Recursive scanning logic in Rust to find `/Foo/Foo/` structures.
- For MVP, performs the move. Preview/confirm step can be added later.

---

## Phase 5: Move by Tag

**Goal:**  
Implement the "Move to Tag Hub" feature.

### Tag Hub Commands (Rust)

- `set_folder_as_tag_hub(folder_path, tag_name)`
- `get_hub_for_tag(tag_name)`

### Move Logic (Rust)

- Main command:
  ```rust
  move_to_tag_hub(file_path)
  ```
  - Get all tags for given file.
  - Look up the hub folder for each tag.
  - For MVP:
    - If **exactly one** hub is found, move the file.
    - If zero or multiple hubs found, log message to console.

### Frontend Integration

- Add "Move to Tag Hub" button to context menu/toolbar, calling the new command.

---

Let me know if you want this split into tickets, need a Gantt chart, or want further task breakdowns!
