import { Button } from './Button'

export class UIManager {
    public static buttons: Button[]

    public static init() {
        UIManager.buttons = []
    }

    public static add(button: Button): void {
        this.buttons.push(button)
    }
}
