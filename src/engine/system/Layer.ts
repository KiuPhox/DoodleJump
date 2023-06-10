import { Physic } from "./Physic"

export class Layer {
    private static _layers: string[] = []

    public static init() {
        Layer.add('Default')
    }

    public static add(layer: string) {
        Physic.registerInteractiveLayer(layer)
        this._layers.push(layer)
    }

    public static remove(layer: string) {
        this._layers.splice(this._layers.indexOf(layer))
    }

    static get layers(): string[] {
        return this._layers
    }
}