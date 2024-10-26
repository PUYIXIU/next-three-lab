import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
gsap.registerPlugin(useGSAP)
/**
 * 跟随光标
 */
export class FollowCursor{
    delay:number = 4
    _x:number = 0
    _y:number = 0
    endX:number = 0
    endY:number = 0
    isFocus:boolean = false
    isVisible:boolean = false
    $dot: HTMLElement
    $outline: HTMLElement
    $target: HTMLElement
    constructor(target:HTMLElement) {
        if(!(target instanceof HTMLElement)){
            throw new TypeError("target must be a HTMLElement")
            return
        }
        this.$target = target
        this.$target.classList.add("base-cursor-canvas")

        this.$dot = document.createElement("div")
        this.$dot.className = "follow-cursor-dot"

        this.$outline = document.createElement("div")
        this.$outline.className = "follow-cursor-outline"

        this.$target.append(this.$dot, this.$outline)

        this.setupEventListener()
        this.updateOutline()
    }

    setupEventListener(){

        this.$target.querySelectorAll("a").forEach((el:any)=>{
            el.addEventListener("mouseover", ()=>{
                this.isFocus = true
                this.toggleFocus()
            })
            el.addEventListener("mouseleave", ()=>{
                this.isFocus = false
                this.toggleFocus()
            })
        })

        this.$target.addEventListener("mousedown", ()=>{
            this.isFocus = true
            this.toggleFocus()
        })

        this.$target.addEventListener("mouseup", ()=>{
            this.isFocus = false
            this.toggleFocus()
        })

        this.$target.addEventListener("mouseenter", ()=>{
            this.isVisible = true
            this.toggleVisible()
        })

        this.$target.addEventListener("mouseleave", ()=>{
            this.isVisible = false
            this.toggleVisible()
        })

        this.$target.addEventListener('mousemove', (e:any)=>{
            const rect = e.target.getBoundingClientRect()
            this.endX = e.offsetX + rect.left
            this.endY = e.offsetY + rect.top
            this.$dot.style.top = `${this.endY}px`
            this.$dot.style.left = `${this.endX}px`
        })
    }

    updateOutline(){
        this._x += (this.endX - this._x) / this.delay
        this._y += (this.endY - this._y) / this.delay
        this.$outline.style.left = `${this._x}px`
        this.$outline.style.top = `${this._y}px`
        requestAnimationFrame(this.updateOutline.bind(this))
    }

    toggleFocus(){
        if(this.isFocus){
            this.$dot.style.transform = `translate(-50%, -50%) scale(0.7)`
            this.$outline.style.transform = `translate(-50%, -50%) scale(1.5)`
        }else{
            this.$dot.style.transform = `translate(-50%, -50%) scale(1)`
            this.$outline.style.transform = `translate(-50%, -50%) scale(1)`
        }
    }

    toggleVisible(){
        if(this.isVisible){
            this.$dot.style.opacity = `1`
            this.$outline.style.opacity = `1`
        }else{
            this.$dot.style.opacity = `0`
            this.$outline.style.opacity = `0`
        }
    }
}

/**
 * 模糊光标
 */
export class BlurCursor {
    endX:number = 0
    endY:number = 0
    isVisible:boolean = false
    isMoving:boolean = false
    constructor(){

    }
}

/**
 * RGB色调分离光标
 */
export class RGBSplitCursor{
    delay:number = 15
    endX:number = 0
    endY:number = 0
    _x:number = 0
    _y:number = 0
    dotSize:number = 0
    isVisible:boolean = false

    $target:HTMLElement
    $dot:HTMLElement
    $dot_R:HTMLElement
    $dot_B:HTMLElement

    constructor(target:HTMLElement) {
        if(!(target instanceof HTMLElement)){
            throw new TypeError("target must be a HTMLElement")
            return
        }
        this.$target = target
        this.$target.classList.add("base-cursor-canvas")
        this.$dot = document.createElement("div")
        this.$dot.className = "rgb-cursor-dot"

        this.$dot_R = document.createElement("div")
        this.$dot_B = document.createElement("div")
        this.$dot_R.className = "rgb-cursor-dot-r"
        this.$dot_B.className = "rgb-cursor-dot-b"

        this.$target.append(this.$dot, this.$dot_R, this.$dot_B)

        this.dotSize = this.$dot.clientWidth
        this.setupEventListener()
        this.updateRGBDot()
    }
    setupEventListener(){
        this.$target.querySelectorAll('a').forEach((el:any)=>{
            el.addEventListener("mouseover", ()=>{
                // this.$dot.style.background = `linear-gradient(45deg, #e11d51, #6cedf5)`
                this.$dot.style.background = `#1c0816`
                this.$dot.style.borderColor = `#fff`
                // console.log(111)
            })
            el.addEventListener("mouseleave", ()=>{
                /**
                 * 答对了总题数就少了
                 * 轮回
                 * 随机的
                 */
                this.$dot.style.background = `#fff`
                this.$dot.style.borderColor = `transparent`
                console.log(222)
            })
        })
        // 鼠标点击，光标弹性缩放
        this.$target.addEventListener("click", ()=>{
            // 阴影透明度降低
            this.$dot_R.style.opacity = '0'
            this.$dot_B.style.opacity = '0'
            // 先缩小到0.75
            gsap.to(this.$dot,
                {
                    width:this.dotSize * 0.75,
                    height:this.dotSize * 0.75,
                    duration:0.2,
                    ease:'power1.in'
                })
            // 弹性放大到1
            gsap.to(this.$dot,
                {
                        width:this.dotSize,
                        height:this.dotSize,
                        duration:0.4,
                        delay:0.2,
                        ease:'bounce.out',
                        onComplete:()=>{
                            this.$dot_R.style.opacity = '1'
                            this.$dot_B.style.opacity = '1'
                        }
                    })
        })

        this.$target.addEventListener("mouseenter", ()=>{
            this.isVisible = true
            this.toggleVisible()
        })
        this.$target.addEventListener("mouseleave", ()=>{
            this.isVisible = false
            this.toggleVisible()
        })

        // 鼠标移动
        this.$target.addEventListener("mousemove", (e:any)=>{
            // 记录上一次移动结束的点位，用于判断cursor是否在移动当中
            this._x = this.endX
            this._y = this.endY
            const contentRect = this.$target.getBoundingClientRect()
            const rect = e.target.getBoundingClientRect()
            this.endX = rect.left + e.offsetX - contentRect.left
            this.endY = rect.top + e.offsetY - contentRect.top

            // 三个点移动到对应位置
            this.$dot.style.left = `${this.endX}px`
            this.$dot.style.top = `${this.endY}px`
            this.$dot_R.style.left = `${this.endX}px`
            this.$dot_R.style.top = `${this.endY}px`
            this.$dot_B.style.left = `${this.endX}px`
            this.$dot_B.style.top = `${this.endY}px`
        })
    }
    updateRGBDot(){
        // 随时计算最后一次鼠标移动点位和当前跟随dom点位间的距离
        // 如果存在距离，说明还在移动中
        const diffX  = this.endX - this._x
        const diffY = this.endY - this._y
        const side = Math.sqrt(diffX * diffX + diffY * diffY)
        const dif = this.$dot_R.clientWidth / 2
        if(side > 1){
            // 计算偏移度，控制在
            const after_x = diffX / side * 5
            const after_y = diffY / side * 5
            this.$dot_R.style.transform = `translate(${after_x - dif*0.95}px, ${after_y - dif*0.95}px)`
            this.$dot_B.style.transform = `translate(${ -after_x - dif}px, ${ -after_y - dif}px)`
            this.$dot.classList.add('blur')
            this.$dot_R.classList.add('shadow-blur')
            this.$dot_B.classList.add('shadow-blur')
            // 将2者距离拉近，决定最后残影留存的时间
            this._x += (this.endX - this._x) / this.delay
            this._y += (this.endY - this._y) / this.delay
        }else{
            this.$dot_R.style.transform = `translate( -50%, -50%)`
            this.$dot_B.style.transform = `translate( -50%, -50%)`
            this.$dot.classList.remove('blur')
            this.$dot_R.classList.remove('shadow-blur')
            this.$dot_B.classList.remove('shadow-blur')
        }

        requestAnimationFrame(this.updateRGBDot.bind(this))
    }
    toggleVisible(){
        if(this.isVisible){
            this.$dot.style.opacity = `1`
            this.$dot_R.style.opacity = `1`
            this.$dot_B.style.opacity = `1`
        }else{
            this.$dot.style.opacity = `0`
            this.$dot_R.style.opacity = `0`
            this.$dot_B.style.opacity = `0`
        }
    }
}


/**
 * 旋转箭头
 */
export class ArrowCursor {
    delay:number = 10
    lastX:number = 0
    lastY:number = 0
    endX:number = 0
    endY:number = 0
    isVisible:boolean = false

    $target:HTMLElement
    $arrow:HTMLElement

    constructor(target:HTMLElement){

        this.$target = target
        this.$target.classList.add("base-cursor-canvas")

        this.$arrow = document.createElement("div")
        this.$arrow.classList.add("arrow-cursor")

        this.$target.appendChild(this.$arrow)

        this.setupListeners()
    }

    setupListeners(){
        this.lastX = this.endX
        this.lastY = this.endY
        this.$target.querySelectorAll("a").forEach((el:any)=>{
            el.addEventListener("mouseover",()=>{})
            el.addEventListener("mouseleave",()=>{})
        })
        this.$target.addEventListener("mouseenter",()=>{
            this.isVisible = true
            this.toggleCursorVisible()
        })
        this.$target.addEventListener("mouseleave",()=>{
            this.isVisible = false
            this.toggleCursorVisible()
        })
        this.$target.addEventListener("click",()=>{})
        this.$target.addEventListener("mousemove",(e:any)=>{
            const rect = e.target.getBoundingClientRect()
            const target_left = this.$target.getBoundingClientRect().left
            const target_top = this.$target.getBoundingClientRect().top
            this.endX = rect.left + e.offsetX - target_left
            this.endY = rect.top + e.offsetY - target_top
            this.$arrow.style.left = `${this.endX}px`
            this.$arrow.style.top = `${this.endY}px`

            const dy = this.endY - this.lastY
            const dx = this.endX - this.lastX
            let angle = 0
            angle =  90 - (Math.atan(dy / dx))*180/Math.PI
            if(dx<0) angle*=(-1)
            console.log(`dy=${dy} dx=${dx} angle=${angle} `)
            if(Math.abs(dx) > 0){
                // 非垂直移动
                // console.log("非垂直移动",dx)
            }else if(Math.abs(dy) > 10){
                // 上下垂直移动 旋转角为180度
                console.log("垂直移动",dy)
                angle = -180
            }
            this.lastX += (this.endX - this.lastX) / this.delay
            this.lastY += (this.endY - this.lastY) / this.delay
            this.$arrow.style.transform = `rotate(${angle}deg)`
        })
    }
    toggleCursorVisible(){

    }
}
