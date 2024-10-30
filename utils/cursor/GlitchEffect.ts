export class GlitchEffect {
    root:HTMLElement
    cursor:HTMLElement

    distanceX:number
    distanceY:number
    pointerX:number
    pointerY:number
    previousPointerX:number
    previousPointerY:number
    cursorSize:number

    glitchColorB:string
    glitchColorR:string

    cursorStyle:any

    moving:boolean = false
    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElement('div')
        this.cursor.className = 'curzr-glitch-effect'
        this.root.append(this.cursor)

        this.distanceX = 0
        this.distanceY = 0
        this.pointerX = 0
        this.pointerY = 0
        this.previousPointerX = 0

        this.previousPointerY = 0
        this.cursorSize = 15
        this.glitchColorB = '#00feff'
        this.glitchColorR = '#ff4f71'

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'absolute',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#222',
            borderRadius: '50%',
            boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
            transition: '100ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity:"0"
        }

        if (CSS.supports("backdrop-filter", "invert(1)")) {
            this.cursorStyle.backdropFilter = 'invert(1)'
            this.cursorStyle.backgroundColor = '#fff0'
        } else {
            this.cursorStyle.backgroundColor = '#222'
        }

        this.init(this.cursor, this.cursorStyle)

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
        this.previousPointerX = this.pointerX
        this.previousPointerY = this.pointerY
        this.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.pointerY = event.pageY - this.root.getBoundingClientRect().top
        this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
        this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)

        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            target.onclick !== null ||
            Array.from(target.classList).includes('curzr-hover')) {
            this.hover()
        } else {
            this.hoverout()
        }

        this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.cursor.style.boxShadow = `
      ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB},
      ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
        this.stop()
    }

    hover() {
        this.cursorSize = 30
    }

    hoverout() {
        this.cursorSize = 15
    }

    click() {
        this.cursor.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    stop() {
        if (!this.moving) {
            this.moving = true
            setTimeout(() => {
                this.cursor.style.boxShadow = ''
                this.moving = false
            }, 50)
        }
    }

    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
