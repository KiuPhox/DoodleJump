import { Collider } from "../components/Collider"
import { Layer } from "./Layer"

const DEFAULT_BOUNCINESS = 0.75

export class Physic {
    private static colliders: Collider[] = []
    private static interactiveLayers: { [layerKey: string]: boolean } = {}

    static get bounciness(): number {
        return DEFAULT_BOUNCINESS
    }

    public static registerCollider(collider: Collider): void {
        Physic.colliders.push(collider)
    }

    public static registerInteractiveLayer(newLayer: string): void {
        for (const layer of Layer.layers) {
            // Set interaction between existing layers and new layer to true
            Physic.setInteractiveLayer(layer, newLayer, true)
            Physic.setInteractiveLayer(newLayer, layer, true)
        }
        // Set interaction within the new layer to true
        Physic.setInteractiveLayer(newLayer, newLayer, true)
    }

    // Set interaction between two layers
    public static setInteractiveLayer(firstLayer: string, secondLayer: string, value: boolean): void {
        Physic.interactiveLayers[`${firstLayer},${secondLayer}`] = value
        Physic.interactiveLayers[`${secondLayer},${firstLayer}`] = value
    }

    // Check if two layers have interactive interaction
    private static isInteractiveLayer(firstLayer: string, secondLayer: string): boolean {
        return Physic.interactiveLayers[`${firstLayer},${secondLayer}`] ?? false
    }

    // Update the physics simulation
    public static update(): void {
        const colliderCount = Physic.colliders.length
        for (let i = 0; i < colliderCount - 1; i++) {
            const colliderA = Physic.colliders[i]
            if (!colliderA.gameObject.active) continue

            for (let j = i + 1; j < colliderCount; j++) {
                const colliderB = Physic.colliders[j]
                if (!colliderB.gameObject.active) continue

                const layerA = colliderA.gameObject.layer
                const layerB = colliderB.gameObject.layer

                // Check if the layers have interactive interaction and collision occurs
                if (Physic.isInteractiveLayer(layerA, layerB) && Physic.checkCollision(colliderA, colliderB)) {
                    colliderA.colliding(colliderB) // Notify collider A of the collision
                    colliderB.colliding(colliderA) // Notify collider B of the collision
                }
            }
        }
    }

    private static checkCollision(a: Collider, b: Collider): boolean {
        const aPos = a.gameObject.transform.position
        const bPos = b.gameObject.transform.position

        // Check if the bounding boxes of the colliders intersect
        return (
            aPos.x + a.size.x / 2 >= bPos.x - b.size.x / 2 &&
            aPos.x - a.size.x / 2 <= bPos.x + b.size.x / 2 &&
            aPos.y + a.size.y / 2 >= bPos.y - b.size.y / 2 &&
            aPos.y - a.size.y / 2 <= bPos.y + b.size.y / 2
        )
    }
}
