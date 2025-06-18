// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// --- CONSOLIDATED USE STATEMENTS ---
use chrono::{DateTime, Utc};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager, WindowBuilder};

// --- SINGLE, CORRECT DEFINITION of FileEntry ---
#[derive(serde::Serialize, Debug, Clone)]
struct FileEntry {
    name: String,
    path: PathBuf,
    is_directory: bool,
    size: u64,
    modified: DateTime<Utc>,
}

// --- YOUR OTHER COMMANDS ---
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_console_window(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("debug_console") {
        window.show().map_err(|e| e.to_string())?;
        window.set_focus().map_err(|e| e.to_string())?;
    } else {
        WindowBuilder::new(&app, "debug_console")
            .title("Debug Console")
            .inner_size(800.0, 600.0)
            .build()
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

// --- SINGLE, CORRECT DEFINITION of list_directory_contents ---
#[tauri::command]
fn list_directory_contents(path: String) -> Result<Vec<FileEntry>, String> {
    let mut entries = Vec::new();
    match fs::read_dir(path) {
        Ok(dir_entries) => {
            for entry in dir_entries {
                match entry {
                    Ok(dir_entry) => {
                        let path = dir_entry.path();
                        if let Ok(metadata) = fs::metadata(&path) {
                            entries.push(FileEntry {
                                name: dir_entry.file_name().into_string().unwrap_or_default(),
                                is_directory: path.is_dir(),
                                size: metadata.len(),
                                modified: DateTime::from(
                                    metadata.modified().unwrap_or(std::time::SystemTime::now()),
                                ),
                                path,
                            });
                        }
                    }
                    Err(e) => return Err(format!("Failed to read directory entry: {}", e)),
                }
            }
            Ok(entries)
        }
        Err(e) => Err(format!("Failed to read directory: {}", e)),
    }
}


// --- MAIN FUNCTION ---
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_console_window,
            list_directory_contents // The handler points to our single, correct function
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}