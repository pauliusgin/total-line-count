import * as vscode from "vscode";

const ENABLED_KEY = "line-count.enabled";
const CONTEXT_KEY = "lineCount.enabled";

let statusBarItem: vscode.StatusBarItem;
let enabled = true;

function updateStatusBar(): void {
  if (!enabled) {
    statusBarItem.hide();
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    statusBarItem.hide();
    return;
  }

  const lineCount = editor.document.lineCount;
  const position = editor.selection.active;
  const line = position.line + 1;
  const col = position.character + 1;
  statusBarItem.text = `Ln ${line}, Col ${col}, Total ${lineCount}`;
  statusBarItem.tooltip = `Click to disable.`;
  statusBarItem.show();
}

async function setEnabled(
  context: vscode.ExtensionContext,
  value: boolean,
): Promise<void> {
  enabled = value;
  await context.globalState.update(ENABLED_KEY, value);
  await vscode.commands.executeCommand("setContext", CONTEXT_KEY, value);
  updateStatusBar();
}

export function activate(context: vscode.ExtensionContext) {
  enabled = context.globalState.get<boolean>(ENABLED_KEY, true);

  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    101,
  );

  statusBarItem.command = {
    title: "Disable Line Count",
    command: "line-count.disable",
    arguments: [{ confirm: true }],
  };
  context.subscriptions.push(statusBarItem);

  const enable = vscode.commands.registerCommand("line-count.enable", () => {
    return setEnabled(context, true);
  });

  const disable = vscode.commands.registerCommand(
    "line-count.disable",
    async (arg?: { confirm?: boolean }) => {
      if (arg?.confirm) {
        const choice = await vscode.window.showWarningMessage(
          "Disable Line Count?",
          { modal: true },
          "Disable",
        );
        if (choice !== "Disable") {
          return;
        }
      }
      await setEnabled(context, false);
    },
  );

  const toggle = vscode.commands.registerCommand("line-count.toggle", () => {
    return setEnabled(context, !enabled);
  });

  context.subscriptions.push(
    enable,
    disable,
    toggle,
    vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
    vscode.window.onDidChangeTextEditorSelection(updateStatusBar),
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateStatusBar();
      }
    }),
  );

  void vscode.commands.executeCommand("setContext", CONTEXT_KEY, enabled);
  updateStatusBar();
}

export function deactivate() {}
