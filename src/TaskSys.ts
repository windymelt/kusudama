import { Task } from './Task';
import { DummyTask } from './DummyTask';
import { ClearCanvasTask } from './ClearCanvasTask';

interface Ctx {
    cctx: CanvasRenderingContext2D;
    taskSys: TaskSys;
}

class Observer {
    eventTohandlers: { [ev: string]: [((ctx: Ctx) => any)?] };
    constructor() {
        this.eventTohandlers = {};
    }
    register(ev: string, f: (ctx: Ctx) => any) {
        if (!this.eventTohandlers[ev]) {
            this.eventTohandlers[ev] = [];
        }
        this.eventTohandlers[ev].push(f);
    }
    fire(ev: string, ctx: Ctx) {
        this.eventTohandlers[ev].forEach(f => {
            if (!f) return;
            f(ctx)
        });
    }
}

class TaskSys {
    tasks: Task[];
    postProcessTasks: Task[];
    isFrameOut: boolean;
    frameLimit = 3; // 3 ≈ 30fps
    canvas: HTMLCanvasElement;
    observer: Observer;

    constructor() {
        this.tasks = [new DummyTask];
        this.postProcessTasks = [new ClearCanvasTask];
        this.isFrameOut = false;
        this.observer = new Observer();
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }

    addTask(t: Task) {
        this.tasks.push(t);
    }

    fire(ev: string): void {
        const cctx = this.canvas.getContext('2d');
        if (!cctx) return;
        this.observer.fire(ev, {cctx: cctx, taskSys: this})
    }

    private frameOut() {
        this.isFrameOut = true;

        // postprocess
        this.postProcess();
        
        // re-run tasks
        this.run();
    }

    run() {
        // main task system
        this.isFrameOut = false;
        setTimeout(() => this.frameOut(), this.frameLimit)
        var tc = 0;
        while (true) {
            //console.log("task system " + tc + " / " + this.tasks.length);
            if (this.isFrameOut) break;
            if (this.tasks.length == 0) break;
            const cctx = this.canvas.getContext('2d');
            if (!cctx) break;

            this.tasks[tc++].proc({ cctx: cctx, taskSys: this });

            if (tc >= this.tasks.length) break;
        }
        // frame end.
        // remove finished tasks.
        this.tasks = this.tasks.filter((t) => !t.isFinished);
    }

    postProcess(): void {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        const c = canvas.getContext('2d');
        if (!c) return;
        this.postProcessTasks.forEach(task => {
            task.proc({ cctx: c, taskSys: this });
        });
    }
}

export { TaskSys, Ctx };
