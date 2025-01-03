export class ArrowPointer {
    root: HTMLElement;
    cursor: HTMLElement
    position:any
    previousPointerX:number
    previousPointerY:number
    angle:number
    previousAngle:number
    angleDisplace:number
    degrees:number
    cursorSize:number
    cursorStyle:any
    distance:number = 0
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-arrow-pointer") as HTMLElement

        this.position = {
            distanceX: 0,
            distanceY: 0,
            distance: 0,
            pointerX: 0,
            pointerY: 0,
        }
        this.previousPointerX = 0
        this.previousPointerY = 0
        this.angle = 0
        this.previousAngle = 0
        this.angleDisplace = 0
        this.degrees = 57.296
        this.cursorSize = 20

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            transition: '250ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.init(this.cursor, this.cursorStyle)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"
    }

    move(event:MouseEvent) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

        if (this.distance > 1) {
            this.rotate(this.position)
        } else {
            this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
        }
    }

    rotate(position:any) {
        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees

        const style = this.cursor.style
        this.previousAngle = this.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
            this.angle = 90 - unsortedAngle + 0
        } else if (position.distanceX < 0 && position.distanceY < 0) {
            this.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
            this.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
            this.angle = unsortedAngle + 270
        }

        if (isNaN(this.angle)) {
            this.angle = this.previousAngle
        } else {
            if (this.angle - this.previousAngle <= -270) {
                this.angleDisplace += 360 + this.angle - this.previousAngle
            } else if (this.angle - this.previousAngle >= 270) {
                this.angleDisplace += this.angle - this.previousAngle - 360
            } else {
                this.angleDisplace += this.angle - this.previousAngle
            }
        }
        style.left = `${ -this.cursorSize / 2 }px`
        style.top = `${ 0 }px`
        style.transform += ` rotate(${this.angleDisplace}deg)`
    }

    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}

export class BigCircle {
    root:HTMLElement
    cursor:HTMLElement
    circle:HTMLElement
    dot:HTMLElement
    pointerX: number
    pointerY: number
    cursorSize: number
    circleStyle: any
    dotStyle: any


    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-big-circle") as HTMLElement
        this.circle = document.querySelector(".curzr-big-circle .circle") as HTMLElement
        this.dot = document.querySelector(".curzr-big-circle .dot") as HTMLElement

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 50

        this.circleStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            borderRadius: '50%',
            transition: '500ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            zIndex: '2147483647',
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
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"
    }

    move(event:MouseEvent) {
        this.pointerX = event.pageX
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y

        this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`

        const target = event.target as HTMLElement
        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            target.onclick !== null ||
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

export class RingDot {
    root:HTMLElement
    cursor:HTMLElement
    dot:HTMLElement
    pointerX:number
    pointerY:number
    cursorSize:number
    cursorStyle:any
    dotStyle:any
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-ring-dot") as HTMLElement
        this.dot = document.querySelector(".curzr-ring-dot .curzr-dot") as HTMLElement

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 20

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            display: 'flex',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            boxShadow: '0 0 0 1.25px #292927, 0 0 0 2.25px #edf370',
            borderRadius: '50%',
            transition: '200ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            zIndex: '2147483647',
            width: '4px',
            height: '4px',
            backgroundColor: '#292927',
            boxShadow: '0 0 0 1px #edf370',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
        }

        this.init(this.cursor, this.cursorStyle)
        this.init(this.dot, this.dotStyle)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"
    }

    move(event:MouseEvent) {
        const target = event.target as HTMLElement
        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            target.onclick !== null ||
            Array.from(target.classList).includes('curzr-hover')) {
            this.hover(40)
        } else {
            this.hoverout()
        }

        this.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y

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

export class CircleAndDot {
    root:HTMLElement
    cursor:HTMLElement
    position:any
    cursorStyle:any

    previousPointerX:number
    previousPointerY:number
    angle:number
    previousAngle:number
    angleDisplace:number
    degrees:number
    cursorSize:number
    distance:number = 0

    fading:boolean

    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-circle-and-dot") as HTMLElement

        this.position = {
            distanceX: 0,
            distanceY: 0,
            distance: 0,
            pointerX: 0,
            pointerY: 0,
        }
        this.previousPointerX = 0
        this.previousPointerY = 0
        this.angle = 0
        this.previousAngle = 0
        this.angleDisplace = 0
        this.degrees = 57.296
        this.cursorSize = 20
        this.fading = false

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            border: '1.25px solid #292927',
            borderRadius: '50%',
            boxShadow: '0 -15px 0 -8px #292927',
            transition: '250ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.init(this.cursor, this.cursorStyle)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"
    }

    move(event:MouseEvent) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        const target = event.target as HTMLElement
        if (target.localName === 'svg' ||
            target.localName === 'a' ||
            target.onclick !== null ||
            Array.from(target.classList).includes('curzr-hover')) {
            this.hover()
        } else {
            this.hoverout()
        }

        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

        this.rotate(this.position)
        this.fade(this.distance)
    }

    rotate(position:any) {
        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        this.previousAngle = this.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
            this.angle = 90 - unsortedAngle + 0
        } else if (position.distanceX < 0 && position.distanceY < 0) {
            this.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
            this.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
            this.angle = unsortedAngle + 270
        }

        if (isNaN(this.angle)) {
            this.angle = this.previousAngle
        } else {
            if (this.angle - this.previousAngle <= -270) {
                this.angleDisplace += 360 + this.angle - this.previousAngle
            } else if (this.angle - this.previousAngle >= 270) {
                this.angleDisplace += this.angle - this.previousAngle - 360
            } else {
                this.angleDisplace += this.angle - this.previousAngle
            }
        }
        this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
    }

    hover() {
        this.cursor.style.border = '10px solid #292927'
    }

    hoverout() {
        this.cursor.style.border = '1.25px solid #292927'
    }

    fade(distance:number) {
        this.cursor.style.boxShadow = `0 ${-15 - distance}px 0 -8px #292927`
        if (!this.fading) {
            this.fading = true
            setTimeout(() => {
                this.cursor.style.boxShadow = '0 -15px 0 -8px #29292700'
                this.fading = false
            }, 50)
        }
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
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-glitch-effect") as HTMLElement

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
            position: 'fixed',
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
            pointerEvents: 'none'
        }

        if (CSS.supports("backdrop-filter", "invert(1)")) {
            this.cursorStyle.backdropFilter = 'invert(1)'
            this.cursorStyle.backgroundColor = '#fff0'
        } else {
            this.cursorStyle.backgroundColor = '#222'
        }

        this.init(this.cursor, this.cursorStyle)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"

    }

    move(event:MouseEvent) {
        this.previousPointerX = this.pointerX
        this.previousPointerY = this.pointerY
        this.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y
        this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
        this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)

        const target = event.target as HTMLElement
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

export class MotionBlur {
    root:HTMLElement
    cursor:HTMLElement
    filter:HTMLElement

    previousPointerX
    previousPointerY
    angle
    previousAngle
    angleDisplace
    degrees
    cursorSize
    moving:boolean = false

    position:any
    cursorStyle:any
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr-motion") as HTMLElement
        this.filter = document.querySelector(".curzr-motion .curzr-motion-blur") as HTMLElement

        this.position = {
            distanceX: 0,
            distanceY: 0,
            pointerX: 0,
            pointerY: 0,
        }
        this.previousPointerX = 0
        this.previousPointerY = 0
        this.angle = 0
        this.previousAngle = 0
        this.angleDisplace = 0
        this.degrees = 57.296
        this.cursorSize = 15
        this.moving = false

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            borderRadius: '50%',
            overflow: 'visible',
            transition: '200ms, transform 20ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.init(this.cursor, this.cursorStyle)
    }

    init(el:HTMLElement, style:any) {
        Object.assign(el.style, style)
        setTimeout(() => {
            this.cursor.removeAttribute("hidden")
        }, 500)
        this.cursor.style.opacity = "1"
    }

    move(event:MouseEvent) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
        this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20)
        this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20)

        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
        this.rotate(this.position)
        if(this.moving) this.stop()
        else this.moving = true
    }

    rotate(position:any) {
        const unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees

        if (isNaN(unsortedAngle)) {
            this.angle = this.previousAngle
        } else {
            if (unsortedAngle <= 45) {
                if (position.distanceX * position.distanceY >= 0) {
                    this.angle = +unsortedAngle
                } else {
                    this.angle = -unsortedAngle
                }
                this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceX / 2)}, 0`)
            } else {
                if (position.distanceX * position.distanceY <= 0) {
                    this.angle = 180 - unsortedAngle
                } else {
                    this.angle = unsortedAngle
                }
                this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceY / 2)}, 0`)
            }
        }
        this.cursor.style.transform += ` rotate(${this.angle}deg)`
        this.previousAngle = this.angle
    }

    stop() {
        setTimeout(() => {
            this.filter.setAttribute('stdDeviation', '0, 0')
            this.moving = false
        }, 50)
    }

    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
