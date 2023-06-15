import { GameObject } from "../GameObject"
import { SceneManager } from "./SceneManager"

export class Scene{
    public name: string
    public gameObjects: GameObject[]
    public active: boolean

    constructor(name: string){
        this.name = name
        this.gameObjects = []
        this.active = false

        SceneManager.registerScene(this)
    }

    public update(){
        if (!this.active) return
        for (const gameObject of this.gameObjects){
            gameObject.update()
        }
    }

    public setActive(active: boolean){
        this.active = active
    }

    public registerGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject)
        gameObject.scene = this
    }

    public unregisterGameObject(gameObject: GameObject): void{
        this.gameObjects.slice(this.gameObjects.indexOf(gameObject), 1)
    }
}