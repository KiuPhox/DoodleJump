import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"
import { Tween } from "../../engine/system/tween/Tween"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"

const FADE_DURATION = 1

export class BlackImage extends GameObject {
    private sprite: Sprite

    constructor(){
        super('BlackImage')

        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite('assets/images/black-image.png')
        this.sprite.alpha = 0
    }

    public update(): void {
        super.update()
    }

    public show(): void{
        new Tween(this.sprite, FADE_DURATION).to({'alpha': 1}).onComplete(()=>{
            GameManager.updateGameState(GameState.Playing)
            new Tween(this.sprite, 0).to({'alpha': 0})
        })
    }
}