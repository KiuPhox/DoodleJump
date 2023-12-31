import { Sprite } from '../components/sprite/Sprite'
import { GameObject } from '../system/GameObject'
import { UIManager } from './UIManager'

export abstract class Button extends GameObject {
    protected sprite: Sprite

    constructor(name: string, src: string) {
        super(name)
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite(src)
        this.addComponent(this.sprite)
        UIManager.registerButton(this)
    }

    get width(): number {
        return this.sprite.width * this.transform.scale
    }
    get height(): number {
        return this.sprite.height * this.transform.scale
    }

    abstract onClick(): void
}
