import { Button } from './Button'
import { Text } from './Text'

export class UIManager {
    public static buttons: Button[]
    public static texts: Text[]

    public static init(): void {
        this.buttons = []
        this.texts = []
    }

    public static registerButton(button: Button): void {
        this.buttons.push(button)
    }

    public static registerText(text: Text): void {
        this.texts.push(text)
    }
}
