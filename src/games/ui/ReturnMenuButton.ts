import { Button } from '../../engine/UI/Button'
import { GameManager } from '../GameManager'
import { GameState } from '../GameState'

const MENU_PATH = 'assets/images/menu.png'
const MENU_ON_PATH = 'assets/images/menu-on.png'

export class ReturnMenuButton extends Button {
    constructor() {
        super('ReturnMenuButton', MENU_PATH)
    }

    onClick(): void {
        // this.sprite.setSprite(MENU_ON_PATH)
        GameManager.updateGameState(GameState.Ready)
    }
}
