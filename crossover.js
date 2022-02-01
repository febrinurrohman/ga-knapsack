function crossover(nGene, selectedParent) {
    const crossoverPoint = Math.round(nGene / 2);

    const parent1a = [...selectedParent[0].chromosome];
    const parent1b = parent1a.splice(crossoverPoint - 1, nGene);

    const parent2a = [...selectedParent[1].chromosome];
    const parent2b = parent2a.splice(crossoverPoint - 1, nGene);

    return [
        parent1a.concat(parent2b),
        parent2a.concat(parent1b)
    ]
}