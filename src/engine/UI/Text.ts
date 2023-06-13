import { Canvas } from "../system/Canvas"
import { GameObject } from "../system/GameObject"

export class Text extends GameObject{
    public text: string
    public font: string

    constructor() {
        super("Text")
        this.text = ''
        this.font = '28px Arial'
        Canvas.registerText(this)
    }
}