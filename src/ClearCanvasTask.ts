import { Task } from './Task';
import { Ctx } from './TaskSys';

class ClearCanvasTask extends Task {
    constructor() {
        super();
    }

    proc(c: Ctx): boolean {
        c.cctx.clearRect(0, 0, c.cctx.canvas.width, c.cctx.canvas.height);
        return false;
    }
}

export { ClearCanvasTask };
