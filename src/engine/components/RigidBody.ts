import { GameObject } from "../system/GameObject"
import { Time } from "../system/Time"
import { Vector2 } from "../utils/Vector2"
import { Component } from "./Component"

const GRAVITY_ACCELERATION = 100

export enum ForceMode {
    Force,
    VelocityChange
}

export class RigidBody extends Component {
    public gravityScale: number
    public velocity: Vector2
    public isStatic: boolean

    constructor(gameObject: GameObject, gravityScale: number) {
        super(gameObject)
        this.name = 'RigidBody'
        this.gravityScale = gravityScale
        this.velocity = Vector2.zero
        this.isStatic = false
    }

    public addForce(forceVector: Vector2, forceMode: ForceMode = ForceMode.Force): void {
        if (forceMode == ForceMode.Force) {
            this.velocity = this.velocity.add(forceVector)
        } else if (forceMode == ForceMode.VelocityChange) {
            this.velocity = new Vector2(forceVector.x, forceVector.y)
        }
    }

    public update(): void {
        if (this.gravityScale) {
            this.velocity = this.velocity.add(new Vector2(0, -GRAVITY_ACCELERATION * this.gravityScale).mul(Time.deltaTime))
        }
        if (this.velocity.magnitude > 0.1)
            this.gameObject.transform.position = this.gameObject.transform.position.add(this.velocity.mul(Time.deltaTime * GRAVITY_ACCELERATION))
        
    }
}