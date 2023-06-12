import { Game } from "../../game"
import { Collider } from "../components/Collider"
import { Component } from "../components/Component"
import { Transform } from "../components/Transform"


export class GameObject {
    public name: string
    public parent: GameObject | null = null
    public children: GameObject[] = []
    private isActive: boolean

    public transform: Transform
    private components: { [key: string]: Component }
    public layer: string

    constructor(name: string) {
        this.transform = new Transform(this)
        this.name = name
        this.layer = 'Default'
        this.components = {}
        this.isActive = true

        this.addComponent(this.transform)

        Game.registerGameObject(this)
    }

    public update(): void {
        for (const key in this.components) {
            if (this.active) {
                this.components[key].update()
            }
        }
    }

    public addComponent(component: Component): void {
        this.components[component.name] = component

        if (component.name === 'Collider') {
            (component as Collider).OnCollisionStay.subscribe(this.OnCollisionStay);
            (component as Collider).OnTriggerStay.subscribe(this.OnTriggerStay)
        }
    }

    public getComponent(name: string): Component {
        return this.components[name]
    }

    public executeStart(): void {
        this.start()
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].executeStart()
        }
    }

    public executeUpdate(): void {
        if (!this.active) return
        this.update()
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].executeUpdate()
        }
    }

    public setChild(childNode: GameObject) {
        if (this.children.includes(childNode)) return
        this.children.push(childNode)
        childNode.parent = this
    }

    public removeChild(childNode: GameObject){
        if (!this.children.includes(childNode)) return
        this.children.splice(this.children.indexOf(childNode), 1)
    }
    public setParent(parentNode: GameObject) {
        parentNode.setChild(this)
    }

    public setActive(value: boolean): void {
        this.isActive = value

        if (this.active) this.onEnabled()
        else (this.onDisabled())
    }

    get active(): boolean { return this.isActive }
    
    public start(): void { /**/ }
    public onEnabled(): void { /**/ }
    public onDisabled(): void { /**/ }
    public OnCollisionStay(collider: Collider): void { collider }
    public OnTriggerStay(collider: Collider): void { collider }

    public destroy(): void {
        // Remove the GameObject from its parent (if any)
        if (this.parent) {
            this.parent.removeChild(this)
        }

        // Destroy all child GameObjects
        for (const child of this.children) {
            child.destroy()
        }

        // Unregister the GameObject from the Game
        Game.unregisterGameObject(this)
    }

}