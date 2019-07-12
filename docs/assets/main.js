var Carousel = /** @class */ (function () {
    function Carousel() {
        this.handleDragStart = this.startDragging.bind(this);
        this.handleDragStop = this.stopDragging.bind(this);
        this.handleDrag = this.dragging.bind(this);
        this.handleMouseMove = this.preventScrollSnapping.bind(this);
        this._carousel = document.body.querySelector('carousel');
        this._slides = Array.from(document.body.querySelectorAll('slide'));
        this._mouse = null;
        this._dragging = false;
        this._dragDistance = 0;
        this.init();
    }
    Carousel.prototype.init = function () {
        for (var i = 0; i < this._slides.length; i++) {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
        }
        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
        document.body.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    };
    Carousel.prototype.preventScrollSnapping = function () {
        this._carousel.classList.add('is-pointer-device');
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        this._carousel.addEventListener('scroll', function (e) { e.preventDefault(); e.stopImmediatePropagation(); });
    };
    Carousel.prototype.startDragging = function (e) {
        e.preventDefault();
        console.log('Started Dragging');
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    };
    Carousel.prototype.stopDragging = function (e) {
        if (this._dragging) {
            console.log('Stopped Dragging');
            this._carousel.classList.remove('is-dragging');
            this._dragging = false;
            this._mouse = null;
            var currentScrollLeft = this._carousel.scrollLeft;
            var totalScrollLeft = this._carousel.scrollWidth;
            var widthPerSlide = totalScrollLeft / this._slides.length;
            var triggerDistance = widthPerSlide / 4;
            var slide = Math.floor(currentScrollLeft / widthPerSlide);
            var direction = (this._dragDistance > 0) ? 1 : -1;
            var slideBounds = this._slides[slide].getBoundingClientRect();
            var difference = (direction === 1) ? slideBounds.left : slideBounds.right;
            if (Math.abs(difference) >= triggerDistance) {
                var slideOffset = (direction === 1) ? slide + 1 : slide;
                this._carousel.scrollTo({
                    left: widthPerSlide * slideOffset,
                    top: 0,
                    behavior: 'smooth'
                });
            }
            else {
                this._carousel.scrollTo({
                    left: currentScrollLeft + difference,
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    };
    Carousel.prototype.dragging = function (e) {
        if (this._dragging) {
            var newMouse = { x: e.x, y: e.y };
            // console.log((newMouse.x - this._mouse.x), (newMouse.y - this._mouse.y));
            var newOffset = (newMouse.x - this._mouse.x) * -1;
            this._dragDistance += newOffset;
            this._mouse = newMouse;
            this._carousel.scrollBy({
                left: newOffset,
                top: 0,
                behavior: 'auto'
            });
        }
    };
    return Carousel;
}());
new Carousel();
//# sourceMappingURL=main.js.map