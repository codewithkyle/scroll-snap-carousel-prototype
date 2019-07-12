var Carousel = /** @class */ (function () {
    function Carousel() {
        this.handleDragStart = this.startDragging.bind(this);
        this.handleDragStop = this.stopDragging.bind(this);
        this.handleDrag = this.dragging.bind(this);
        this._carousel = document.body.querySelector('carousel');
        this._slides = Array.from(document.body.querySelectorAll('slide'));
        this._mouse = null;
        this.init();
    }
    Carousel.prototype.init = function () {
        for (var i = 0; i < this._slides.length; i++) {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('dragend', this.handleDragStop);
            this._slides[i].addEventListener('drag', this.handleDrag);
        }
    };
    Carousel.prototype.startDragging = function (e) {
        e.preventDefault();
        console.log('Started Dragging');
        console.log(e);
        this._carousel.classList.add('is-dragging');
        this._mouse = {
            x: e.x,
            y: e.y
        };
    };
    Carousel.prototype.stopDragging = function (e) {
        e.preventDefault();
        console.log('Stopped Dragging');
        console.log(e);
        this._carousel.classList.remove('is-dragging');
    };
    Carousel.prototype.dragging = function (e) {
        e.preventDefault();
        console.log(e);
        var newMouse = {
            x: e.x,
            y: e.y
        };
        console.log((newMouse.x - this._mouse.x), (newMouse.y - this._mouse.y));
    };
    return Carousel;
}());
new Carousel();
//# sourceMappingURL=main.js.map