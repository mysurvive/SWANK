import { ICanvas } from "pixi.js";
import { SWAN } from "../base";

class HTMLInsertNode extends SWAN {
    document: HTMLElement;
    declare pixiApp: PIXI.Application;
    pixiGraphics: PIXI.Graphics = new PIXI.Graphics();

    constructor(document: HTMLElement) {
        super();

        this.document = document;
    }

    targetHTMLElement() {
        this.document.innerHTML += `<canvas style="position: absolute; top: 0; left: 0; pointer-events: none; width: 100%; height: 100%; z-index: 100;"></canvas>`;

        const canvas = this.document.querySelector("canvas");
        if (canvas) {
            this.pixiApp = new PIXI.Application({
                view: canvas as ICanvas,
                width: this.document.clientWidth,
                height: this.document.clientHeight,
                backgroundAlpha: 0,
            });

            this.pixiApp.stage.addChild(this.pixiGraphics);
        }

        this.document.addEventListener("mouseover", (event: Event) => {
            const hoverTarget = event.target;
            if (hoverTarget instanceof HTMLElement) {
                this.updatePixiRect(
                    hoverTarget.offsetLeft,
                    hoverTarget.offsetTop,
                    hoverTarget.clientWidth,
                    hoverTarget.clientHeight,
                );
            }
        });
    }

    updatePixiRect(x: number, y: number, w: number, h: number): void {
        this.pixiGraphics.clear();
        this.pixiGraphics.lineStyle(4, 0xff0000, 1);
        this.pixiGraphics.drawRect(x, y, w, h);
    }
}

export { HTMLInsertNode };
