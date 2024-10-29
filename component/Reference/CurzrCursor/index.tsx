"use client"
import styles from './curzr_cursor.module.scss'
import {useEffect} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {
    ArrowPointer,
    BigCircle,
    CircleAndDot,
    GlitchEffect,
    MotionBlur,
    RingDot
} from "@/component/Reference/CurzrCursor/cursor";
gsap.registerPlugin(useGSAP)

let sectionName: string | null = "cursor-1"
let sectionPrev:string | null = ""
const sectionList = [
    "cursor-1",
    "cursor-2",
    "cursor-3",
    "cursor-4",
    "cursor-5",
    "cursor-6"
]
const cursorList = [
    "arrow-pointer",
    "big-circle",
    "ring-dot",
    "circle-and-dot",
    "glitch-effect",
    "motion-blur"
]
let isShiftDone = false
let shiftup:any
let root:any, header:any, footer:any, cursor:any


// 移出
function shiftIn(){
    gsap.fromTo(`.${styles['shift-in']}`,{
        y:50
    },{
        y: 0,
        delay:0.1,
        ease:"power1.inOut",
        onComplete: function(){
            isShiftDone = true
        }
    })
    if(sectionName !== 'cursor-2'){
        gsap.to(`.${styles['shift-in']}`,{
            color: '#292927',
            delay:0.1
        })
        root.style.setProperty('--curzr-logo-color', '#292927')
    }else{
        gsap.to(`.${styles['shift-in']}`,{
            color: '#e6e6e6',
            delay:0.1
        })
        root.style.setProperty('--curzr-logo-color', '#e6e6e6')
    }
}

// 移入
function shiftUp(el:string){
    gsap.fromTo(el,{
        yPercent:0
    },{
        yPercent: -100,
        duration:0.5,
        delay:0.1,
        ease:'power1.inOut'
    })
}


function getAnchor():string|null{
    const anchor: string = (document.URL.split("#")[1]) as string
    return anchor? anchor: null
}


function pageChange(sectionName:string|null, sectionPrev:string|null){
    console.log(sectionName, sectionPrev)
    isShiftDone = false
    const duration = 1
    const sectionIndex = sectionList.findIndex(section => section === sectionName)
    changeCursor(sectionIndex)

    const currentSection = document.getElementById(sectionName as string) as HTMLElement
    const prevSection = document.getElementById(sectionPrev as string) as HTMLElement
    currentSection.style.zIndex = sectionList.length + 2 + ""
    prevSection.style.zIndex = sectionList.length + ""
    // debugger
    gsap.fromTo(currentSection,{
        xPercent:-100,
    },{
        xPercent:0,
        ease:"power1.inOut"
    })

    gsap.fromTo(prevSection,{
        xPercent:0
    },{
        xPercent:100,
        duration:duration,
        ease:"power1.inOut",
        onComplete:function(){
            prevSection.style.transform = "translateX(0%)"
            prevSection.style.zIndex = sectionList.length - (sectionList.indexOf(sectionPrev as string) + 1) + ""
            console.log(sectionList.length, sectionList.indexOf(sectionPrev as string))
            shiftup = setInterval(()=>{
                shiftUp(`.${styles['btn-next']} .${styles['shift-in']}`)
            },3000)
        }
    })
    gsap.fromTo([header,footer],{
        xPercent:0
    },{
        xPercent:50,
        duration:duration,
        ease:"power1.in",
        onComplete:function(){
            currentSection.style.zIndex = sectionList.length + ""
            header.style.transform = 'translateX(0%)'
            footer.style.transform = 'translateX(0%)'
            shiftIn()
        }
    })
}

function changeCursor(index:number){
    cursor.hidden()
    switch (cursorList[index]) {
        case 'arrow-pointer':
            cursor = new ArrowPointer()
            break
        case 'big-circle':
            cursor = new BigCircle()
            break
        case 'ring-dot':
            cursor = new RingDot()
            break
        case 'circle-and-dot':
            cursor = new CircleAndDot()
            break
        case 'glitch-effect':
            cursor = new GlitchEffect()
            break
        case 'motion-blur':
            cursor = new MotionBlur()
            break
    }
}

export default function CurzrCursorComp(){
    useEffect(()=>{
        root = document.querySelector(`.${styles['page']}`)
        shiftIn()
        cursor = new ArrowPointer()
        document.onmousemove = event =>{
            cursor.move(event)
        }
        document.ontouchmove = event => {
            cursor.move(event.touches[0])
        }
        document.onclick = () => {
            if(typeof cursor.click === 'function'){
                cursor.click()
            }
        }

    })
    return (
        <div className={styles['page']}>
            <Header></Header>
            <section id="cursor-1" className={`${styles["container"]} ${styles['container-cursor-1']}`}></section>
            <section id="cursor-2" className={`${styles["container"]} ${styles['container-cursor-2']}`}></section>
            <section id="cursor-3" className={`${styles["container"]} ${styles['container-cursor-3']}`}></section>
            <section id="cursor-4" className={`${styles["container"]} ${styles['container-cursor-4']}`}></section>
            <section id="cursor-5" className={`${styles["container"]} ${styles['container-cursor-5']}`}></section>
            <section id="cursor-6" className={`${styles["container"]} ${styles['container-cursor-6']}`}></section>
            <Footer></Footer>

            {/* 箭头光标 */}
            <div className={`curzr-arrow-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path className="inner"
                          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
                          fill="#F2F5F8"/>
                    <path className="outer"
                          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
                          fill="#111920"/>
                </svg>
            </div>

            {/* 圆环跟随光标 */}
            <div className={'curzr-big-circle'}>
                <div className={'circle'}></div>
                <div className={'dot'}></div>
            </div>

            {/* 圆环光标 */}
            <div className={'curzr-ring-dot'}>
                <div className={'curzr-dot'}></div>
            </div>

            {/* 带圆心点的圆环 */}
            <div className={'curzr-circle-and-dot'}></div>

            {/* 色调分离 */}
            <div className={'curzr-glitch-effect'}></div>

            {/* 动态模糊 */}
            <svg className={'curzr-motion'}>
                <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
                    <feGaussianBlur className="curzr-motion-blur" stdDeviation="0, 0"/>
                </filter>
                <circle cx="50%" cy="50%" r="5" fill="#292927" filter="url(#motionblur)"/>
            </svg>
        </div>
    )
}

function Header() {
    useEffect(()=>{
        header = document.querySelector(`.${styles['header']}`)
    },[])
    return (
        <header className={styles['header']}>
            <span>
            <a href="https://profyr.com/" target="_blank" className={`${styles["shift-in"]} curzr-hover`}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" viewBox="0 0 139.12 36.47">
                    <g id="Layer_1-2">
                        <g>
                            <path className={styles["cls-1"]}
                                  d="M0,18.23C0,7.92,7.66,0,18.23,0c6.36,0,11.97,3.16,15.03,8.12l-6.91,4.01c-1.55-2.71-4.56-4.31-8.12-4.31-6.21,0-10.22,4.16-10.22,10.42s4.01,10.42,10.22,10.42c3.56,0,6.61-1.6,8.12-4.31l6.91,4.01c-3.01,4.96-8.62,8.12-15.03,8.12C7.66,36.47,0,28.55,0,18.23Z"/>
                            <path className={styles["cls-1"]}
                                  d="M62.22,10.72v25.05h-7.51v-2.35c-1.35,1.85-3.86,3.06-7.16,3.06-5.06,0-9.37-3.61-9.37-10.37V10.72h7.51v14.28c0,3.11,1.95,4.56,4.36,4.56,2.75,0,4.66-1.6,4.66-5.16V10.72h7.51Z"/>
                            <path className={styles["cls-1"]}
                                  d="M84.01,10.22v8.52c-3.11-.5-7.51,.75-7.51,5.71v11.32h-7.51V10.72h7.51v4.46c1-3.36,4.36-4.96,7.51-4.96Z"/>
                            <path className={styles["cls-1"]}
                                  d="M108.06,28.75v7.01h-20.04v-5.01l9.47-13.03h-8.97v-7.01h19.04v5.01l-9.47,13.03h9.97Z"/>
                            <path className={styles["cls-1"]}
                                  d="M128.85,10.22v8.52c-3.11-.5-7.51,.75-7.51,5.71v11.32h-7.51V10.72h7.51v4.46c1-3.36,4.36-4.96,7.51-4.96Z"/>
                            <path className={styles["cls-1"]}
                                  d="M129.6,31.71c0-2.6,2.15-4.76,4.76-4.76s4.76,2.15,4.76,4.76-2.15,4.76-4.76,4.76-4.76-2.15-4.76-4.76Z"/>
                        </g>
                    </g>
                </svg>
            </a>
        </span>
            <span>
          <a href="https://github.com/TaylonChan/Curzr" target="_blank" className={styles["shift-in"]}>Github</a>
        </span>
        </header>
    )
}

function Footer() {
    useEffect(() => {
        const btnPrevious = document.querySelector(`.${styles['btn-previous']}`) as HTMLElement
        const btnNext = document.querySelector(`.${styles['btn-next']}`) as HTMLElement
        footer = document.querySelector(`.${styles['footer']}`) as HTMLElement

        btnPrevious.addEventListener('click',()=>{
            if(isShiftDone){
                location.href = '#' + sectionList[(sectionList.indexOf(sectionName as string) + sectionList.length - 1) % sectionList.length]
            }
        })

        btnNext.addEventListener('click',function(){
            if(isShiftDone){
                location.href = "#" + sectionList[(sectionList.indexOf(sectionName as string) + 1) % sectionList.length]
            }
        })

        btnPrevious.addEventListener('mouseenter', function() {
            shiftUp(`.${styles['btn-previous']} .${styles['shift-in']}`)
        })

        btnNext.addEventListener('mouseenter', function() {
            shiftUp(`.${styles['btn-next']} .${styles['shift-in']}`)
        })

        shiftup = setInterval(() => {
            shiftUp(`.${styles['btn-next']} .${styles['shift-in']}`)
        }, 3000)

        window.addEventListener('popstate', function () {
            sectionPrev = sectionName
            sectionName = getAnchor()
            this.clearInterval(shiftup)
            pageChange(sectionName, sectionPrev)
        })

    }, []);
    return (
        <footer className={styles['footer']}>
            <span>
                <a href="#" target="_blank" className={styles["shift-in"]}>Get them for free</a>
            </span>

            <span className={`curzr-hover ${styles["btn"]} ${styles["btn-previous"]}`}>
                <span>
                    <small className={`curzr-hover ${styles['shift-in']}`}
                           data-text="Previous">Previous</small>
                </span>
                <br/>
                <span>
                    <small className={`curzr-hover ${styles['shift-in']}`}
                           data-text="Cursor">Cursor</small>
                </span>
            </span>

            <span></span>

            <span className={`curzr-hover ${styles["btn"]} ${styles["btn-next"]}`}>
                <span>
                    <small className={`curzr-hover ${styles['shift-in']}`}
                           data-text="Next">Next</small>
                </span>
                <br/>
                <span>
                    <small className={`curzr-hover ${styles['shift-in']}`}
                           data-text="Cursor">Cursor</small>
                </span>
            </span>
        </footer>
    )
}
