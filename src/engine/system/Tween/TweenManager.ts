import { Tween } from './Tween'

export class TweenManager {
    private static tweens: Tween[]

    public static init() {
        this.tweens = []
    }

    public static addTween(tween: Tween): void {
        if (!this.tweens.includes(tween)) {
            this.tweens.push(tween)
        }
    }

    public static removeTween(tween: Tween): void {
        const index = this.tweens.indexOf(tween)
        if (index !== -1) {
            this.tweens.splice(index, 1)
        }
    }

    public static update(): void {
        for (const tween of this.tweens) {
            tween.update()
        }
    }
}
