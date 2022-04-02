import { app } from "electron";

export async function setupEvents() {
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
    });
}
