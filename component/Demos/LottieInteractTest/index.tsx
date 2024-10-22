import Animation_Confetti from '@/assets/Animation/Animation_Confetti.json'
import Lottie from "lottie-react";
import styles from './lottie_interact_test.module.scss'
import {useState} from "react";

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

// 礼花尺寸
const confetti_w = 100, confetti_h = 100;
let idCounter = 0;
export default function LottieInteractTestComp(){
    /**
     * 鼠标点击，新增礼炮
     */
    const [confettiList,setConfettiList]=useState<ConfettiVO[]>([
        // {
        //     id:0,
        //     x:10,
        //     y:20,
        // }
    ])
    function addConfetti(event:any):any{
        // console.log(event.pageX, event.pageY)
        const newConfetti:ConfettiVO = {
            id:idCounter++,
            x:event.pageX,
            y:event.pageY,
        }
        // console.log(event)
        setConfettiList([...confettiList, newConfetti])
        // console.log(confettiList)
    }

    /**
     * 动画播放结束，将点位清除
     * @param confetti
     */
    function animationComplete(confetti: ConfettiVO){
        setConfettiList(confettiList.filter(point=>point.id !== confetti.id))
    }
    return (
        <div className={styles['canvas']} onMouseDown={addConfetti}>
            {confettiList.map((point)=>{
                return <Lottie
                    key={point.id}
                    animationData={Animation_Confetti}
                    className={styles['mouse-confetti']}
                    style={{top:`${point.y}px`, left:`${point.x}px`,width:`${confetti_w}px`,height:`${confetti_h}px`}}
                    loop={false}
                    onComplete={()=>animationComplete(point)}
                />
            })}
        </div>
    )
}
