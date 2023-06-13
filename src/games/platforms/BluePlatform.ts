import { Canvas } from "../../engine/system/Canvas"
import { Time } from "../../engine/system/Time"
import { Utils } from "../../engine/utils/Utils"
import { Vector2 } from "../../engine/utils/Vector2"
import { BasePlatform } from "./BasePlatform"

const MOVE_SPEED_RANGE = new Vector2(50, 200)

export class BluePlatform extends BasePlatform{
    private moveDirection: Vector2

    constructor() {
        super()
        this.name = 'BluePlatform'
        this.sprite.setSprite('assets/images/blue-platform.png')
        this.moveDirection = Vector2.right
    }

    public update(): void {
        super.update()
        if (this.transform.position.x > Canvas.size.x / 2){
            this.moveDirection = Vector2.left
        }
        else if (this.transform.position.x < -Canvas.size.x / 2){
            this.moveDirection = Vector2.right
        }

        this.transform.position = this.transform.position.add(
            this.moveDirection.mul(Utils.RandomFloat(MOVE_SPEED_RANGE.x, MOVE_SPEED_RANGE.y) * Time.deltaTime))
    }
}