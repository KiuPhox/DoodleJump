import { Physic } from './Physic'

export class Layer {
    public static layers: string[] = []

    public static init(): void {
        Layer.add('Default')
    }

    public static add(layer: string): void {
        Physic.registerInteractiveLayer(layer)
        this.layers.push(layer)
    }

    public static remove(layer: string): void {
        this.layers.splice(this.layers.indexOf(layer))
    }
}
