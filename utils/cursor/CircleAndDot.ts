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

    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElement("div")
        this.cursor.setAttribute('hidden',"hidden")
        this.cursor.className = "curzr-circle-and-dot"
        this.root.append(this.cursor)

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
            position: 'absolute',
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
            pointerEvents: 'none',
            opacity:"0"
        }

        this.init(this.cursor, this.cursorStyle)
        this.position.pointerX = this.root.getBoundingClientRect().left
        this.position.pointerY = this.root.getBoundingClientRect().top
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

    move(event:MouseEvent){
        this.show()
        const target = event.target as HTMLElement
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        //  鼠标位置
        this.position.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.position.pointerY = event.pageY - this.root.getBoundingClientRect().top
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        if (target.localName === 'svg' ||
            target.localName === 'a' ||
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
