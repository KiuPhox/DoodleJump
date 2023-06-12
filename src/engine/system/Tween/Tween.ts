import { Time } from "../Time"
import { EaseManager } from "./EaseManager"
import { Ease } from "./Ease"
import { TweenManager } from "./TweenManager"

export class Tween {
    private target: any
    private duration: number
    private easing: Ease
    private onCompleteCallback: TweenCallback | null
    private startTime: number
    private properties: { [key: string]: { start: number, delta: number } }
  
    constructor(target: any, duration: number) {
      this.target = target
      this.duration = duration
      this.easing = Ease.Linear
      this.startTime = Time.time
      this.properties = {}
      TweenManager.addTween(this)
    }
  
    public to(props: any): Tween {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(this.target, key)) {
            const startValue = this.target[key]
            const endValue = props[key]
            const deltaValue = endValue - startValue
    
            this.properties[key] = {
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

  
    public onComplete(callback: TweenCallback): Tween {
      this.onCompleteCallback = callback
      return this
    }
  
    public update(): void {
        const elapsed = Time.time - this.startTime
        const t = Math.min(elapsed / this.duration, 1)

        for (const key in this.properties) {
          if (Object.prototype.hasOwnProperty.call(this.properties, key)) {
            const prop = this.properties[key]
            const value = EaseManager.EaseFuction(this.easing, t) * prop.delta + prop.start
            this.target[key] = value
          }
        }
    
        if (t >= 1) {
          this.complete()
        }
    }
  
    private complete(): void {
        TweenManager.removeTween(this)
    
        for (const key in this.properties) {
          if (Object.prototype.hasOwnProperty.call(this.properties, key)) {
            delete this.properties[key]
          }
        }
    
        this.onCompleteCallback?.call(this.onCompleteCallback)
    }
}