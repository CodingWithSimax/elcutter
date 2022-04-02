import {BrowserWindow, app} from "electron";
import * as events from "./events";
import * as vars from "./vars";
import path = require("path");

export class Application extends BrowserWindow {
    constructor() {
        super({
            width: 800,
            height: 600
        });
    }

    public async init(): Promise<void> {
        console.log("initiliasing application.");

        console.log(path.resolve("."));

        await super.loadFile("./dist/web/index.html");

        if (vars.SHOW_DEV_TOOLS) {
            super.webContents.openDevTools();
        }

        // load events
        await events.setupEvents();
    }
}

app.whenReady().then(() => {
    const application: Application = new Application();
    application.init();
});