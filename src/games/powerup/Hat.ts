import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"
export class Hat extends GameObject{
    constructor(){
        super('Hat')

        const sprite = new Sprite(this, 2)
        sprite.setSprite('assets/images/hat.png')

        const collider = new Collider(this)
        collider.isTrigger = true

        this.addComponent(sprite)
        this.addComponent(collider)
    }
}