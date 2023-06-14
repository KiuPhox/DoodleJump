type TweenCallback = () => void

interface PowerUpEffect {
    applyEffect(): void
    get isActive(): boolean
}