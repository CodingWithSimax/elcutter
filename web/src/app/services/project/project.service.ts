import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { ProjectConfig } from '../../interfaces/project-config';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    public config: ProjectConfig | undefined;
    private configPath: string | undefined;

    constructor(private electronService: ElectronService) {
        // auto save every minute
        setInterval(this.save.bind(this), 60 * 1000);
    }

    public load(configPath: Array<string>): void {
        this.config = JSON.parse(this.electronService.fs.readFileSync(configPath[0]).toString());
        this.configPath = configPath[0];
        this.save();
        console.log('Read config: ', this.config);
    }

    public async save(): Promise<void> {
        if (this.config === undefined || this.configPath === undefined) return;
        this.electronService.fs.writeFileSync(this.configPath, JSON.stringify(this.config, undefined, 4));
        console.log('saved project');
    }
}
