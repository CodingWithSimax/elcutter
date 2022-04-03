import { Component, OnInit } from '@angular/core';
import { KeyboardService } from '../../services/keyboard/keyboard.service';
import { ProjectService } from '../../services/project/project.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
    public rowHeight = 2;

    constructor(private keyboardService: KeyboardService, public projectService: ProjectService) {
        // detect scrolling for resizing
        this.keyboardService.wheelEvent.subscribe(this.onScroll.bind(this));
    }

    public ngOnInit(): void {}

    public onScroll(event: WheelEvent): void {
        if (event.ctrlKey) {
            if (event.deltaY > 0) {
                // scroll down / make smaller
                this.rowHeight = Math.max(2, this.rowHeight - 0.25);
            } else if (event.deltaY < 0) {
                // scroll up / make bigger
                this.rowHeight += 0.25;
            }
        } else if (event.shiftKey) {
        }
    }
}
