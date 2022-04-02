import { Component } from '@angular/core';
import { ElectronService } from './services/electron/electron.service';
import { ProjectManagerService } from './services/project/project-manager.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'elcutter-web';

    constructor(private electron: ElectronService, private projectManagerService: ProjectManagerService) {}
}
