import { Collider } from '../../engine/components/Collider'
import { Sprite } from '../../engine/components/sprite/Sprite'
import { Canvas } from '../../engine/system/Canvas'
import { GameObject } from '../../engine/system/GameObject'
import { Vector2 } from '../../engine/utils/Vector2'
import { ObjectPoolManager } from '../level/ObjectPoolManager'

export class Hole extends GameObject {
    private sprite: Sprite

    constructor() {
        super('Hole')

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('assets/images/hole.png')

        const collider = new Collider(this)
        collider.isTrigger = true
        collider.scale = new Vector2(0.1, 0.1)

        this.addComponent(this.sprite)
        this.addComponent(collider)
    }

    public update(): void {
        super.update()
        if (this.transform.position.y + this.sprite.height / 2 < -Canvas.size.y / 2) {
            ObjectPoolManager.holePool.release(this)
        }
    }
}
