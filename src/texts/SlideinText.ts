import { Task } from '../Task';
import { Ctx } from '../TaskSys';

class SlideinText extends Task {
    text: string;
    font: string;
    fromxy: { x: number, y: number };
    toxy: { x: number, y: number };
    currentxy: { x: number, y: number };
    moveIn: number;
    moveThen: number;
    count: number = 0;

    constructor(text: string, font: string, x: number, y: number, xx: number, yy: number) {
        super();
        this.text = text;
        this.moveIn = 10;
        this.moveThen = 60;
        this.fromxy = { x: x, y: y };
        this.currentxy = { x: x, y: y };
        this.toxy = { x: xx, y: yy };
        this.font = font;
    }

    proc(c: Ctx): void {
        if (this.count > this.moveIn + this.moveThen) this.finish();

        if (this.count < this.moveIn) {
            this.currentxy.x += (this.toxy.x - this.fromxy.x) / this.moveIn;
            this.currentxy.y += (this.toxy.y - this.fromxy.y) / this.moveIn;
        }
        this.count++;

        c.cctx.font = this.font;
        c.cctx.strokeText(this.text, this.currentxy.x, this.currentxy.y);
    }
}

export { SlideinText };