import { GameObject } from '../system/GameObject'
import { Vector2 } from '../utils/Vector2'
import { Component } from './Component'

export class Transform extends Component {
    private worldPosition: Vector2
    public localPosition: Vector2
    public rotation: number
    public scale: number

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.name = 'Transform'
        this.worldPosition = Vector2.zero
        this.rotation = 0
        this.scale = 1
        this.localPosition = Vector2.zero
    }

    update(): void {
        if (this.gameObject.parent !== null) {
            this.position = this.gameObject.parent.transform.position.add(this.localPosition)
        }
    }

    set position(value: Vector2) {
        this.localPosition = value.sub(
            this.gameObject.parent ? this.gameObject.parent.transform.position : Vector2.zero
        )
        this.worldPosition = value
    }

    get position(): Vector2 {
        return this.worldPosition
    }
}
