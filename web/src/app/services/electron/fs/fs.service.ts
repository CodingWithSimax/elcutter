import { Injectable } from '@angular/core';
import { ReadBuffer } from '../../../pojo/read-buffer';
import { FileStats } from '../../../interfaces/file-stats';

@Injectable({
    providedIn: 'root',
})
export class FsService {
    private library: any;

    constructor() {}

    public init(library: any): void {
        this.library = library;
    }

    public readdirSync(p: string): Array<string> {
        return this.library.readdirSync(p);
    }
    public readFileSync(p: string): ReadBuffer {
        return new ReadBuffer(this.library.readFileSync(p));
    }
    public statSync(p: string): FileStats {
        return this.library.statSync(p);
    }
    public writeFileSync(p: string, content: ArrayBuffer | string): void {
        this.library.writeFileSync(p, content);
    }
    public mkdirSync(p: string): void {
        this.library.mkdirSync(p);
    }
}
