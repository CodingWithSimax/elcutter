import { TimelineObject } from './timeline-object';
export interface ProjectConfig {
    name: string;
    assetsFolder: string;
    resolution: {
        width: number;
        height: number;
    };
    fps: number;
    sources: {
        [key: string]: string;
    };
    timeline: {
        [key: number]: Array<TimelineObject>;
    };
}

const defaultConfig: ProjectConfig = {
    name: 'project',
    assetsFolder: './assets',
    resolution: {
        width: 1920,
        height: 1080,
    },
    fps: 60,
    sources: {},
    // 5 timelines at start
    timeline: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    },
};
export { defaultConfig };
