"use client"
import {useEffect} from "react";
import * as THREE from 'three'
import {GUI} from 'dat.gui'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader";
import {DotScreenShader} from "three/examples/jsm/shaders/DotScreenShader";
import {OutputPass} from "three/examples/jsm/postprocessing/OutputPass";

export default function WebglPostProcessingPage() {
    let canvasDom: HTMLElement | null = null

    useEffect(()=>{
        canvasDom = document.getElementById("canvas")
        if(canvasDom){
            initAll(canvasDom)
        }
        return ()=>{
            if(gui){
                gui.destroy()
            }
        }
    },[])

    return (
        <div className="canvas-wrapper">
            <div id="canvas"></div>
        </div>
    )
}

let scene:any
let camera:any
let renderer:any
let object:any
let composer:any
let gui:any
let speed = 1
function initAll(dom:HTMLElement){
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
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000)
    dom.appendChild(renderer.domElement)
    renderer.setAnimationLoop(animation)
    window.addEventListener("resize", resize)

    const controls = new OrbitControls(camera, renderer.domElement)

    const options = {
        axesHelperVisible:false,
        speed:speed,
        fogColor:0x000000,
        far:1000,
        near:1
    }
    gui = new GUI()
    gui.add(options,'axesHelperVisible').onChange(e=>{
        axesHelper.visible = e
    })
    gui.add(options,"speed").onChange(e=>speed = e)
    gui.addColor(options,'fogColor').onChange(e=>{
        fog.color.set(e)
    })
    gui.add(options,"far").onChange(e=>fog.far = e)
    gui.add(options,"near").onChange(e=>fog.near = e)
    const axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)
    axesHelper.visible = options.axesHelperVisible

    const fog = new THREE.Fog(options.fogColor, options.near, options.far)
    scene.fog = fog

    object = new THREE.Object3D()
    scene.add(object)

    const geometry = new THREE.SphereGeometry(1,4,4)
    const material = new THREE.MeshPhongMaterial({
        color:0xffffff,
        flatShading: true
    })
    for(let i = 0; i < 100; i++){
        const mesh = new THREE.Mesh(geometry, material)
        // 在1*1的空间内随机分配
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
        // 将1*1的空间坐标映射到400*400的空间内
        mesh.position.multiplyScalar(Math.random() * 400)
        // 给原始物体一个随机的旋转角度
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() *2)
        // 给一个随机的缩放值
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50
        object.add(mesh)
    }

    scene.add(new THREE.AmbientLight(0xcccccc))

    const lightOptions = {
        color:0xffffff,
        intensity:3,
        x:1,
        y:1,
        z:1
    }

    const light = new THREE.DirectionalLight(lightOptions.color, lightOptions.intensity)
    light.position.set(lightOptions.x, lightOptions.y, lightOptions.z)
    scene.add(light)

    const lightFolder = gui.addFolder("Light")
    lightFolder.addColor(lightOptions,'color').onChange(e=>{
        light.color.set(e)
    })
    lightFolder.add(lightOptions,'intensity').onChange(e=>light.intensity = e)
    lightFolder.add(lightOptions,'x').onChange(e=>light.position.x = e)
    lightFolder.add(lightOptions,'y').onChange(e=>light.position.y = e)
    lightFolder.add(lightOptions,'z').onChange(e=>light.position.z = e)

    const effectOptions = {
        DotEnable:true,
        DotScale: 4,
        RGBEnable:true,
        REBAmount:0.0014,
        outputEnable: true,
    }
    const EffectFolder = gui.addFolder("Effect")

    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    // 第一层滤镜：点化
    EffectFolder.add(effectOptions,"DotEnable").onChange(e=>effect1.enabled = e)
    EffectFolder.add(effectOptions,"DotScale").onChange(e=>effect1.uniforms['scale'].value = e)
    const effect1 = new ShaderPass(DotScreenShader)
    effect1.uniforms['scale'].value = effectOptions.DotScale
    composer.addPass(effect1)

    // 第二层滤镜：RGB色调分离
    EffectFolder.add(effectOptions,"RGBEnable").onChange(e=>effect2.enabled = e)
    EffectFolder.add(effectOptions,"REBAmount").onChange(e=>effect2.uniforms['amount'].value = e)
    const effect2 = new ShaderPass(RGBShiftShader)
    effect2.uniforms['amount'].value = effectOptions.REBAmount
    composer.addPass(effect2)


    // 最终：合成通道
    EffectFolder.add(effectOptions,"outputEnable").onChange(e=>effect3.enabled = e)
    const effect3 = new OutputPass()
    composer.addPass(effect3)
}

function animation(){
    object.rotation.x += 0.005 * speed
    object.rotation.y += 0.01 * speed

    composer.render()
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
