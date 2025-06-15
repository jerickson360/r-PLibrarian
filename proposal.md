# 3dPrintLibrarian — Updated Project Proposal

A high-performance, extensible desktop app for 3D-printing enthusiasts—powered by **Rust + Tauri**—that unifies filesystem browsing, metadata management, and 3D-model utilities into a single, polished interface.

---

## 1. Project Vision  
Build a **high-performance**, **extensible** desktop app for 3D-printing enthusiasts—powered by **Rust + Tauri**—that unifies filesystem browsing, metadata management, and 3D-model utilities into a single, polished interface.

---

## 2. Guiding Principles  
1. **Native Performance & Safety**  
   - Core in Rust (no Python interpreter overhead)  
   - Tauri’s secure, type-safe IPC for JS ↔ Rust commands  
2. **Single Workspace, Plugin-First**  
   - One database-backed explorer replaces fragmented tools  
   - First-class plugin API (statically-linked Rust plugins)  
3. **UX-Driven**  
   - Dashboard + dual view modes (list/grid)  
   - Inline metadata editing, hideable info panel  
   - Dark-grey theme with accent-colored tag pills & star icons  

---

## 3. Core Features & User Experience  

### 3.1 Onboarding & Libraries  
- **Open Library**: select any folder as a “library” root—persisted across sessions.
- **On First Open**: Shows the user the highest level root folder they have access to (eg My Computer on Windows), where they can traverse their file system easily until they find a folder that they would like to "turn into a library"  
- **Library Dashboard** (sidebar tab):  
  - **Stats cards**: total files, storage used, thumbnail-cache size  
  - **File-type breakdown**: bar or donut chart (STL, OBJ, images, archives)  
  - **Recent activity**: list of 5 most-recently opened/modified files  

### 3.2 Dual-Mode File Browser  
- **List View** (default)  
  - Compact rows (32 px tall)  
  - Columns:  
    - ✓ checkbox  
    - 📄 Name (clickable)  
    - 🗂️ Type icon  
    - 🏷️ Tag-pills (multi-colored)  
    - ⭐ Star widget (1–5 clickable)  
    - 📅 Modified date  
    - ⋯ Actions (context menu trigger)  
- **Grid View**  
  - 150×150 px cards with:  
    - Centered thumbnail  
    - Filename below  
    - Star overlay in corner  
- **Toggle**: list ↔ grid via icons next to Search bar  

### 3.3 Single Search Bar with Contextual Suggestions  
- **Live-search** on names by default  
- **Suggestions** dropdown as you type:  
  - “Search Tags:” scopes to tag values  
  - “Search Files/Folders:” scopes to file/folder names  
- **Keyboard**: Ctrl+F focuses search, arrow keys to pick suggestion  

### 3.4 Info Panel (right, hidable)  
- **Thumbnail** (square, 200×200 px) at top  
- **Metadata list** (labels + values):  
  - Name  
  - Size  
  - Type  
  - Path  
- **Tags**: inline tag-pills, editable on hover (click to add/remove)  
- **Rating**: 1–5 star icons, click to set  
- **Actions toolbar**:  
  - Open in Explorer  
  - Copy Path  
  - Repair STL  
  - Export Report  
- **Behavior**: open by default, toggled via a “hide/show” tab  

---

## 4. Built-In Utilities  

### 4.1 Duplicate-Folder Cleanup  
Automatically detect nested folders with identical names and eliminate unnecessary hierarchy:  
- **Detection**  
  - Recursively scan library for `…/Foo/Foo/` paths  
  - Present a preview list to user before action (optional confirmation)  
- **Merge & Delete**  
  - Move all files and subfolders from inner `Foo` into parent `Foo`  
  - Preserve file timestamps and metadata records  
  - **Delete** the now-empty inner `Foo` directory  
- **Logging & Reporting**  
  - Emit a detailed log entry per folder merged/deleted  
  - On completion, show a summary: “Merged X folders, deleted Y empty directories”  
- **Edge Cases**  
  - If moving would overwrite (same filename), append a numeric suffix or skip—configurable via settings  
  - Permissions errors are caught, logged, and skipped without aborting the entire operation  

### 4.2 Archive Extraction & Cleanup  
Batch-extract archive files (`.zip`, `.7z`, `.tar.gz`, etc.) and prune successes:  
- **Discovery**  
  - Find all archives in current folder or selection  
  - Allow user to choose target extraction root or “in-place”  
- **Extraction**  
  - For each archive:  
    1. Attempt extraction with streaming API (e.g. `zip` or `7z` crate)  
    2. **On error**: log the error (file name + error message) and continue  
    3. **On success**: record success  
- **Post-Processing**  
  - After all attempts, **delete** only those archives that extracted successfully  
  - Leave failed archives in place for manual review  
- **UI Feedback**  
  - Progress bar with counts: “5/12 extracted, 3 errors”  
  - Detailed console view: per-archive status and error stack traces  

### 4.3 STL Repair (Embedded MeshFix)  
Integrate **MeshFix** C++ algorithms via Rust FFI to automatically heal common mesh defects:  
- **Invocation**  
  - “Repair STL” action in Info Panel or context menu  
  - Pass source path to Rust shim, which calls MeshFix functions  
- **Repair Steps**  
  1. **Load** binary/ASCII STL into MeshFix data structures  
  2. **Detect & fill** holes, remove non-manifold edges, merge duplicated vertices  
  3. **Reorient** inconsistent face normals  
  4. **Export** repaired mesh as `original_repaired.stl` (configurable suffix)  
- **Configuration**  
  - Settings page: toggle individual repair steps (e.g., “Fill holes,” “Remove degenerate faces”)  
- **Logging & Results**  
  - On completion, return a JSON report: counts of holes filled, faces removed, vertices merged  
  - Display summary toast: “Repaired 2 holes, removed 5 degenerate faces”  
  - Errors (e.g. corrupt file) logged and surfaced as notification  

### 4.4 Directory Organization & Tag-Hub Folders

Empower users with full filesystem control plus advanced, hierarchical tag-based routing:

#### 4.4.1 Native File/Folder Operations  
- **Create / Rename / Delete / Copy / Cut / Paste / Move**  
  - Exposed via toolbar buttons, right-click context menu, and drag-and-drop  
  - Mimics OS behavior: overwrite prompts, permissions errors logged in console  

#### 4.4.2 Tag-Hub Folders  
- **Multiple Hubs & Tag Hierarchy**  
  - Tags form a tree: each tag may have a parent or stand alone  
  - Root-level tags must be globally unique; sibling tags must be unique within their parent  
  - Database maps each `tag_id` → `Vec<hub_folder_path>` and `tag_id` → `parent_tag_id`  
- **Assigning a Hub**  
  1. User right-clicks a folder or uses Info Panel → **Set as Tag Hub**  
  2. If folder has multiple tags, prompt which tag’s hub to assign  
  3. Each unique tag_id is only allowed one hub

#### 4.4.3 Move-to-Hub Action  
- **Invocation**: context menu or toolbar “Move To Tag Hub”  
- **Per-item Workflow**:  
  1. For each selected file/folder, read its tag list  
  2. Lookup all hub paths for those tags  
  3. **No hubs** → skip and log warning  
  4. **One hub** → move item there  
  5. **Multiple hubs** →  
     - Determine default by deepest (lowest-level) tag in the hierarchy  
     - Prompt user to choose among possible hubs (default pre-selected)  
- **Post-Action Log**:  
  - “Moved N items; skipped M items (no hub assigned)”  

#### 4.4.4 Tag Propagation & Creation  
- **Recursive Propagation**  
  - Generic tags applied to all files/folders within the library (STL, OBJ, 3MF, images, folders, archives) based on type (if they do not already exist) on library init, app open, or file-change events
  - When **tagging a folder**, automatically tag its supported contents (STL, OBJ, 3MF, and sub-folders) with the same tag.
  - Does not dynamically remove tags  
- **Tag Creation Workflow**  
  - User chooses parent tag (or none)  
  - Enforce naming: root tags unique globally; siblings unique under same parent  
  - Children inherit parent color, but assign brightness automatically, descending in value incrementally based on distance from the parent node tag in the hierarchy tree
    Ex:
    ```rust
    Sci-fi (#ff0000)
    ├── Human (#900000)
    │   ├── Soldier (#800000)
    │   └── Wizard (#800000)
    └── Ork (#900000)
        ├── HQ (#800000)
        └── Infantry (#800000)
            ├── Boyz (#700000)
            ├── Nobz (#700000)
            └── Meganobz (#700000)

#### 4.4.5 Automatic Generic Tags  
- On initial scan or new-file detection, auto-apply non-removable tags by filetype:  
  - `.stl`, `.obj`, `.3mf` → `3D Model`  
  - `.png`, `.jpg`, `.bmp` → `Image`  
  - Directories → `Folder`  

#### 4.4.6 UI Indicators & Navigation  
- **Hub Badge**: gold border around tag-pill for hub folders  
- **Hub Icon**: small “hub” glyph in list rows when browsing within a hub and same glyph displayed when navigated into the folder view for that hub folder  
- **“Hubs” Page**: dedicated entry in left-nav (under Libraries) showing all hub folders hierarchically  

#### 4.4.7 Settings & Configuration  
- **Conflict Resolution** (on file overwrite during moves):  
  - Skip  
  - Overwrite  
  - Prompt each time  
  - Rename with prefix/suffix  
- **Auto-Tags**: enable/disable generic filetype tags

  
---

## 5. Reporting & Export  
- **Export Report** command (toolbar or context menu)  
- **Options**:  
  - Format: CSV or JSON  
  - Columns to include: Name, Size, Tags, Rating, Path, Modified Date  
  - Scope: current folder, selection, or entire library  
- **Output**: write to a user-selected location, notify via toast and open folder  

---

## 6. Plugin Architecture  
- **Sidebar “Plugins” section** (collapsed by default)  
- **Each plugin**:  
  - Appears as an entry in the expandable tree  
  - Click opens plugin’s dedicated React/Tauri page  
- **Plugin trait** (Rust):  
  ```rust
  pub trait Plugin {
      fn name(&self) -> &str;
      fn register_commands(&self, app: &mut tauri::App);
      fn sidebar_entry(&self) -> SidebarItem;
  }
  
- **Capabilities**  
  - Inject sidebar items  
  - Add context-menu actions  
  - Expose new Tauri commands  

---

## 7. Technical Stack

| Layer            | Technology                                         |
|------------------|----------------------------------------------------|
| **Shell**        | Tauri (Rust core + WebView frontend)               |
| **Frontend**     | React + Vite + Tailwind (dark-grey theme)          |
| **IPC**          | `#[tauri::command]` functions (Serde JSON)         |
| **FS Traversal** | `walkdir` + `tokio::fs` for async directory walks  |
| **DB**           | `rusqlite` (SQLite) at `library_root/.3dpl.db`     |
| **Thumbnails**   | Phase 1: `stl_io` + `tiny-skia`/`raqote` canvas, Phase 2:  `three-d` + `wgpu` |
| **3D I/O**       | `stl_io`, `wavefront_obj`, `threemf`               |
| **Mesh Repair**  | Embedded **MeshFix** via Rust FFI                  |
| **Charts**       | `recharts` or `chart.js` in React                  |
| **Styling**      | Tailwind with custom dark-grey palette             |

---

## 8. Performance & MVP Targets

- **Directory listing**: ≤ 100 ms for 1 000 entries  
- **Search & filter**: < 50 ms debounce updates  
- **Thumbnail generation**: cache to `~/.3dpl/cache/thumbs/…`, lazy-load on selection  
- **Background tasks**: run in Rust threads, notify front end via Tauri events  
