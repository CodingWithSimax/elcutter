import { Injectable } from '@angular/core';
import { OpenDialogOptions } from '../../../interfaces/open-dialog-options';
import { SaveDialogOptions } from '../../../interfaces/save-dialog-options';

@Injectable({
    providedIn: 'root',
})
export class FileDialogService {
    private library: any;

    constructor() {}

    public init(library: any) {
        this.library = library;
    }

    public showOpenDialogSync(properties: OpenDialogOptions): string[] | undefined {
        return this.library.dialog.showOpenDialogSync(properties);
    }
    public showSaveDialogSync(properties: SaveDialogOptions): string | undefined {
        return this.library.dialog.showSaveDialogSync(properties);
    }
}
