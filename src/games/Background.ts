import { Sprite } from '../engine/components/sprite/Sprite'
import { GameObject } from '../engine/system/GameObject'

export default class Background extends GameObject {
    constructor() {
        super('Background')
        this.transform.scale = 0.5

        const sprite = new Sprite(this, 3)
        sprite.setSprite('assets/images/bck.png')

        this.addComponent(sprite)
    }
}
