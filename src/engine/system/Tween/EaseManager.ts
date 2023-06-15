import { Ease } from "./Ease"

const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * Math.PI) / 3
const c5 = (2 * Math.PI) / 4.5
const n1 = 7.5625
const d1 = 2.75

export class EaseManager{
    public static EaseFuction(easeType: Ease, t: number) : number {
        switch (easeType){
            case Ease.Linear:
                return t
            case Ease.InSine:
                return 1 - Math.cos((t * Math.PI) / 2)
            case Ease.OutSine:
                return Math.sin((t * Math.PI) / 2)
            case Ease.InOutSine:
                return 0.5 * (1 - Math.cos((Math.PI * t) / 2))
            case Ease.InQuad:
                return t * t
            case Ease.OutQuad:
                return -t * (t - 2)
            case Ease.InOutQuad:
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
            case Ease.InCubic:
                return t * t * t
            case Ease.OutCubic:
                return (t - 1) * (t - 1) * (t - 1) + 1
            case Ease.InOutCubic:
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            case Ease.InQuart:
                return t * t * t * t
            case Ease.OutQuart:
                return 1 - Math.pow(1 - t, 4)
            case Ease.InOutQuart:
                return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
            case Ease.InQuint:
                return t * t * t * t * t
            case Ease.OutQuint:
                return 1 - Math.pow(1 - t, 5)
            case Ease.InOutQuint:
                return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
            case Ease.InExpo:
                return t === 0 ? 0 : Math.pow(2, 10 * t - 10)
            case Ease.OutExpo:
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
            case Ease.InOutExpo:
                return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2
            case Ease.InCirc:
                return 1 - Math.sqrt(1 - Math.pow(t, 2))
            case Ease.OutCirc:
                return Math.sqrt(1 - Math.pow(t - 1, 2))
            case Ease.InOutCirc:
                return t < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
            case Ease.InBack:
                return c3 * t * t * t - c1 * t * t
            case Ease.OutBack:
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
            case Ease.InOutBack:
                return t < 0.5
                ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
                : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
            case Ease.InElastic:
                return t === 0 ? 0 : t === 1 ? 1
                : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
            case Ease.OutElastic:
                return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
            case Ease.InOutElastic:
                return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
                ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
            case Ease.InBounce:
                return 1 - this.easeOutBounce(1 - t) 
            case Ease.OutBounce:
                return this.easeOutBounce(t)
            case Ease.InOutBounce:
                return t < 0.5
                ? (1 - this.easeOutBounce(1 - 2 * t)) / 2
                : (1 + this.easeOutBounce(2 * t - 1)) / 2
            default:
                return t
        }
    }

    private static easeOutBounce(t: number) :number{
        if (t < 1 / d1) {
            return n1 * t * t
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375
        }
    }
}