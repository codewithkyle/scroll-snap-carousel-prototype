interface Mouse{
    x: number;
    y: number;
}

class Carousel
{
    private _carousel : HTMLElement;
    private _slides : Array<HTMLElement>;
    private _mouse : Mouse;
    private _dragging : boolean;

    constructor()
    {
        this._carousel = document.body.querySelector('carousel');
        this._slides = Array.from(document.body.querySelectorAll('slide'));
        this._mouse = null;
        this._dragging = false;
        this.init();
    }

    private handleDragStart:EventListener = this.startDragging.bind(this);
    private handleDragStop:EventListener = this.stopDragging.bind(this);
    private handleDrag:EventListener = this.dragging.bind(this);

    private init() : void
    {
        for(let i = 0; i < this._slides.length; i++)
        {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
        }

        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
    }

    private startDragging(e:DragEvent) : void
    {
        e.preventDefault();
        console.log('Started Dragging');
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
    }

    private stopDragging(e:MouseEvent) : void
    {
        if(this._dragging)
        {
            console.log('Stopped Dragging');
            this._carousel.classList.remove('is-dragging');
            this._dragging = false;
            this._mouse = null;
        }
    }

    private dragging(e:MouseEvent) : void
    {
        if(this._dragging)
        {
            const newMouse = { x: e.x, y: e.y };
            console.log((newMouse.x - this._mouse.x), (newMouse.y - this._mouse.y));
        }
    }
}

new Carousel();
