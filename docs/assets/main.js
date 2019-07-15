var Carousel = /** @class */ (function () {
    function Carousel() {
        this.handleDragStart = this.startDragging.bind(this);
        this.handleDragStop = this.stopDragging.bind(this);
        this.handleDrag = this.dragging.bind(this);
        this.handleMouseDown = this.preventScrollSnapping.bind(this);
        this.handleScroll = this.addScrollSnapping.bind(this);
        this.handleButtonClick = this.switchSlide.bind(this);
        this.handleControlButtonClick = this.jumpToSlide.bind(this);
        this._carousel = document.body.querySelector('carousel');
        this._slides = Array.from(document.body.querySelectorAll('slide'));
        this._mouse = null;
        this._dragging = false;
        this._dragDistance = 0;
        this._buttons = Array.from(document.body.querySelectorAll('button'));
        this._slideControlButton = Array.from(document.body.querySelectorAll('carousel-controls button'));
        this.init();
    }
    Carousel.prototype.init = function () {
        for (var i = 0; i < this._slides.length; i++) {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
        }
        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
        this._carousel.addEventListener('mousedown', this.handleMouseDown, { passive: true });
        this._carousel.addEventListener('scroll', this.handleScroll, { passive: true });
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].addEventListener('click', this.handleButtonClick);
        }
        for (var i = 0; i < this._slideControlButton.length; i++) {
            this._slideControlButton[i].addEventListener('click', this.handleControlButtonClick);
        }
    };
    Carousel.prototype.jumpToSlide = function (e) {
        var button = e.currentTarget;
        var slideIndex = parseInt(button.dataset.slideIndex);
        var totalScrollLeft = this._carousel.scrollWidth;
        var widthPerSlide = totalScrollLeft / this._slides.length;
        var newOffset = widthPerSlide * slideIndex;
        this._carousel.scrollTo({
            left: newOffset,
            top: 0,
            behavior: 'smooth'
        });
        this.updateActiveControl(slideIndex);
    };
    Carousel.prototype.updateActiveControl = function (newActiveIndex) {
        for (var i = 0; i < this._slideControlButton.length; i++) {
            if (i !== newActiveIndex) {
                this._slideControlButton[i].classList.remove('is-active');
            }
            else {
                this._slideControlButton[i].classList.add('is-active');
            }
        }
    };
    Carousel.prototype.switchSlide = function (e) {
        var target = e.currentTarget;
        var direction = parseInt(target.dataset.direction);
        var currentScrollLeft = this._carousel.scrollLeft;
        var totalScrollLeft = this._carousel.scrollWidth;
        var widthPerSlide = totalScrollLeft / this._slides.length;
        var slide = Math.floor(currentScrollLeft / widthPerSlide);
        slide += direction;
        if (slide < 0) {
            slide = 0;
        }
        var newOffset = widthPerSlide * slide;
        this._carousel.scrollTo({
            left: newOffset,
            top: 0,
            behavior: 'smooth'
        });
    };
    Carousel.prototype.preventScrollSnapping = function () {
        this._carousel.classList.add('is-pointer-device');
    };
    Carousel.prototype.addScrollSnapping = function () {
        this._carousel.classList.remove('is-pointer-device');
    };
    Carousel.prototype.startDragging = function (e) {
        e.preventDefault();
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    };
    Carousel.prototype.stopDragging = function (e) {
        if (this._dragging) {
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