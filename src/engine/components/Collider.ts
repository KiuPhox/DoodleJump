import { GameObject } from "../system/GameObject"
import { Vector2 } from "../utils/Vector2"
import { Event } from "../event/Event"
import { Physic } from "../system/Physic"
import { Component } from "./Component"
import { RigidBody } from "./RigidBody"
import { Sprite } from "./Sprite"

export class Collider extends Component {
    public isTrigger: boolean
    public scale: Vector2
    public OnCollisionStay: Event<Collider> = new Event<Collider>()
    public OnTriggerStay: Event<Collider> = new Event<Collider>()

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.scale = new Vector2(1, 1)
        this.isTrigger = false
        this.name = "Collider"
        Physic.registerCollider(this)
    }

    get size(): Vector2 {
        const sprite = this.gameObject.getComponent('Sprite') as Sprite
        return new Vector2(sprite.width * this.scale.x, sprite.height * this.scale.y)
    }

    public update(): void {
        super.update()
    }

    public colliding(collider: Collider) {
        if (this.isTrigger) {
            this.OnTriggerStay.invoke(collider)
        } else {

            const thisRb = this.gameObject.getComponent('RigidBody') as RigidBody
            if (!thisRb) return

            if (thisRb.isStatic) return

            const otherRb = collider.gameObject.getComponent('RigidBody') as RigidBody

            const otherVelocity = otherRb ? otherRb.velocity : Vector2.zero

            const bounceVelocity = otherVelocity.sub(thisRb.velocity.mul(Physic.bounciness))

            thisRb.velocity = bounceVelocity.magnitude < 0.005 ? Vector2.zero : bounceVelocity
            this.OnCollisionStay.invoke(collider)
        }
    }
}