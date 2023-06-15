import { Scene } from "./Scene"

export class SceneManager {
    private static scenes: Scene[]

    public static init(): void{
        this.scenes = []
    }

    public static update(): void{
        for (const scene of this.scenes){
            if (scene.active){
                scene.update()
            }
        }
    }

    public static registerScene(scene: Scene): void {
        if (this.scenes.length === 0) {
            scene.active = true
        }
        this.scenes.push(scene)
    }

    public static getSceneByName(name: string): Scene | null{
        for (const scene of this.scenes){
            if (scene.name === name){
                return scene
            }
        }
        return null
    }

    public static loadScene(targetScene: Scene) : void{
        for (const scene of this.scenes){
            if (scene === targetScene){
                scene.setActive(true)
            }
            else
            {
                for (const gameObject of scene.gameObjects){
                    if (gameObject.dontDestroyOnLoad){
                        scene.unregisterGameObject(gameObject)
                        targetScene.registerGameObject(gameObject)
                    }
                }
                scene.setActive(false)
            }
        }
    }
}