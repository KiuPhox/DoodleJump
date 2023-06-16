import { GameObject } from '../system/GameObject'
import { UIManager } from './UIManager'

export class Text extends GameObject {
    public text: string
    public font: string

    constructor() {
        super('Text')
        this.text = ''
        this.font = '28px Arial'
        UIManager.registerText(this)
    }
}
