interface Mouse{
    x: number;
    y: number;
}

class Carousel
{
    private _carousel : HTMLElement;
    private _slides : Array<HTMLElement>;
    private _mouse : Mouse;    

    constructor()
    {
        this._carousel = document.body.querySelector('carousel');
        this._slides = Array.from(document.body.querySelectorAll('slide'));
        this._mouse = null;
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
            this._slides[i].addEventListener('dragend', this.handleDragStop);
            this._slides[i].addEventListener('drag', this.handleDrag);
        }
    }

    private startDragging(e:DragEvent) : void
    {
        e.preventDefault();
        console.log('Started Dragging');
        console.log(e);
        this._carousel.classList.add('is-dragging');
        this._mouse = {
            x: e.x,
            y: e.y
        }
    }

    private stopDragging(e:DragEvent) : void
    {
        e.preventDefault();
        console.log('Stopped Dragging');
        console.log(e);
        this._carousel.classList.remove('is-dragging');
    }

    private dragging(e:DragEvent) : void
    {
        e.preventDefault();
        console.log(e);
        const newMouse = {
            x: e.x,
            y: e.y
        }

        console.log((newMouse.x - this._mouse.x), (newMouse.y - this._mouse.y));
    }
}

new Carousel();
