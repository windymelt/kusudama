import { Ctx } from './TaskSys';

abstract class Task {
    abstract proc(c: Ctx): void;
    isFinished: boolean;

    constructor() {
        this.isFinished = false;
    }

    finish() {
        this.isFinished = true;
    }
}

export { Task };
