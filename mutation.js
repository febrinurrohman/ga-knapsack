function mutation(mutant, mutationRate, items, maxWeight) {
    for (let i = 0; i < mutant.length; i++) {
        if (Math.random() <= mutationRate) {
            mutant[i] = Math.abs(mutant[i] - 1);
        }
    }

    const fitness = calculateFitness(items, maxWeight, mutant);

    return {
        chromosome: mutant,
        totalWeight: fitness.totalWeight,
        totalValue: fitness.totalValue
    };
}