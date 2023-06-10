import { GameObject } from "../system/GameObject"

export class Component {
    public name: string
    public gameObject: GameObject

    constructor(_gameObject: GameObject) {
        this.gameObject = _gameObject
    }

    update() {
        // Update
    }
}