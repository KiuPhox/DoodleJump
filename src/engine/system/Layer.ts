import { Physic } from "./Physic"

export class Layer {
    public static layers: string[] = []

    public static init() {
        Layer.add('Default')
    }

    public static add(layer: string) {
        Physic.registerInteractiveLayer(layer)
        this.layers.push(layer)
    }

    public static remove(layer: string) {
        this.layers.splice(this.layers.indexOf(layer))
    }
}