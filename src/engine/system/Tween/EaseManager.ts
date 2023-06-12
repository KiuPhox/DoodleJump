import { Ease } from "./Ease"

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
                return 0.5 * (t * (t - 2))
            case Ease.InCubic:
                return t * t * t
            case Ease.OutCubic:
                return (t - 1) * (t - 1) * (t - 1) + 1
            case Ease.InOutCubic:
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            case Ease.InQuart:
                return t * t * t * t
            case Ease.OutQuart:
                return -((t - 1) * (t - 1) * (t - 1) - 1)
            default:
                return t
        }
    }
}