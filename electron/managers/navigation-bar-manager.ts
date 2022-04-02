import { Application } from "../main";
import { Menu, dialog } from "electron";
import fs = require("fs");
import process = require("process");

export class NavigationBarManager {
    private extension = "elcutter";

    constructor(private application: Application) {
        const menu: Menu = Menu.buildFromTemplate([
            {
                label: "File",
                submenu: Menu.buildFromTemplate([
                    {
                        label: "Create Project",
                        click: this.createProject.bind(this),
                    },
                    {
                        label: "Load Project",
                        click: this.loadProject.bind(this),
                    },
                    {
                        label: "Save Project",
                        accelerator: "CommandOrControl+S",
                        click: this.saveProject.bind(this),
                    },
                ]),
            },
        ]);
        Menu.setApplicationMenu(menu);
    }

    private createProject(): void {
        const result = dialog.showOpenDialogSync({
            title: "Create Project",
            message: "Select a new project folder",
            properties: ["showHiddenFiles", "openDirectory"],
        });
        if (result !== undefined) {
            const contents = fs.readdirSync(result[0]);
            if (contents.length > 0) {
                dialog.showMessageBoxSync({
                    title: "Project cannot be created",
                    message: "The project directory should be empty for creation",
                    type: "error",
                });
                return;
            }

            this.application.webContents.send("create-project", result);
        }
    }

    private loadProject(): void {
        let result = dialog.showOpenDialogSync({
            title: "Load Project",
            filters: [
                {
                    name: "elcutter",
                    extensions: [this.extension],
                },
            ],
            properties: ["showHiddenFiles"],
        });
        if (result !== undefined) {
            this.application.webContents.send("load-project", result);
        }
    }

    private saveProject(): void {
        this.application.webContents.send("save-project");
    }
}
