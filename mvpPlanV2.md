3dPrintLibrarian - MVP Development Plan (v2)
This document outlines the development phases for the Minimum Viable Product (MVP), incorporating initial UI/UX enhancements.

Phase 1: Project Setup & Core UI Shell
Goal: A runnable Tauri application with a basic window, dark-mode styling, and placeholder UI components, including a floating info panel and a debug console.

Environment Setup:

Install Rust, Node.js, and any platform-specific dependencies required by Tauri.

Scaffold a new Tauri project with the React (Vite) template.

Project Structure:

Organize the src-tauri directory into logical Rust modules (e.g., db, commands, state, fs_utils).

Set up the React frontend with a basic component structure (e.g., Layout, Sidebar, MainContent, InfoPanel, MenuBar).

Initial UI Layout & Enhancements:

Dark Mode: Configure Tailwind CSS to use a dark grey theme by default. The root element will have the dark class.

Main Layout: Implement the primary layout (Sidebar, Main Content).

Floating Info Panel:

The Info Panel will be a separate, floating component positioned absolutely over the main content area.

It will have a state (e.g., isPanelOpen) to control its visibility.

A visible "handle" or tab will allow the user to toggle the panel's open/closed state.

Debug Console Window:

Create a Tauri command in Rust (open_console_window) that creates and shows a new, separate window labeled "Debug Console".

Add a "Console" button to the main window's menu bar to trigger this command.

Set up a Tauri event channel (e.g., log_message) that the Rust backend and frontend can use to send messages to the console window for display.

Phase 2: Library Management & Filesystem Browsing
Goal: Allow the user to select a directory as a "library" and display its contents.

Tauri Commands for Filesystem:

Create a Rust command to open the native "Open Folder" dialog.

Create a Rust command that takes a path and returns a list of files and folders within it. This command should include basic metadata (name, path, is_dir, modified_date).

Frontend Integration:

Add an "Open Library" button to the UI that invokes the "Open Folder" command.

Store the selected library path in React state.

When a library is opened, call the command to list its contents and display them in the MainContent area as a simple list.

Database Setup (rusqlite):

On opening a library, create or connect to a .3dpl.db file in the library's root.

Define the initial database schema: a files table and a tags table.

files table: id, path, name, file_type, size, modified_date, rating.

tags table: id, name, color.

file_tags join table: file_id, tag_id.

Phase 3: File Tagging & Metadata
Goal: Implement the core tagging functionality and display metadata in the info panel.

Tagging Commands (Rust):

add_tag(file_path, tag_name)

remove_tag(file_path, tag_name)

get_tags_for_file(file_path)

These commands will interact with the SQLite database.

UI for Info Panel:

When a file is selected in the main view, its details (name, path, size) will be displayed in the floating Info Panel.

Fetch and display the file's tags as pills.

Add a UI element (e.g., an input field or a dropdown) to add new tags to the selected file.

Background Syncing:

On library load, implement a Rust function to scan the library folder and sync its file list with the database. This should run in a background thread to avoid locking the UI. Use Tauri events to notify the frontend of progress and completion.

Phase 4: Utility Implementation
Goal: Build out the core cleanup and extraction utilities.

Unzip Archives:

Create a Tauri command unzip_archive(archive_path).

Use the zip crate in Rust to handle extraction.

Implement logic to extract "in-place" and optionally delete the source archive on success.

Provide feedback to the UI via Tauri events (e.g., "Extraction complete," "Error: ..."), which can be logged to our new console.

Duplicate Folder Cleanup:

Create a command cleanup_nested_folders(path).

Implement the recursive scanning logic in Rust to find .../Foo/Foo/ structures.

For the MVP, this will just perform the move. The "preview/confirm" step can be added later.

Phase 5: Move by Tag
Goal: Implement the "Move to Tag Hub" feature.

Tag Hub Commands (Rust):

set_folder_as_tag_hub(folder_path, tag_name)

get_hub_for_tag(tag_name)

Move Logic (Rust):

Create the main move_to_tag_hub(file_path) command.

This command will:

Get all tags for the given file.

Look up the hub folder for each tag.

For the MVP, if there is exactly one hub found, move the file. If zero or multiple, log a message to the console.

Frontend Integration:

Add a "Move to Tag Hub" button to the context menu/toolbar that calls the new command.