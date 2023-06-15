export class ImagePreload {
    private static images: { [key: string]: HTMLImageElement } = {}

    public static init() {
        this.images = {}
    }

    public static async load(imagePaths: string[]): Promise<void> {
        const promises: Promise<void>[] = []

        const preloadImages = (path: string) => {
            return new Promise<void>((resolve) => {
                const image = new Image()
                image.src = path
                this.images[path] = image
                image.onload = () => {
                    resolve()
                }
            })
        }

        for (const path of imagePaths) {
            promises.push(preloadImages(path))
        }

        await Promise.all(promises)

        console.log('All images have been loaded')
    }

    public static getImage(path: string): HTMLImageElement {
        return this.images[path]
    }
}
