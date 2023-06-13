import { GameObject } from "../system/GameObject"
import { Canvas } from "../system/Canvas"
import { Component } from "./Component"
import { ImagePreload } from "../loader/ImagePreload"

export class Sprite extends Component {
    private _image: HTMLImageElement
    public order: number
    public flipX: boolean
    public flipY: boolean
    public alpha: number

    constructor(gameObject: GameObject, _order: number) {
        super(gameObject)

        this.order = _order
        this.name = 'Sprite'
        this.flipX = false
        this.flipY = false
        this.alpha = 1

        Canvas.registerSprite(this)
    }

    public setSprite(path: string) {
        const image = ImagePreload.getImage(path)

        if (image === undefined){
            this._image = new Image()
            this._image.src = path
        }
        else
        {
            this._image = image
        }
        
    }

    get width(): number { return this._image.width }

    get height(): number { return this._image.height }

    get image(): HTMLImageElement { return this._image }
}