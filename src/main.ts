import { Kusudama } from './Kusudama';
import { ClearCanvasTask } from './ClearCanvasTask';
import { TaskSys } from './TaskSys';
import { KamiParticle } from './KamiParticle';



class Universe {
    ts: TaskSys;
    kusu: Kusudama;
    
    registerEvents(): void {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

        this.ts.observer.register('open', (ctx) => this.kusu.open(ctx));
        canvas.addEventListener('click', () => this.ts.fire('open'));
    }

    constructor() {
        this.ts = new TaskSys();
        this.kusu = new Kusudama();
    }

    start() {
        this.registerEvents();
        this.ts.addTask(this.kusu);
        this.ts.run();
    }
}

new Universe().start();
