"use client"
import { useEffect} from "react";
import * as THREE from "three";
import styles from './webgl_multiple_elements.module.scss'
import {MultipleElementType} from "@/app/demos/webgl_multiple_elements/type";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let canvas : HTMLElement | null = null
const StandardSphere = new THREE.SphereGeometry(0.5, 30, 30)
const elementList:MultipleElementType[] = [
    {
        id:"MeshLambertMaterial",
        title:"MeshLambertMaterial",
        desc:"MeshLambertMaterial材质，逐顶点渲染",
        geometry:StandardSphere,
        material:new THREE.MeshLambertMaterial({color:0xffffff})
    },
    {
        id:"MeshPhongMaterial",
        title:"MeshPhongMaterial",
        desc:"MeshPhongMaterial材质，逐片元渲染",
        geometry:StandardSphere,
        material:new THREE.MeshPhongMaterial({color:0xffffff})
    },
    {
        id:"MeshPhysicalMaterial",
        title:"MeshPhysicalMaterial",
        desc:"MeshPhysicalMaterial，物理材质",
        geometry:StandardSphere,
        material:new THREE.MeshPhysicalMaterial({color:0xffffff})
    },
    {
        id:"MeshStandardMaterial",
        title:"MeshStandardMaterial",
        desc:"MeshStandardMaterial材质，PBR渲染",
        geometry:StandardSphere,
        material:new THREE.MeshStandardMaterial({color:0xffffff})
    },
    {
        id:"phong-flatshading",
        title:"Phong-flatShading",
        desc:"MeshPhongMaterial材质，开启了flatShading",
        geometry:StandardSphere,
        material:new THREE.MeshPhongMaterial({color:0xffffff, flatShading:true})
    },
    {
        id:"MeshToonMaterial",
        title:"MeshToonMaterial",
        desc:"MeshToonMaterial材质",
        geometry:StandardSphere,
        material:new THREE.MeshToonMaterial({color:0xffffff})
    },
    {
        id:"MeshNormalMaterial",
        title:"MeshNormalMaterial",
        desc:"MeshNormalMaterial",
        geometry:StandardSphere,
        material:new THREE.MeshNormalMaterial({})
    },
    {
        id:"MeshDepthMaterial",
        title:"MeshDepthMaterial",
        desc:"MeshDepthMaterial",
        geometry:StandardSphere,
        material:new THREE.MeshDepthMaterial({})
    },

]

export default function WebGlMultipleElementsPage() {
    // 标准球体

    useEffect(() => {
        canvas = document.getElementById("canvas");
        if(canvas){
            init()
        }
    }, []);
    return (
        <div className={`canvas-wrapper ${styles['page']}`}>
            <canvas id="canvas" className={styles['global-canvas']}></canvas>
            <div className={styles["element-list"]}>
                {elementList.map((element:MultipleElementType)=>{
                    return (
                        <div key={element.id} className={styles["element-item"]}>
                            <div className={styles["element-scene"]} id={element.id}></div>
                            <p className={styles["element-title"]}>{element.title}</p>
                            <p className={styles["element-desc"]}>{element.desc}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const scenes:THREE.Scene[] = []
let renderer: THREE.WebGLRenderer | undefined = undefined
function init(){
    elementList.forEach((element: MultipleElementType)=>{
        const scene = new THREE.Scene()
        const sceneElement = document.getElementById(element.id)
        scene.userData.element = sceneElement

        const camera = new THREE.PerspectiveCamera(50, 1, 1, 10)
        camera.position.z = 2
        scene.userData.camera = camera

        const controls = new OrbitControls(scene.userData.camera, scene.userData.element)
        controls.minDistance = 2
        controls.maxDistance = 5
        controls.enablePan = false
        controls.enableZoom = false
        scene.userData.controls = controls

        scene.add(new THREE.Mesh(element.geometry, element.material))
        scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444,3))
        const light = new THREE.DirectionalLight(0xffffff,1.5)
        light.position.set(1,1,1)
        scene.add(light)
        scenes.push(scene)
    })

    renderer = new THREE.WebGLRenderer({canvas:canvas as HTMLCanvasElement, antialias:true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animation)
    renderer.setClearColor(0x000000,1)
    window.addEventListener("resize", resize)
}

// 更新尺寸
function resize(){
    renderer?.setSize(window.innerWidth, window.innerHeight)
}

/**
 * 更新尺寸
 */
function updateSize(){
    const width = canvas?.clientWidth
    const height = canvas?.clientHeight
    if( canvas?.width !== width || canvas?.height !== height){
        renderer?.setSize(width as number, height as number, false)
    }
}

function animation(){
    updateSize()
    canvas.style.transform = `translateY(${window.scrollY}px)`

    renderer?.setClearColor(0x000000);
    renderer?.setScissorTest(false)
    renderer?.clear()

    renderer?.setClearColor(0x000000)
    renderer?.setScissorTest(true)
    scenes.forEach(scene => {

        scene.children[0].rotation.y = Date.now() * 0.001
        const element = scene.userData.element

        const rect = element.getBoundingClientRect()
        if(
            rect.bottom < 0 ||
            rect.top > (renderer?.domElement.clientHeight as number) ||
            rect.right < 0 ||
            rect.left > (renderer?.domElement.clientWidth as number)
        ){
            return
        }
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = (renderer?.domElement.clientHeight as number) - rect.bottom

        // 视口裁剪
        renderer?.setViewport(left, bottom, width, height)
        renderer?.setScissor(left, bottom, width, height)

        const camera: THREE.PerspectiveCamera = scene.userData.camera
        renderer?.render(scene, camera)

    })
}
