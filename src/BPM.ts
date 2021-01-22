import { Task } from './Task';
import { Ctx } from './TaskSys';

class BPM extends Task {
    bpm: number;
    vibes: boolean;
    isOnBeat: boolean;
    ms: number;
    lastingms?: number;
    block: () => void;

    constructor(
        frameRate: number,
        block: () => void,
        initialVibes: boolean = false,
        bpm: number = 150,
        lastingms?: number
    ) {
        super();
        this.vibes = initialVibes;
        this.bpm = bpm;
        this.isOnBeat = true;
        this.ms = 60 * 1000 / this.bpm;
        this.block = block;
        this.lastingms = lastingms;
    }

    proc(c: Ctx): void {
        if (this.isOnBeat) {
            // beat

            console.log("beat in " + this.ms + " ms");
            this.block();
            setTimeout(() => this.beat(), this.ms);
            if (this.lastingms) {
                setTimeout(() => this.finish(), this.lastingms);
            }
            this.isOnBeat = false;
        }
        
    }

    private beat(): void {
        this.isOnBeat = true;
    }
}

export { BPM };