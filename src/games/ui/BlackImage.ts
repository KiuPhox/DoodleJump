import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"
import { Tween } from "../../engine/system/Tween/Tween"

const FADE_DURATION = 1

export class BlackImage extends GameObject {
    private sprite: Sprite
    private fadeTarget: number
    private fadeStartTime: number

    private fadeTween: Tween | null

    constructor(){
        super('BlackImage')

        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite('assets/images/black-image.png')
        this.sprite.alpha = 0

        this.fadeTarget = 0
        this.fadeStartTime = 0

        this.fadeTween = null
    }

    public update(): void {
        super.update()
    }

    public show(targetAlpha: number): void{
        if (this.fadeTween) return
        this.fadeTween = new Tween(this.sprite, FADE_DURATION).to({'alpha': targetAlpha}).onComplete(()=>{
            console.log('a')
        })
    }
}