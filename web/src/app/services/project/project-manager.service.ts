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

    private createProject(event: any, path: string): void {
        const configFile = `${path}/project.elcutter`;
        console.log('Config file: ', configFile);
        this.electron.fs.writeFileSync(configFile, JSON.stringify(defaultConfig, undefined, 4));
        this.electron.fs.mkdirSync(`${path}/${defaultConfig.assetsFolder}`);
        this.projectService.load(configFile);
    }
    private loadProject(event: any, p: string): void {
        console.log('load project', p);
        this.projectService.load(p);
    }
    private saveProject(event: any): void {
        this.projectService.save();
    }
}
