# vscode-run-workspace-tasks

## Features

* Allows to batch run of vscode task for every workspace folder in multi-root workspace
* Allows to automatically run this task on vscode start (configurable)

## Motivation

* ```dependsOn``` in tasks doesn't work for multi-root workspaces (i.e. you can't depend on task from another workspace folder)
* ```dependsOn``` has issues when running multiple-watch tasks
* ```lerna run --parallel``` (or analogue) doesn't mix well with task's ```problemMatchers```

## Extension Settings

* `vscode-run-workspace-tasks.taskLabel`: Label of task to run. Default to ```watch```
* `vscode-run-workspace-tasks.runOnOpen`: Automatically try to run on vscode open. Default to false

## Exapmle structure/configuration

Given the some multi-root workspace:
```
--WorkspaceFolder1
--WorkspaceFolder2
```

1. Define vscode task For every workspace folder (i.e. both in ```WorkspaceFolder1``` and ```WorkspaceFolder2```):
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "build:watch",
            "label": "Watch",
            "problemMatcher": [
                "$tsc-watch"
            ]
        }
    ]
}
```

```"label": "Watch"``` must be same across all multi-root workspace

2. Configure in root workspace configuration (command: "Workspaces: Open Workspace Configuration File"):

```"vscode-run-workspace-tasks.taskLabel": "Watch"```

3. Execute command: "Run Workspace Tasks"


If you need to stop them all you can execute command: "Stop Workspace Tasks"