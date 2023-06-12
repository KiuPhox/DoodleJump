import { GameObject } from "./GameObject"

export class Scene{
    public name: string
    private gameObjects: GameObject[] = []

    constructor(name: string){
        this.name = name
    }

    public registerGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject)
    }
}