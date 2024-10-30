export class RingDot {
    root:HTMLElement
    cursor:HTMLElement
    dot:HTMLElement
    pointerX:number
    pointerY:number
    cursorSize:number
    cursorStyle:any
    dotStyle:any
    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElement('div')
        this.cursor.className = 'curzr-ring-dot'
        this.root.append(this.cursor)

        this.dot = document.createElement('div')
        this.dot.className = 'curzr-dot'
        this.cursor.append(this.dot)
        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 20

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'absolute',
            display: 'flex',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            boxShadow: '0 0 0 1.25px #292927, 0 0 0 2.25px #bc6c25',
            borderRadius: '50%',
            transition: '200ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity:"0"
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'absolute',
            zIndex: '2147483647',
            width: '4px',
            height: '4px',
            backgroundColor: '#292927',
            boxShadow: '0 0 0 1px #bc6c25',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
        }

        this.init(this.cursor, this.cursorStyle)
        this.init(this.dot, this.dotStyle)
        target.onmousemove = e =>this.move(e)
        target.onmouseenter = this.show.bind(this)
        target.onmouseleave = this.hidden.bind(this)
        target.onclick = this.click.bind(this)
    }

    show(){
        this.cursor.removeAttribute('hidden')
        this.cursor.style.opacity = "1"
    }
    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
    }

    move(event:MouseEvent) {
        this.show()
        const target = event.target as HTMLElement

        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            Array.from(target.classList).includes('curzr-hover')) {
            this.hover(40)
        } else {
            this.hoverout()
        }

        //  鼠标位置
        this.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.pointerY = event.pageY - this.root.getBoundingClientRect().top

        this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
    }

    hover(radius:number) {
        this.cursor.style.width = this.cursor.style.height = `${radius}px`
        this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`
    }

    hoverout() {
        this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`
        this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`
    }

    click() {
        this.cursor.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
