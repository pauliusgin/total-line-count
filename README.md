# Line Count

Show the active file's total line count next to your cursor position in the status bar.

The status bar reads:

```
Ln 25, Col 66, Total 100
```

`Total` is the number of lines in the current file. `Ln` / `Col` acts the same as native `Editor Selection`

## Features

- **Total line count** for the active editor, updated live as you type.
- **Cursor position** (`Ln`, `Col`) shown alongside the total.
- **Runs on startup** — active as soon as VS Code opens or reloads.
- **Enable / disable** at any time:
  - **Left-click** the status bar item to disable it (asks for confirmation first).
  - **Command Palette** → `Line Count: Enable` / `Disable`
- **Remembers your choice** across restarts.

When disabled, the status bar item is hidden completely. It can be re-enabled from the Command Palette or with a custom keyboard shortcut.

## Requirements

None. No dependencies or configuration required.

## Extension Settings

This extension does not contribute any VS Code settings.

## Available Keybindings

- `line-count.toggle`
- `line-count.enable`
- `line-count.disable`

## Known Issues

- `Col` is reported as the character offset + 1 and does not expand tabs by tab size, so with tab-indented files it may differ from VS Code's built-in `Col` indicator.

## Release Notes

### 0.1.0

- Line count shown in the status bar next to the cursor position.
- Enable/disable via the status bar (with confirmation) and the Command Palette.
- Keybindings available
- State persists across restarts.

---
