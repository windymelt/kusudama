import { Task } from '../Task';
import { Ctx } from '../TaskSys';

class TiledText extends Task {
    text: string;
    font: string = 'italic bold 200px sans-selif';

    lastingms: number = 100;

    constructor(text: string) {
        super();
        
        this.text = text;
    }

    proc(c: Ctx): void {
        c.cctx.fillStyle = "gray";
        c.cctx.font = this.font;
        var y = 200;
        while (true) {
            var x = 0;
            while (true) {
                const m = c.cctx.measureText(this.text);
                c.cctx.fillText(this.text, x, y);
                x += m.width;
                console.log("" + x + ":" + y);
                if (x > c.cctx.canvas.width) break;
            }
            if (y > c.cctx.canvas.height) break;
            y += 200;
        }
        setTimeout(() => this.finish(), this.lastingms);
    }
}

export { TiledText };