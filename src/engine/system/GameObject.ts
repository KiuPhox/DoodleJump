import { Game } from '../../game'
import { Collider } from '../components/Collider'
import { Component } from '../components/Component'
import { Transform } from '../components/Transform'
import { Scene } from './scene/Scene'

export class GameObject {
    public scene: Scene
    public name: string
    public parent: GameObject | null = null
    public children: GameObject[] = []
    private isActive: boolean

    public transform: Transform
    private components: { [key: string]: Component }
    public layer: string

    public dontDestroyOnLoad: boolean

    constructor(name: string) {
        this.transform = new Transform(this)
        this.name = name
        this.layer = 'Default'
        this.components = {}
        this.isActive = true
        this.dontDestroyOnLoad = false

        this.addComponent(this.transform)
        Game.registerGameObject(this)

        if (this.parent?.scene) {
            this.parent.scene.registerGameObject(this)
        }
    }

    public update(): void {
        for (const componentKey in this.components) {
            const component = this.components[componentKey]
            if (this.isActive) {
                component.update()
            }
        }
    }

    public addComponent(component: Component): void {
        this.components[component.name] = component

        if (component instanceof Collider) {
            component.OnCollisionStay.subscribe(this.OnCollisionStay)
            component.OnTriggerStay.subscribe(this.OnTriggerStay)
        }
    }

    public getComponent(name: string): Component | undefined {
        return this.components[name]
    }

    public executeStart(): void {
        this.start()
        for (const child of this.children) {
            child.executeStart()
        }
    }

    public executeUpdate(): void {
        if (!this.isActive) {
            return
        }
        this.update()
        for (const child of this.children) {
            child.executeUpdate()
        }
    }

    public setChild(childNode: GameObject): void {
        if (this.children.includes(childNode)) {
            return
        }
        this.children.push(childNode)
        childNode.parent = this

        if (this.scene) {
            this.scene.registerGameObject(childNode)
        }
    }

    public removeChild(childNode: GameObject): void {
        const index = this.children.indexOf(childNode)
        if (index !== -1) {
            this.children.splice(index, 1)
        }
    }

    public setParent(parentNode: GameObject): void {
        parentNode.setChild(this)
    }

    public setActive(value: boolean): void {
        this.isActive = value

        if (this.isActive) {
            this.onEnabled()
        } else {
            this.onDisabled()
        }
    }

    public get active(): boolean {
        return this.isActive && this.scene?.active
    }

    public start(): void {
        // Implementation for the start method
    }

    public onEnabled(): void {
        // Implementation for the onEnabled method
    }

    public onDisabled(): void {
        // Implementation for the onDisabled method
    }

    public OnCollisionStay(collider: Collider): void {
        // Implementation for the OnCollisionStay method
    }

    public OnTriggerStay(collider: Collider): void {
        // Implementation for the OnTriggerStay method
    }

    public destroy(): void {
        if (this.parent) {
            this.parent.removeChild(this)
        }

        for (const child of this.children) {
            child.destroy()
        }

        Game.unregisterGameObject(this)
    }
}
