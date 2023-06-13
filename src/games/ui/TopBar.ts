import { Sprite } from "../../engine/components/Sprite"
import { Canvas } from "../../engine/system/Canvas"
import { GameObject } from "../../engine/system/GameObject"
import { Vector2 } from "../../engine/utils/Vector2"

export class TopBar extends GameObject{
    constructor(){
        super('TopBar')

        const sprite = new Sprite(this, 0)
        sprite.setSprite('assets/images/top-score.png')
        this.addComponent(sprite)

    
        this.transform.position = new Vector2(0, Canvas.size.y / 2 - sprite.height / 2)
    }
}