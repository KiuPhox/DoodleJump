import { Collider } from '../../engine/components/Collider'
import { Sprite } from '../../engine/components/Sprite'
import { Canvas } from '../../engine/system/Canvas'
import { GameObject } from '../../engine/system/GameObject'
import { Utils } from '../../engine/utils/Utils'
import { ObjectPoolManager } from '../level/ObjectPoolManager'

const MONSTER_IMAGE_PATHS = ['assets/images/monster-1.png', 'assets/images/monster-2.png']

export class Monster extends GameObject {
    public sprite: Sprite
    //private rigidBody: RigidBody

    constructor() {
        super('Monster')

        const collider = new Collider(this)
        collider.isTrigger = true

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite(
            MONSTER_IMAGE_PATHS[Utils.RandomInt(0, MONSTER_IMAGE_PATHS.length - 1)]
        )

        this.addComponent(collider)
        this.addComponent(this.sprite)
    }

    public update(): void {
        super.update()
        if (this.transform.position.y + this.sprite.height / 2 < -Canvas.size.y / 2) {
            ObjectPoolManager.monsterPool.release(this)
        }
    }
}
