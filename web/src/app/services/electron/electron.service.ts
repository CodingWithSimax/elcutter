import { Injectable } from '@angular/core';
import { FsService } from './fs/fs.service';
import { FileDialogService } from './file-dialog/file-dialog.service';
import { PathService } from './path/path.service';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {
    public require: (arg: string) => any;

    constructor(public fs: FsService, public fileDialog: FileDialogService, public path: PathService) {
        this.require = (<any>window).require;
        const fsLibrary = this.require('fs');
        fs.init(fsLibrary);
        const electronLibrary = this.require('@electron/remote');
        fileDialog.init(electronLibrary);
        const pathLibrary = this.require('path');
        path.init(pathLibrary);
    }
}
