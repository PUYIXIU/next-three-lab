export class BigCircle {
    root:HTMLElement
    cursor:HTMLElement
    circle:HTMLElement
    dot:HTMLElement
    pointerX: number
    pointerY: number
    cursorSize: number
    dotSize: number
    circleStyle: any
    dotStyle: any


    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElement('div')
        this.cursor.className = 'curzr-big-circle'
        this.cursor.style.pointerEvents = 'none'
        this.cursor.style.opacity = '0'
        this.root.append(this.cursor)

        this.circle = document.createElement('div')
        this.circle.className = 'circle'
        this.cursor.append(this.circle)

        this.dot = document.createElement('div')
        this.dot.className = 'dot'
        this.cursor.append(this.dot)

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 50
        this.dotSize = 6
        this.circleStyle = {
            boxSizing: 'border-box',
            position: 'absolute',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            borderRadius: '50%',
            transition: '500ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none',
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'absolute',
            zIndex: '2147483647',
            top:0,
            left:0,
            width: '6px',
            height: '6px',
            backgroundColor: '#0000',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: '250ms, transform 75ms'
        }

        if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
            this.circleStyle.backdropFilter = 'invert(0.85) grayscale(1)'
            this.dotStyle.backdropFilter = 'invert(1)'
            this.circleStyle.backgroundColor = '#fff0'
        } else {
            this.circleStyle.backgroundColor = '#000'
            this.circleStyle.opacity = '0.5'
        }

        this.init(this.circle, this.circleStyle)
        this.init(this.dot, this.dotStyle)

        target.onmousemove = e =>this.move(e)

        target.onmouseenter = this.show.bind(this)
        target.onmouseleave = this.hidden.bind(this)
        target.onclick = this.click.bind(this)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
    }
    show(){
        this.cursor.removeAttribute('hidden')
        this.cursor.style.opacity = "1"
    }
    move(event:MouseEvent) {
        this.show()
        const target = event.target as HTMLElement
        this.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.pointerY = event.pageY - this.root.getBoundingClientRect().top


        this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`

        console.log(this.circle.style.transform ,this.dot.style.transform )
        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            Array.from(target.classList).includes('curzr-hover')) {
            this.hover()
        }
    }

    hover() {
        this.circle.style.transform += ` scale(2.5)`
    }

    click() {
        this.circle.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.circle.style.transform = this.circle.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
