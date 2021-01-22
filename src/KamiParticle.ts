import { Task } from './Task';
import { Ctx } from './TaskSys';

class KamiParticle extends Task {
    x: number;
    y: number;
    xa: number;
    ya: number;
    deg: number;
    helical: number;
    fillStyle: string;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.xa = 0;
        this.ya = 0;
        this.deg = 0;
        this.helical = 0;
        this.fillStyle = ["red", "yellow", "gray", "blue"][Math.floor(Math.random() * 4)];
    }

    private rnorm() {
        return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
    }

    proc(c: Ctx): void {
        // brown movement
        const gravity = 0.01;
        this.xa += this.rnorm() / 10;
        this.ya += this.rnorm() / 10 + gravity;
        
        this.x += this.xa;
        this.y += this.ya;

        // helical movement
        this.helical = (this.helical + 6 * Math.abs(this.rnorm())) % 360;
        const helicalFactor = Math.cos(this.helical / 180 * Math.PI);

        this.deg = (this.deg + 2 * Math.abs(this.rnorm())) % 360;

        if (this.isOutOfCanvas(c)) {
            this.finish();
        }

        c.cctx.save();
        c.cctx.fillStyle = this.fillStyle;
        c.cctx.translate(this.x, this.y);
        c.cctx.rotate(this.deg / 180 * Math.PI);
        c.cctx.fillRect(0, 0, 10 * helicalFactor, 16);
        c.cctx.restore();

        return;
    }

    private isOutOfCanvas(c: Ctx): boolean {
        if (this.x < 0) return true;
        if (this.y < 0) return true;
        if (this.x > c.cctx.canvas.width) return true;
        if (this.y > c.cctx.canvas.height) return true;
        return false;
    }
}

export { KamiParticle };
