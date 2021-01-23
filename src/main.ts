import { Kusudama } from './Kusudama';
import { TaskSys } from './TaskSys';
import { SlideinText } from './texts/SlideinText';
import { BPM } from './BPM';
import { TiledText } from './texts/TiledText';
import { PixelRepeatGlitch } from './glitch/PixelRepeatGlitch';

class Universe {
    ts: TaskSys;
    kusu?: Kusudama;

    registerEvents(): void {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

        canvas.addEventListener('click', () => this.ts.fire('open'));
        document.querySelector("#apply")?.addEventListener('click', () => {
            this.start();
        })
    }

    constructor() {
        this.ts = new TaskSys();
    }

    start() {
        this.ts.halt();
        this.ts = new TaskSys();
        this.ts.observer.register('open', (ctx) => this.kusu!.open(ctx));
        this.ts.observer.register('open', (ctx) => {
            if (!(document.querySelector("#party-mode")! as HTMLInputElement).checked) {
                return;
            }
            ctx.taskSys.addTask(new BPM(30, () => {
                [
                    () => { },
                    () => {
                        ctx.taskSys.addTask(new SlideinText(
                            "LOOKS GOOD TO ME",
                            "italic bold 100px sans-selif",
                            ctx.cctx.canvas.width,
                            ctx.cctx.canvas.height - 100,
                            0,
                            ctx.cctx.canvas.height - 100,
                        ));
                    },
                    () => {
                        ctx.taskSys.addTask(new SlideinText(
                            "CONGRATS",
                            "italic bold 200px sans-selif",
                            ctx.cctx.canvas.width,
                            ctx.cctx.canvas.height - 200,
                            -60,
                            ctx.cctx.canvas.height - 200,
                        ));
                    },
                    () => {
                        ctx.taskSys.addTask(new SlideinText(
                            "KUSUDAMA",
                            "italic bold 500px sans-selif",
                            -ctx.cctx.canvas.width,
                            ctx.cctx.canvas.height,
                            0,
                            ctx.cctx.canvas.height,
                        ));
                    },
                    () => {
                        ctx.taskSys.addTask(new SlideinText(
                            "CONGRATS",
                            "italic bold 500px sans-selif",
                            -ctx.cctx.canvas.width,
                            ctx.cctx.canvas.height,
                            -ctx.cctx.canvas.width,
                            500,
                        ));
                    },
                    () => {
                        ctx.taskSys.addTask(new TiledText("YES "));
                    },
                    () => {
                        ctx.taskSys.addTask(new TiledText("LGTM "));
                    },
                    () => {
                        ctx.taskSys.addTask(new TiledText("MEDETAI "));
                    }
                ][Math.floor(Math.random() * 8)]()
            }, true, 300, 1000));
        });
        this.kusu = new Kusudama();
        this.ts.addTask(this.kusu!);
        if ((document.querySelector("#block-glitch-mode")! as HTMLInputElement).checked) {
            this.ts.addTask(new PixelRepeatGlitch())
        }
        this.ts.run();
    }
}

const universe = new Universe();
universe.registerEvents();
universe.start();
