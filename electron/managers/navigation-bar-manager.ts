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
        let result = dialog.showSaveDialogSync({
            title: "Create Project",
            message: "Select a new project folder",
            properties: ["showHiddenFiles"],
            filters: [
                {
                    name: "elcutter",
                    extensions: [this.extension],
                },
            ],
        });
        if (result !== undefined) {
            // check if folder has ending
            if (!result.endsWith("." + this.extension)) result += "." + this.extension;

            const folder = result.split("\\").join("/").split("/").slice(0, -1).join("/");

            const contents = fs.readdirSync(folder);
            if (contents.length > 0) {
                dialog.showMessageBoxSync({
                    title: "Project cannot be created",
                    message: "The project directory should be empty for creation",
                    type: "error",
                });
                return;
            }

            this.application.webContents.send("create-project", result, folder);
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
