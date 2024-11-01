"use client"

/**
 * HDR图出处：
 *  https://github.com/mrdoob/three.js/tree/master/examples/textures/cube/Park3Med
 */

import '@/assets/styles/three_canvas_reset.scss'
import * as THREE from 'three'
import {StereoEffect} from "three/examples/jsm/effects/StereoEffect";

import {useEffect} from "react";

import nx from '@/assets/textures/cube/Park3Med/nx.jpg'
import ny from '@/assets/textures/cube/Park3Med/ny.jpg'
import nz from '@/assets/textures/cube/Park3Med/nz.jpg'
import px from '@/assets/textures/cube/Park3Med/px.jpg'
import py from '@/assets/textures/cube/Park3Med/py.jpg'
import pz from '@/assets/textures/cube/Park3Med/pz.jpg'

let camera:any, scene:any, renderer:any, effect:any;
const spheres:any[] = [];
let mouseX = 0, mouseY = 0;
let windowHalfX:number = 0, windowHalfY: number = 0;

export default function WebglEffectStereoComp(){
    useEffect(() => {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2
        document.addEventListener('mousemove', onDocumentMouseMove)
        init(document.getElementById('webgl-effect-stereo-demos') as HTMLElement)
    }, []);
    return (
        <div className="three-canvas" id="webgl-effect-stereo-demos"></div>
    )
}

function init(container: HTMLElement){
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
         100000
    )
    camera.position.z = 3200

    scene = new THREE.Scene()
    scene.background = new THREE.CubeTextureLoader()
        .load([
            px.src,
            nx.src,
            py.src,
            ny.src,
            pz.src,
            nz.src,
        ])
    const geometry = new THREE.SphereGeometry(100, 32, 16)
    const textureCube = new THREE.CubeTextureLoader()
        .load([
            px.src,
            nx.src,
            py.src,
            ny.src,
            pz.src,
            nz.src,
        ])
    textureCube.mapping = THREE.CubeRefractionMapping
    const material = new THREE.MeshBasicMaterial({
        color:0xffffff,
        envMap: textureCube,
        refractionRatio: 0.95
    })
    for(let i = 0; i < 500 ; i ++){
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.random() * 10000 - 5000
        mesh.position.y = Math.random() * 10000 - 5000
        mesh.position.z = Math.random() * 10000 - 5000
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1
        scene.add(mesh)
        spheres.push(mesh)
    }

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setAnimationLoop(animate)
    container.appendChild(renderer.domElement)

    effect = new StereoEffect(renderer)
    effect.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', onWindowResize)
}

function onWindowResize(){
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    effect.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove(event:MouseEvent){
    mouseX = ( event.clientX - windowHalfX ) * 10
    mouseY = ( event.clientY - windowHalfY ) * 10
}

function animate(){
    const timer = 0.0001 * Date.now()
    camera.position.x += (mouseX - camera.position.x) * .05
    camera.position.y += ( - mouseY - camera.position.y) * .05
    camera.lookAt(scene.position)

    for(let i = 0, il = spheres.length; i < il; i++){
        const sphere = spheres[i]
        sphere.position.x = 5000 * Math.cos(timer + i)
        sphere.position.y = 5000 * Math.sin(timer + i * 1.1)
    }
    effect.render(scene, camera)
}
