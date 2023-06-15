import { GameObject } from '../system/GameObject'

export class Component {
    public name: string
    public gameObject: GameObject

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject
    }

    update() {
        // Update
    }

    destroy() {
        // Destroy
    }
}
