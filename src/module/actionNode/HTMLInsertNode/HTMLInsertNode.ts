import { SWAN } from "../base";

class HTMLInsertNode extends SWAN {
    document: HTMLElement;
    constructor(document: HTMLElement) {
        super();

        this.document = document;
    }

    targetHTMLElement() {
        let originalStyle;
        this.document.addEventListener("mouseover", (event: Event) => {
            console.log(event.target);
            if (event.target instanceof HTMLElement) {
                originalStyle = String(event.target.style);
                event.target.style = "border: 5px solid red;";
            }
        });

        this.document.addEventListener("mouseout", (event: Event) => {
            if (event.target instanceof HTMLElement) {
                originalStyle = String(event.target.style);
                event.target.style = originalStyle;
            }
        });
    }
}

export { HTMLInsertNode };
