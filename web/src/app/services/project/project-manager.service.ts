import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { defaultConfig } from '../../interfaces/project-config';
import { ProjectService } from './project.service';

@Injectable({
    providedIn: 'root',
})
export class ProjectManagerService {
    constructor(private electron: ElectronService, private projectService: ProjectService) {
        const renderer = this.electron.require('electron').ipcRenderer;
        renderer.on('create-project', this.createProject.bind(this));
        renderer.on('load-project', this.loadProject.bind(this));
        renderer.on('save-project', this.saveProject.bind(this));
    }

    private createProject(event: any, file: string, folder: string): void {
        console.log('Config file: ', file);
        this.electron.fs.writeFileSync(file, JSON.stringify(defaultConfig, undefined, 4));
        this.electron.fs.mkdirSync(`${folder}/${defaultConfig.assetsFolder}`);
        this.projectService.load([file]);
    }
    private loadProject(event: any, p: Array<string>): void {
        console.log('load project', p);
        this.projectService.load(p);
    }
    private saveProject(event: any): void {
        this.projectService.save();
    }
}
