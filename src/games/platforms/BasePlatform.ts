import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"

export class BasePlatform extends GameObject{
    constructor(){
        super('Platform')

        const collider = new Collider(this)

        const sprite = new Sprite(this, 2)
        sprite.setSprite('/assets/images/green-ground.png')

        this.addComponent(sprite)
        this.addComponent(collider)
    }
}