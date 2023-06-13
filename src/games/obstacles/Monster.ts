import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { Canvas } from "../../engine/system/Canvas"
import { GameObject } from "../../engine/system/GameObject"
import { LevelGenerator } from "../LevelGenerator"

const MONSTER_IMAGE_PATHS = [
    'assets/images/monster-1.png'
]

export class Monster extends GameObject{
    public sprite: Sprite

    constructor(){
        super('Monster')

        const collider = new Collider(this)
        collider.isTrigger = true

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite(MONSTER_IMAGE_PATHS[0])

        this.addComponent(collider)
        this.addComponent(this.sprite)
    }

    public update(): void {
        super.update()
        if (this.transform.position.y + this.sprite.height / 2 < -Canvas.size.y / 2){
            LevelGenerator.monsterPools.release(this)
        }

    }
}