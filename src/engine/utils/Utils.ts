export class Utils {
    public static RandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    public static RandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public static WeightPick(weights: number[]) : number
    {
        let accumlateWeights = 0

        const anotherWeights : number[] = []
        
        for (let i = 0; i < weights.length; i++)
        {
            accumlateWeights += weights[i]
            anotherWeights[i] = accumlateWeights
        }

        const r = this.RandomFloat(0, 1) * accumlateWeights

        for (let i = 0; i < anotherWeights.length; i++)
        {
            if (anotherWeights[i] >= r)
            {
                return i
            }
        }
        return -1
    }
}