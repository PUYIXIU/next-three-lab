"use client"
import styles from './custom_dot_cursor.module.scss'
import {useEffect, useState} from "react";
import Lottie from "lottie-react";

import Animation_LoopingBack from '@/assets/Animation/Animation_LoopingBack.json'
import Animation_CubeLooping from '@/assets/Animation/Animation_CubeLooping.json'
import Animation_3D_trangle from '@/assets/Animation/Animation_3D_trangle.json'
import Animation_Clicking from "@/assets/Animation/Animation_Clicking.json";
import Animation_grid_flow_back from "@/assets/Animation/Animation_grid_flow_back.json";
import codeIcon from '@/assets/icon/code.svg'
import closeIcon from '@/assets/icon/close.svg'
import model_outlined from '@/assets/icon/model-outlined.svg'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {PCDLoader} from "three/examples/jsm/loaders/PCDLoader";

function resize(){
    const bg = document.getElementById("canvas-bg") as HTMLDivElement;
    const radio = window.innerHeight / window.innerWidth;
    if(radio > 1){
        // 纵向图片
        bg.style.width = `${120 + (radio - 1)*100}%`
    }else{
        bg.style.width = '120%'
    }
}
interface ConfettiVO {
    /**
     * 礼花唯一标识
     */
    id:number,
    /**
     * x坐标
     */
    x:number,
    /**
     * y坐标
     */
    y:number
}
// 点击尺寸
const confetti_w = 100, confetti_h = 100;
let idCounter = 0;
export default function CustomDotCursorComp(){
    // show model弹窗
    const [modelDialogActive, setModelDialogActive] = useState(false)
    // reference弹窗
    const [codeDialogActive, setCodeDialogActive] = useState(false)
    /**
     * 鼠标点击，新增效果
     */
    const [confettiList,setConfettiList]=useState<ConfettiVO[]>([])
    function addConfetti(event:any):any{
        const newConfetti:ConfettiVO = {
            id:idCounter++,
            x:event.pageX,
            y:event.pageY,
        }
        setConfettiList([...confettiList, newConfetti])
    }
    /**
     * 动画播放结束，将点位清除
     * @param confetti
     */
    function animationComplete(confetti: ConfettiVO){
        setConfettiList(confettiList.filter(point=>point.id !== confetti.id))
    }
    // 背景的摇晃效果
    function backHover(e:any){
        if(codeDialogActive) return
        const mouseX = (e.clientX - window.innerWidth/2) / window.innerWidth * 5
        const mouseY = (e.clientY - window.innerHeight/2) / window.innerHeight * 5
        const bg = document.querySelector('#canvas-bg') as HTMLElement
        bg.style.transform = `translate3d( ${- 50 - mouseX}%, ${- 50 - mouseY}%, 0)`
    }

    useEffect(()=>{
        const cursor = {
            delay: 8,
            _x: 0,
            _y: 0,
            endX: (window.innerWidth / 2),
            endY: (window.innerHeight / 2),
            cursorVisible: true,
            cursorEnlarged: false,
            $dot: document.querySelector('#cursor-dot') as HTMLElement,
            $outline: document.querySelector('#cursor-dot-outline') as HTMLElement,
            dotSize:0,
            outlineSize:0,
            init: function(){
                this.dotSize = (this.$dot as any).offsetWidth
                this.outlineSize = (this.$outline as any).offsetWidth

                // 开启事件监听
                this.setupEventListeners()
                //
                this.animateDotOutline()
            },

            // 事件注册
            setupEventListeners: function(){
                const self  = this;
                // 鼠标移入链接放大
                document.querySelectorAll('a').forEach(el=>{
                    el.addEventListener('mouseover',function(){
                        self.cursorEnlarged = true
                        self.toggleCursorSize()
                    })
                    el.addEventListener('mouseout',function(){
                        self.cursorEnlarged = false
                        self.toggleCursorSize()
                    })
                })

                // 鼠标点击事件
                document.addEventListener('mousedown', function(){
                    self.cursorEnlarged = true
                    self.toggleCursorSize()
                })
                document.addEventListener('mouseup', function(){
                    self.cursorEnlarged = false
                    self.toggleCursorSize()
                })

                // 鼠标移动事件
                document.addEventListener('mousemove',function(e){
                    // 显示鼠标
                    self.cursorVisible = true
                    self.toggleCursorVisibility();

                    self.endX = e.pageX
                    self.endY = e.pageY
                    if(self.$dot){
                        self.$dot.style.top = self.endY + 'px'
                        self.$dot.style.left = self.endX + 'px'
                    }
                })

                // 鼠标移入事件
                document.addEventListener('mouseenter', function(){
                    self.cursorVisible = true
                    self.toggleCursorVisibility()
                    self.$dot.style.opacity = "1"
                    self.$outline.style.opacity = "1"
                })

                // 鼠标移出事件
                document.addEventListener('mouseleave', function(){
                    self.cursorEnlarged = false
                    self.toggleCursorVisibility()
                    self.$dot.style.opacity = "0"
                    self.$outline.style.opacity = "0"
                })

            },

            animateDotOutline: function(){
                const self = this
                self._x += (self.endX - self._x) / self.delay
                self._y += (self.endY - self._y) / self.delay
                if(self.$outline){
                    self.$outline.style.top = self._y + 'px'
                    self.$outline.style.left = self._x + 'px'
                }
                requestAnimationFrame(this.animateDotOutline.bind(self))
            },

            toggleCursorSize: function(){
                const self = this
                if(self.cursorEnlarged){
                    self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)'
                    self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)'
                }else{
                    self.$dot.style.transform = 'translate(-50%, -50%) scale(1)'
                    self.$outline.style.transform = 'translate(-50%, -50%) scale(1)'
                }
            },

            toggleCursorVisibility: function(){
                const self = this
                if(self.cursorVisible){
                    self.$dot.style.opacity = "1"
                    self.$outline.style.opacity = "1"
                }else{
                    self.$dot.style.opacity = "0"
                    self.$outline.style.opacity = "0"
                }
            }
        }
        cursor.init()
        resize()
        window.addEventListener('resize', resize)
    },[])

    return (
        <div className={styles['canvas-page']}  onMouseDown={addConfetti}>
            <Lottie id="canvas-bg" onMouseMove={e=>backHover(e)} className={styles['canvas-bg']} animationData={Animation_LoopingBack} />
            {confettiList.map((point)=>{
                return <Lottie
                    key={point.id}
                    animationData={Animation_Clicking}
                    className={styles['mouse-confetti']}
                    style={{top:`${point.y}px`, left:`${point.x}px`,width:`${confetti_w}px`,height:`${confetti_h}px`}}
                    loop={false}
                    onComplete={()=>animationComplete(point)}
                />
            })}
            <div style={{zIndex: 2, position: 'relative'}}>
                <div id="cursor-dot-outline" className={styles['cursor-dot-outline']}></div>
                <div id="cursor-dot" className={styles['cursor-dot']}></div>
                <a href="https://next-lab.e-duck.xyz/" className={styles['header-box']}>
                    <Lottie className={styles['header-logo']} animationData={Animation_CubeLooping}></Lottie>
                    <div className={styles['header-title']}>
                        <p className={styles['main-title']}>CUBE LOOPING</p>
                        <p className={styles['sub-title']}>click for more</p>
                    </div>
                </a>
                <div className={styles['btn-box']}>
                    <a href="#"
                       className={`${styles['btn-item']} ${styles['code-btn']} ${codeDialogActive ? styles['active'] : ''} ${modelDialogActive ? styles['disabled'] : ''} `}
                       onClick={() => {
                           if (!modelDialogActive) setCodeDialogActive(!codeDialogActive);
                       }}>
                        <img src={codeIcon.src} alt=""/>
                        <img src={closeIcon.src} alt=""/>
                    </a>
                    <a href="#"
                       className={`${styles['btn-item']} ${styles['human-head-btn']} ${modelDialogActive ? styles['active'] : ''}  ${codeDialogActive ? styles['disabled'] : ''} `}
                       onClick={() => {
                           if (!codeDialogActive) setModelDialogActive(!modelDialogActive);
                       }}>
                        <img src={model_outlined.src} alt=""/>
                        <img src={closeIcon.src} alt=""/>
                    </a>
                </div>
                <div className={`${styles['dialog-wrapper']} ${codeDialogActive ? styles['show'] : styles['hidden']}`}>
                    <Lottie animationData={Animation_grid_flow_back} className={styles['model-back']}></Lottie>
                    <div className={styles['dialog-content']}>
                        <h1 className={styles['dialog-title']}>
                            <Lottie className={styles['dialog-logo']} animationData={Animation_3D_trangle}></Lottie>
                            <p>Page Reference</p>
                        </h1>
                        <div className={styles['dialog-body']}>
                            <ul className={styles['root-ul']}>
                                <li className={styles['root-li']}>
                                    <p className={styles['li-title']}>Animations</p>
                                    <ul className={styles['leaf-ul']}>
                                        <li className={styles['leaf-li']}><a
                                            href="https://lottiefiles.com/free-animation/3d-shape-animation-UmfKP5MY0w"><span>SM Rony&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>Free
                                            3D Shape Animation Animation</a></li>
                                        <li className={styles['leaf-li']}><a
                                            href="https://lottiefiles.com/free-animation/app-loading-animation-03-V7PbEz6jjp"><span>Eric Park&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>Free
                                            App Loading Animation 03 Animation</a></li>
                                        <li className={styles['leaf-li']}><a
                                            href="https://lottiefiles.com/free-animation/background-looping-animation-8M9enOOSmP"><span>Nadir Zouaoui&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>Free
                                            Background looping animation Animation</a></li>
                                        <li className={styles['leaf-li']}><a
                                            href="https://lottiefiles.com/free-animation/click-Jgx5IcGCjm"><span>Jiashu Liu&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>Free
                                            click Animation</a></li>
                                    </ul>
                                </li>
                                <li className={styles['root-li']}>
                                    <p className={styles['li-title']}>CodePens</p>
                                    <ul className={styles['leaf-ul']}>
                                        <li className={styles['leaf-li']}><a
                                            href="https://codepen.io/Absulation/pen/mQPQzL"><span>Agent K&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>star
                                            background mouse hover ver.2</a></li>
                                        <li className={styles['leaf-li']}><a
                                            href="https://codepen.io/kjbrum/pen/qooQJJ"><span>Kyle Brumm&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>CodePen
                                            Home
                                            Custom Dot Cursor</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${styles['model-dialog-wrapper']} ${modelDialogActive ? styles['show'] : styles['hidden']}`}>
                    <Lottie animationData={Animation_grid_flow_back} className={styles['model-back']}></Lottie>
                    <HeadModel/>
                </div>
            </div>
        </div>
    )
}

/**
 * 头部模型组件
 * @constructor
 */
let scene:any, camera:any, renderer:any, model:any;
export function HeadModel(){
    function init(){
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.01,
            20
        )
        scene.add(camera)
        scene.add( new THREE.AmbientLight( 0xcccccc ) );

        const pointLight = new THREE.PointLight( 0xffffff, 100 );
        camera.add( pointLight );
        camera.position.z = 0.7
        camera.lookAt(0,0,0)
        renderer = new THREE.WebGLRenderer({antialias:true})
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0.1);
        renderer.setAnimationLoop(animate)
        const target = document.getElementById('model-canvas') as any
        target.appendChild(renderer.domElement);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const controls = new OrbitControls(camera, renderer.domElement);
        // scene.add(new THREE.AxesHelper(3))

        const loader = new PCDLoader()
        loader.load("/models/pcd/Zaghetto.pcd",function(points){
            console.log(points)
            points.geometry.center()
            points.geometry.rotateX(Math.PI)
            points.material.size = 0.001
            points.material.color.setHex(0xa4e2fe)
            points.name = 'Zaghetto.pcd'
            model = points
            scene.add(points)
        })
        window.addEventListener('resize', resize)
    }
    function resize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    function animate(){
        if (model) model.rotation.y+=0.003
        renderer.render(scene, camera)
    }
    useEffect(()=>{
        init()
        return ()=>{
            window.removeEventListener('resize', resize)
        }
    },[])
    return (
        <div id="model-canvas" className={styles['model-canvas']}></div>
    )
}
