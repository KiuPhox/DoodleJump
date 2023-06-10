import { Button } from "./Button"

export class UIManager {
    private static _buttons: Button[]

    public static init() {
        UIManager._buttons = []
    }

    public static add(button: Button): void {
        this._buttons.push(button)
    }

    static get buttons(): Button[] { return UIManager._buttons }
}