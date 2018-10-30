'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const running: vscode.TaskExecution[] = [];

    const runTask = async () => {
        const config = vscode.workspace.getConfiguration("vscode-run-workspace-tasks");
        const taskLabel = config.get("taskLabel", "");
        if (!taskLabel) {
            return;
        }
        const tasks = await vscode.tasks.fetchTasks() || [];
        const filteredTasks = tasks.filter(t => t.name === taskLabel);

        for (const task of filteredTasks) {
            vscode.tasks.executeTask(task).then(execution => running.push(execution));
        }
    };

    const stopTask = async () => {
        let task: vscode.TaskExecution | undefined;
        while (task = running.shift()) {
            task.terminate();
            // without suspending it terminates only one task. Vscode bug?
            await new Promise(res => setTimeout(res, 500));
        }
    };

    const runTaskDisp = vscode.commands.registerCommand("vscode-run-workspace-tasks.run", runTask);
    const stopTaskDisp = vscode.commands.registerCommand("vscode-run-workspace-tasks.stop", stopTask);

    context.subscriptions.push(runTaskDisp, stopTaskDisp);

    const config = vscode.workspace.getConfiguration("vscode-run-workspace-tasks");
    const runOnOpen = config.get("runOnOpen", false as boolean);
    if (runOnOpen) {
        runTask();
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}