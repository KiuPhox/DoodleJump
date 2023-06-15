import { Time } from "../Time"
import { EaseManager } from "./EaseManager"
import { Ease } from "./Ease"
import { TweenManager } from "./TweenManager"
import { Vector2 } from "../../utils/Vector2"
import { LoopType } from "./LoopType"

export class Tween {
    private target: any
    private duration: number
    private easing: Ease
    private onCompleteCallback: TweenCallback | null
    private startTime: number
    private loopCount: number
    private loopType: LoopType
    private isYoyoReverse: boolean
    
    private numberProperties: { [key: string]: { start: number, delta: number } }
    private Vector2Properties: { [key: string]: { start: Vector2, delta: Vector2 }}
  
    constructor(target: any, duration: number) {
        this.target = target
        this.duration = duration
        this.easing = Ease.Linear
        this.startTime = Time.time

        this.loopCount = 1
        this.loopType = LoopType.Restart
        this.isYoyoReverse = false

        this.numberProperties = {}
        this.Vector2Properties = {}
        TweenManager.addTween(this)
    }
  
    public to(props: {[key: string]: Vector2 | number}): Tween {
        for (const key in props) {
            if (this.target[key] instanceof Vector2){
                const startValue = this.target[key] as Vector2
                const endValue = props[key] as Vector2
                const deltaValue = endValue.sub(startValue)
                
                this.Vector2Properties[key] = {
                    start: startValue,
                    delta: deltaValue
                }
            }
            else if (Object.prototype.hasOwnProperty.call(this.target, key)) {
                const startValue = this.target[key] as number
                const endValue = props[key] as number
                const deltaValue = endValue - startValue
        
                this.numberProperties[key] = {
                    start: startValue,
                    delta: deltaValue,
                }
            }
        }
    
        return this
    }
  
    public setEasing(easing: Ease): Tween {
        this.easing = easing
        return this
    }

    public setLoops(loopCount: number, loopType: LoopType = LoopType.Restart): Tween{
        this.loopCount = loopCount
        this.loopType = loopType
        return this
    }

  
    public onComplete(callback: TweenCallback): Tween {
        this.onCompleteCallback = callback
        return this
    }
  
    public update(): void {
        const elapsed = Time.time - this.startTime
        const t = Math.min(elapsed / this.duration, 1)

        for (const key in this.Vector2Properties){
            if (Object.prototype.hasOwnProperty.call(this.Vector2Properties, key)) {
                if (this.target[key] instanceof Vector2){
                    const prop = this.Vector2Properties[key]
                    const value = prop.delta.mul(EaseManager.EaseFuction(this.easing, t)).add(prop.start)
                    this.target[key] = value
                }
            }
        }

        for (const key in this.numberProperties) { 
            if (Object.prototype.hasOwnProperty.call(this.numberProperties, key)) {
                const prop = this.numberProperties[key]
                const value = EaseManager.EaseFuction(this.easing, t) * prop.delta + prop.start
                this.target[key] = value
            }
        }
        if (t >= 1) {
            if (this.loopCount > 1){
                this.loopCount--
                this.startTime = Time.time
                if (this.loopType === LoopType.Yoyo) {
                    this.isYoyoReverse = !this.isYoyoReverse
                    this.reverseProperties()
                }
            }
            else if (this.loopCount === -1){
                this.startTime = Time.time
                if (this.loopType === LoopType.Yoyo) {
                    this.isYoyoReverse = !this.isYoyoReverse
                    this.reverseProperties()
                }
            } 
            else {
                this.complete()
            }
        }
    }

    private reverseProperties(): void {
        for (const key in this.Vector2Properties) {
            if (Object.prototype.hasOwnProperty.call(this.Vector2Properties, key)) {
                const prop = this.Vector2Properties[key]

                prop.start = prop.start.add(prop.delta)
                prop.delta = prop.delta.mul(-1)
            }
        }

        for (const key in this.numberProperties) { 
            if (Object.prototype.hasOwnProperty.call(this.numberProperties, key)) {
                const prop = this.numberProperties[key]

                prop.start += prop.delta
                prop.delta = -prop.delta
            }
        }
    }
  
    private complete(): void {
        TweenManager.removeTween(this)
    
        for (const key in this.numberProperties) {
            if (Object.prototype.hasOwnProperty.call(this.numberProperties, key)) {
                delete this.numberProperties[key]
            }
        }
    
        this.onCompleteCallback?.call(this.onCompleteCallback)
    }
}