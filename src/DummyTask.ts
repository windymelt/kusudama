import { Task } from './Task';
import { Ctx } from './TaskSys';

class DummyTask extends Task {
    proc(c: Ctx) {
        return false;
    }
}

export { DummyTask };
