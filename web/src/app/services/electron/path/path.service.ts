import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PathService {
    private library: any;

    constructor() {}

    public init(library: any): void {
        this.library = library;
    }
}
