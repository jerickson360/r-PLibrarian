// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WindowBuilder, WindowUrl};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_console_window(app: tauri::AppHandle) -> Result<(), tauri::Error> {
    if let Some(window) = app.get_window("debug_console") {
        window.show()?;
        window.set_focus()?;
    } else {
        WindowBuilder::new(
            &app,
            "debug_console",
            WindowUrl::App("index.html".into())
        )
        .title("Debug Console")
        .inner_size(800.0, 600.0)
        .build()?;
    }
    Ok(())
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_console_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}