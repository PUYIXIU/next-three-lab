import styles from './postprocessing_create_typing.module.scss'
import Lottie from 'lottie-react'
import AppleAnimation from './Apple_Animation.json'
import IconAnimation from './Icon_Animation.json'
import CodeAnimation from './Animation_Code.json'
import * as THREE from 'three'
import { useEffect, useRef} from "react";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader";
import {DotScreenShader} from "three/examples/jsm/shaders/DotScreenShader";
import {OutputPass} from "three/examples/jsm/postprocessing/OutputPass";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
gsap.registerPlugin(useGSAP)
export default function PostprocessingCreateTypingComp() {
    const headerRef = useRef<any>(null)
    useGSAP(
        ()=>{
            // 头部容器
            gsap.fromTo(headerRef.current,
                {xPercent:-100},
                {xPercent:0,duration:2,delay:1,ease:'bounce.out'})
            // 头部文字
            gsap.fromTo(".header-text",
                {width:0, opacity:0},
                {width:"100%",opacity:1,duration:1,delay:4,ease:'power1.out'})
            // 头部图标
            gsap.fromTo(".header-logo",
                {x:8, y:-80,opacity:0},
                {y:-1,opacity:1,duration:1,delay:5,ease:'power1.out'})


            // 右侧动图
            gsap.fromTo('.content-wrapper',
                {xPercent:300},
                {xPercent:0,duration:1,delay:1,ease:'power1.out'})


            // 左侧标题
            gsap.fromTo(".content-title",
                {opacity:0,y:-200},
                {opacity:1,y:0, duration:1, delay:2, ease:"back.out"})
            // 左侧标题内icon
            gsap.fromTo(".main-title-icon",
                {opacity:0,y:-200},
                {opacity:1,y:0, duration:1, delay:3, ease:"bounce.out"})

        }
    )
    return (
        <div className={styles["page-wrapper"]}>
            <CanvasCom/>
            <div className={styles["canvas-mask"]}></div>
            <div className={styles["page"]}>
                <div ref={headerRef}  className={`${styles['header']} `}>
                    <p className={`header-text ${styles["header-text"]}`}>
                        <Lottie animationData={CodeAnimation} className={`header-logo ${styles["header-logo"]}`}></Lottie>
                        EDUCK
                    </p>
                </div>
                <div className={`${styles['title']} content-title`}>
                    <div className={styles['glow']}>
                        <p>
                            <span>NEXT</span>
                            <Lottie animationData={IconAnimation} className={`${styles['span-icon']} main-title-icon`}></Lottie>
                        </p>
                        <p>TO&nbsp;<b>2037</b></p>
                    </div>
                </div>
                <div className={`${styles["content-wrapper"]} content-wrapper`}>
                    <Lottie animationData={AppleAnimation} className={styles["lottie-anime"]}></Lottie>
                    <p className={`${styles['line']} ${styles['top']}`}></p>
                    <p className={`${styles['line']} ${styles['bottom']}`}></p>
                    <p className={`${styles['line']} ${styles['left']}`}></p>
                    <p className={`${styles['line']} ${styles['right']}`}></p>
                    <div className={`${styles['shadow-box']} ${styles['shadow-box-1']}`}></div>
                    <div className={`${styles['shadow-box']} ${styles['shadow-box-2']}`}></div>
                    <div className={`${styles['shadow-box']} ${styles['shadow-box-3']}`}></div>
                    <div className={`${styles['shadow-box']} ${styles['shadow-box-4']}`}></div>
                </div>
            </div>
        </div>
    )
}

function CanvasCom(){
    let scene:any
    let camera:any
    let renderer:any
    let object:any
    let composer:any
    const canvasRef = useRef<any>()
    function init(){
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        )
        camera.position.z = 400
        camera.lookAt(0,0,0)
        scene.add(camera)

        renderer = new THREE.WebGLRenderer({antialias:true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x000000, 1)
        renderer.setAnimationLoop(animation)
        canvasRef?.current?.appendChild(renderer.domElement)
        const fog = new THREE.Fog(0x000000, 1, 1000)
        scene.fog = fog

        const geometry = new THREE.SphereGeometry(1,4,4)
        const material = new THREE.MeshPhongMaterial({
            color:0xffffff,
            flatShading:true
        })
        object = new THREE.Object3D()
        for(let i = 0;i< 100 ; i++){
            const element = new THREE.Mesh(geometry,material)
            // normalize 规范化
            element.position.set(
                Math.random()-0.5,
                Math.random()-0.5,
                Math.random()-0.5,
            ).normalize()
            // 随机映射
            element.position.multiplyScalar(Math.random() * 400)
            const scale = Math.random() * 50
            element.scale.set(scale,scale ,scale)
            element.rotation.set(
                Math.random()*2,
                Math.random()*2,
                Math.random()*2,
            )
            object.add(element)
        }
        scene.add(object)
        const ambientLight = new THREE.AmbientLight(0xcccccc)
        scene.add(ambientLight)
        const directionLight = new THREE.DirectionalLight(0xffffff,3)
        directionLight.position.set(1,1,1)
        scene.add(directionLight)

        composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        const effect1 = new ShaderPass(DotScreenShader)
        effect1.uniforms['scale'].value = 4
        composer.addPass(effect1)

        const effect2 = new ShaderPass(RGBShiftShader)
        effect2.uniforms['amount'].value = 0.003
        composer.addPass(effect2)

        const effect3 = new OutputPass()
        composer.addPass(effect3)

        window.addEventListener('resize',resize)
    }
    function animation(){
        object.rotation.x += 0.005
        object.rotation.y += 0.01
        composer.render()
    }
    function resize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    useEffect(() => {
        init()
    }, []);
    return (
        <div ref={canvasRef} className={styles["canvas"]}></div>
    )
}
