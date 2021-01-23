import { Ctx } from './TaskSys';

abstract class Task {
    abstract proc(c: Ctx): void;
    isFinished: boolean;
    nice: number = 0;

    constructor(nice: number = 0) {
        this.isFinished = false;
        this.nice = nice;
    }

    finish() {
        this.isFinished = true;
    }
}

export { Task };
