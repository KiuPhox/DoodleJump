export async function load(imagePaths: string[]): Promise<void> {
    const promises: Promise<void>[] = []
  
    for (const path of imagePaths) {
      const promise = new Promise<void>((resolve) => {
        const image = new Image()
        image.onload = () => {
          resolve()
        }
        image.src = path
      })
  
      promises.push(promise)
    }
  
    await Promise.all(promises)
    // All images have finished loading
    console.log('All images have been loaded')
}