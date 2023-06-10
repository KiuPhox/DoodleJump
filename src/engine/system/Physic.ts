import { Collider } from "../components/Collider"
import { Layer } from "./Layer"

const BOUNCINESS = 0.75

export class Physic {
    private static colliders: Collider[] = []
    private static interactiveLayers: { [id: string]: boolean } = {}

    static get bounciness(): number { return BOUNCINESS }

    public static registerCollider(collider: Collider) {
        Physic.colliders.push(collider)
    }

    public static registerInteractiveLayer(newLayer: string) {
        for (const layer of Layer.layers) {
            Physic.interactiveLayers[layer + ',' + newLayer] = true
            Physic.interactiveLayers[newLayer + ',' + layer] = true
        }
        Physic.interactiveLayers[newLayer + ',' + newLayer] = true
    }

    public static setInteractiveLayer(firstLayer: string, secondLayer: string, value: boolean) {
        Physic.interactiveLayers[firstLayer + ',' + secondLayer] = value
        Physic.interactiveLayers[secondLayer + ',' + firstLayer] = value
    }

    private static checkInteractiveLayer(firstLayer: string, secondLayer: string): boolean {
        return Physic.interactiveLayers[firstLayer + ',' + secondLayer]
    }

    public static update() {
        for (let i = 0; i < Physic.colliders.length - 1; i++) {
            for (let j = i + 1; j < Physic.colliders.length; j++) {
                if (Physic.colliders[i].gameObject.active && Physic.colliders[j].gameObject.active &&
                    this.checkInteractiveLayer(Physic.colliders[i].gameObject.layer, Physic.colliders[j].gameObject.layer) &&
                    this.checkCollider(Physic.colliders[i], Physic.colliders[j])) {
                    Physic.colliders[i].colliding(Physic.colliders[j])
                    Physic.colliders[j].colliding(Physic.colliders[i])
                }
            }
        }
    }

    private static checkCollider(a: Collider, b: Collider): boolean {
        const aPos = a.gameObject.transform.position
        const bPos = b.gameObject.transform.position

        return (
            aPos.x + a.size.x / 2 >= bPos.x - b.size.x / 2 &&
            aPos.x - a.size.x / 2 <= bPos.x + b.size.x / 2 &&
            aPos.y + a.size.y / 2 >= bPos.y - b.size.y / 2 &&
            aPos.y - a.size.y / 2 <= bPos.y + b.size.y / 2
        )
    }
}