import { BrowserWindow, app } from "electron";
import * as events from "./functions/events";
import * as vars from "./vars";
import path = require("path");
import remoteMain = require("@electron/remote/main");
import { NavigationBarManager } from "./managers/navigation-bar-manager";
remoteMain.initialize();

export class Application extends BrowserWindow {
    private readyCallbacks: Array<(() => void) | (() => Promise<void>)> = [];

    private navigationBarManager: NavigationBarManager;

    constructor() {
        super({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        // load managers
        this.navigationBarManager = new NavigationBarManager(this);
    }

    public async init(): Promise<void> {
        console.log("initiliasing application.");

        console.log(path.resolve("."));

        remoteMain.enable(super.webContents);

        await super.loadFile("./dist/web/index.html");

        if (vars.SHOW_DEV_TOOLS) {
            super.webContents.openDevTools();
        }

        // load events
        await events.setupEvents();

        this.readyCallbacks.forEach((callback) => callback());
    }

    public onReady(callback: (() => void) | (() => Promise<void>)) {
        this.readyCallbacks.push(callback);
    }
}

app.whenReady().then(() => {
    const application: Application = new Application();
    application.init();
});
