import { GameObject } from '../system/GameObject'
import { Canvas } from '../system/Canvas'
import { Component } from './Component'
import { ImagePreload } from '../loader/ImagePreload'

export class Sprite extends Component {
    public image: HTMLImageElement
    public order: number
    public flipX: boolean
    public flipY: boolean
    public alpha: number

    constructor(gameObject: GameObject, _order?: number) {
        super(gameObject)

        this.order = _order || 0
        this.name = 'Sprite'
        this.flipX = false
        this.flipY = false
        this.alpha = 1

        Canvas.registerSprite(this)
    }

    public setSprite(path: string) {
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
