import { KamiParticle } from './KamiParticle';
import { Task } from './Task';
import { Ctx } from './TaskSys';

class Kusudama extends Task {
    size: number;
    openAngle: number;
    pulled: boolean;

    constructor() {
        super();
        this.pulled = false;
        this.size = 100;
        this.openAngle = 0;
    }

    proc(c: Ctx): void {
        this.draw(c.cctx);
        return;
    }

    open(ctx: Ctx): void {
        this.pulled = true;

        const centerX = ctx.cctx.canvas.width / 2;
        const centerY = ctx.cctx.canvas.height / 2;
        const power = parseInt((document.querySelector("#power")! as HTMLInputElement).value)
        for (var n = 0; n < power; n++) {
            ctx.taskSys.addTask(new KamiParticle(centerX, centerY + this.size / 2));
        }
    }

    draw(c: CanvasRenderingContext2D) {
        if (this.pulled) {
            if (this.openAngle < 60) {
                this.openAngle++;
            }
        }
        c.fillStyle = "rgb(230, 200, 0)";
        // right-hand
        c.save();
        c.translate(c.canvas.width / 2, c.canvas.height / 2);
        c.beginPath();
        c.rotate(-this.openAngle / 180 * Math.PI);
        c.arc(0, +this.size, this.size, 90 / 180 * Math.PI, 270 / 180 * Math.PI, true);
        c.fill();
        c.restore();
        // left hand
        c.save();
        c.translate(c.canvas.width / 2, c.canvas.height / 2);
        c.beginPath();
        c.rotate(this.openAngle / 180 * Math.PI);
        c.arc(0, +this.size, this.size, 270 / 180 * Math.PI, 90 / 180 * Math.PI, true);
        c.fill();
        c.restore();
    }
}

export { Kusudama };
