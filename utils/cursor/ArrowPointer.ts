/**
 * 箭头点
 */
export class ArrowPointer{
    root: HTMLElement;
    cursor: HTMLElement
    previousPointerX:number = 0
    previousPointerY:number = 0
    angle:number = 0
    previousAngle:number = 0
    angleDisplace:number = 0
    degrees:number = 57.296
    cursorSize:number = 20
    position:any = {
        distanceX:0,
        distanceY:0,
        distance:0,
        pointerX:0,
        pointerY:0
    }
    cursorStyle:any = {
        boxSizing: 'border-box',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex:'2147483647',
        width: `${this.cursorSize}px`,
        height: `${this.cursorSize}px`,
        transition:'250ms, transform 100ms',
        useSelect: 'none',
        pointerEvents: 'none',
        opacity:"0"
    }
    distance:number = 0

    constructor(target:HTMLElement) {
        this.root = target
        this.root.style.position = 'relative';
        this.cursor = document.createElement("div")
        this.cursor.setAttribute('hidden',"hidden")
        this.cursor.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path className="inner"
                          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
                          fill="#F2F5F8"/>
                    <path className="outer"
                          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
                          fill="#111920"/>
                </svg>`
        this.cursor.className = 'curzr-arrow-pointer'
        this.root.append(this.cursor)
        this.init(this.cursor, this.cursorStyle)
        target.onmousemove = e =>this.move(e)

        target.onmouseenter = this.show.bind(this)
        target.onmouseleave = this.hidden.bind(this)
    }
    show(){
        this.cursor.removeAttribute('hidden')
        this.cursor.style.opacity = "1"
    }
    init(el:HTMLElement, style:any){
        Object.assign(el.style, style)
    }
    move(event:MouseEvent){
        this.show()

        // 上一个鼠标点位
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY

        //  鼠标位置
        this.position.pointerX = event.pageX - this.root.getBoundingClientRect().left
        this.position.pointerY = event.pageY - this.root.getBoundingClientRect().top
        // 上一个点位和当前点位之间的欧氏距离
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

        // 前一个点位和后一个点位之间距离大于1
        if(this.distance > 1){
            this.rotate(this.position)
        }else{
            this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
        }
    }

    rotate(position:any){
        const unsortedAngle = Math.atan(Math.abs(position.distanceY)/Math.abs(position.distanceX)) * this.degrees

        const style = this.cursor.style
        this.previousAngle = this.angle

        // 计算旋转角度
        if(position.distanceX <= 0 && position.distanceY >= 0){
            // pre在next的左上角
            this.angle = 90 - unsortedAngle + 0
        }else if(position.distanceX < 0 && position.distanceY < 0){
            // pre在next的左下角
            this.angle = unsortedAngle + 90
        } else if(position.distanceX >= 0 && position.distanceY <= 0){
            // pre在next的右下角
            this.angle = 90 - unsortedAngle + 180
        }else if(position.distanceX > 0 && position.distanceY > 0){
            // pre在next的右上角
            this.angle = unsortedAngle + 270
        }

        if(isNaN(this.angle)){
            this.angle = this.previousAngle
        }else{
            // 判断最小的旋转角度
            if(this.angle - this.previousAngle <= -270){
                this.angleDisplace += 360 + this.angle - this.previousAngle
            } else if(this.angle - this.previousAngle >= 270){
                this.angleDisplace += this.angle - this.previousAngle - 360
            }else{
                this.angleDisplace += this.angle - this.previousAngle
            }
        }
        style.left = `${-this.cursorSize / 2}px`
        style.top = `${0}px`
        style.transform += ` rotate(${this.angleDisplace}deg)`
    }
    hidden() {
        this.cursor.style.opacity = "0"
        setTimeout(() => {
            this.cursor.setAttribute("hidden", "hidden")
        }, 500)
    }
}
