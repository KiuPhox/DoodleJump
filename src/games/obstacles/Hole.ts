import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"
import { Vector2 } from "../../engine/utils/Vector2"

export class Hole extends GameObject{
    constructor(){
        super("Hole")

        const sprite = new Sprite(this, 2)
        sprite.setSprite('assets/images/hole.png')

        const collider = new Collider(this)
        collider.isTrigger = true

        this.transform.position = new Vector2(100, -100)

        this.addComponent(sprite)
        this.addComponent(collider)
    }
}