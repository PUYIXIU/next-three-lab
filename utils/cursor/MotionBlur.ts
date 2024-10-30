export class MotionBlur {
    root:HTMLElement
    cursor:HTMLElement | SVGGElement
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
    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        this.cursor.classList.add('curzr-motion')
        this.cursor.innerHTML = `
             <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
                 <feGaussianBlur class="curzr-motion-blur" stdDeviation="0, 0"/>
             </filter>
             <circle cx="50%" cy="50%" r="5" fill="#292927" filter="url(#motionblur)"/>
            `
        this.root.append(this.cursor)

        this.filter = this.cursor.querySelector('.curzr-motion-blur') as HTMLElement

        this.position = {
            distanceX: 0,
            distanceY: 0,
            pointerX: this.root.getBoundingClientRect().left,
            pointerY: this.root.getBoundingClientRect().top,
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
            position: 'absolute',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            borderRadius: '50%',
            overflow: 'visible',
            transition: '200ms, transform 20ms',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity:"0"
        }
        target.onmousemove = e =>this.move(e)
        target.onmouseenter = this.show.bind(this)
        target.onmouseleave = this.hidden.bind(this)
        this.init(this.cursor, this.cursorStyle)
    }
    show(){
        this.cursor.removeAttribute('hidden')
        this.cursor.style.opacity = "1"
    }
    init(el:HTMLElement | SVGGElement, style:any) {
        Object.assign(el.style, style)
    }

    move(event:MouseEvent){
        this.show()
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.position.pointerY = event.pageY - this.root.getBoundingClientRect().top
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
