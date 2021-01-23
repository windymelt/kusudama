import { Ctx } from '../TaskSys';
import { Task } from '../Task';

class PixelRepeatGlitch extends Task {

    splitSize: number = 16;
    inMemoryCanvas = document.createElement('canvas');
    inMemoryContext = this.inMemoryCanvas.getContext("2d")!;

    constructor() {
        super(10);
        this.inMemoryCanvas.width = 1900;
        this.inMemoryCanvas.height = 768;
        this.inMemoryContext = this.inMemoryCanvas.getContext("2d")!;
    }

    proc(c: Ctx): void {
        // split canvas by regular rectangle
        // randomly rotate and copy neighbour box

        if (Math.random() < 0.6) {
            c.cctx.save();
            c.cctx.globalCompositeOperation = ["destination-over", "source-over"][Math.floor(Math.random() * 2)];
            c.cctx.drawImage(this.inMemoryCanvas, 0, 0);
            c.cctx.restore();
        }

        for (var x = 0; x < c.cctx.canvas.width; x += this.splitSize) {
            for (var y = 0; y < c.cctx.canvas.height; y += this.splitSize) {
                const shouldRotate = Math.random() < 0.001;
                if (shouldRotate) {
                    c.cctx.save();
                    c.cctx.translate(x, y);
                    c.cctx.rotate(180 / 180 * Math.PI);
                    c.cctx.drawImage(this.inMemoryCanvas, x, y, this.splitSize, this.splitSize, 0, 0, this.splitSize, this.splitSize);
                    //c.cctx.strokeRect(0, 0, this.splitSize, this.splitSize);
                    c.cctx.restore();
                }
                const shouldPropagate = Math.random() < 0.1;
                if (shouldPropagate) {
                    c.cctx.save();
                    //c.cctx.globalCompositeOperation = "xor";
                    c.cctx.globalCompositeOperation = "source-over";
                    c.cctx.drawImage(
                        this.inMemoryCanvas,
                        (x + [this.splitSize, -this.splitSize][Math.floor(Math.random() * 2)]) % c.cctx.canvas.width,
                        (y + [this.splitSize, -this.splitSize][Math.floor(Math.random() * 2)]) % c.cctx.canvas.height,
                        this.splitSize,
                        this.splitSize,
                        x,
                        y,
                        this.splitSize,
                        this.splitSize);
                    c.cctx.restore();
                }
            }
        }
        if (Math.random() < 0.95) {
            this.inMemoryContext.drawImage(c.cctx.canvas, 0, 0);
        } else {
            this.inMemoryContext.clearRect(0, 0, 1900, 768);
        }
    }
}

export { PixelRepeatGlitch };