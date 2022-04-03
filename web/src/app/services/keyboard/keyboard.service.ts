import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class KeyboardService {
    private ctrlEvents: { [key: string]: () => void | Promise<void> } = {};
    private shiftEvents: { [key: string]: () => void | Promise<void> } = {};
    public wheelEvent: EventEmitter<WheelEvent> = new EventEmitter<WheelEvent>();

    constructor() {
        window.addEventListener('keydown', this.onKey.bind(this));
        window.addEventListener('wheel', this.onWheel.bind(this));
    }

    private async onKey(event: KeyboardEvent): Promise<void> {
        if (event.ctrlKey && this.ctrlEvents[event.key] !== undefined) {
            this.ctrlEvents[event.key]();
        } else if (event.shiftKey && this.shiftEvents[event.key] !== undefined) {
            this.shiftEvents[event.key]();
        }
    }

    public addShiftEvent(key: string, callback: () => void | Promise<void>): void {
        this.shiftEvents[key] = callback;
    }
    public addCtrlEvent(key: string, callback: () => void | Promise<void>): void {
        this.ctrlEvents[key] = callback;
    }

    private async onWheel(event: WheelEvent): Promise<void> {
        this.wheelEvent.emit(event);
    }
}
