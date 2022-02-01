function initialPopulation(nPopulation, nGene, items, maxWeight) {
    let population = [];

    for (let i = 0; i < nPopulation; i++) {
        const chromosome = createNewChromosome(nGene);
        const fitness = calculateFitness(items, maxWeight, chromosome);

        population.push({
            chromosome: chromosome,
            totalWeight: fitness.totalWeight,
            totalValue: fitness.totalValue
        });
    }

    return population;
}