import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "../engine/system/GameObject"

export default class Background extends GameObject {
    constructor() {
        super('Background')
        this.transform.scale = 0.5

        const sprite = new Sprite(this, 3)
        sprite.setSprite("assets/images/bck.png")
        

        this.addComponent(new RigidBody(this, 0))
        this.addComponent(sprite)
    }
}