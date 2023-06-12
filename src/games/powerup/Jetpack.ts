import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"

export class Jetpack extends GameObject {
    constructor(){
        super('Jetpack')

        const sprite = new Sprite(this, 2)
        sprite.setSprite('assets/images/jetpack.png')

        const collider = new Collider(this)

        this.addComponent(collider)
        this.addComponent(sprite)
    }
}