export default class DefaultHTMLComponent {
    rootDiv = null;
    isShow = false;
    constructor(idOrDiv, isShow = true) {
        if (typeof idOrDiv === "string") {
            this.rootDiv = document.getElementById(idOrDiv);
        }
        else {
            this.rootDiv = idOrDiv || null;
        }
        if (!this.rootDiv) {
            throw new Error("rootDiv is required!");
        }
        else {
            this.isShow = isShow;
            if (!this.isShow)
                this.rootDiv.style.display = "none";
        }
    }
    toggleShow(display = "block") {
        if (!this.rootDiv)
            return;
        if (this.isShow) {
            this.rootDiv.style.display = "none";
        }
        else {
            this.rootDiv.style.display = display;
        }
        this.isShow = !this.isShow;
    }
    disable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv))
            return;
        this.rootDiv.disabled = true;
    }
    enable() {
        if (!this.rootDiv || !("disabled" in this.rootDiv))
            return;
        this.rootDiv.disabled = false;
    }
    set value(v) {
        if (this.rootDiv && ("value" in this.rootDiv)) {
            this.rootDiv.value = v;
        }
    }
    get value() {
        if (this.rootDiv && ("value" in this.rootDiv))
            return this.rootDiv.value;
        else
            return "";
    }
    getTarget() {
        return this.rootDiv;
    }
}
