import { GameObject } from '../../system/GameObject'
import { Component } from '../Component'
import { ImagePreload } from '../../loader/ImagePreload'
import { BlendMode } from './BlendMode'
import { SpriteManager } from './SpriteManager'

export class Sprite extends Component {
    public image: HTMLImageElement
    public order: number
    public flipX: boolean
    public flipY: boolean
    public alpha: number
    public blendMode: BlendMode

    constructor(gameObject: GameObject, _order?: number) {
        super(gameObject)

        this.order = _order || 0
        this.name = 'Sprite'
        this.flipX = false
        this.flipY = false
        this.alpha = 1
        this.blendMode = BlendMode.NORMAL

        SpriteManager.registerSprite(this)
    }

    public setSprite(path: string): void {
        const image = ImagePreload.getImage(path)

        if (image === undefined) {
            this.image = new Image()
            this.image.src = path
        } else {
            this.image = image
        }
    }

    get width(): number {
        return this.image.width
    }

    get height(): number {
        return this.image.height
    }
}
