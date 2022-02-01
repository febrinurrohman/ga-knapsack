function calculateFitness(items, maxWeight, chromosome) {
    let totalWeight = 0;
    let totalValue = 0;
    let iGene = 0;

    chromosome.forEach(gene => {
        totalWeight += (gene * items[iGene].weight);
        totalValue += (gene * items[iGene].value);
        iGene++;
    });

    const weightFitness = (maxWeight - totalWeight) < 0 ? (-1) : (maxWeight - totalWeight);

    return {
        totalWeight: totalWeight,
        totalValue: weightFitness < 0 ? 0 : totalValue
    }
}