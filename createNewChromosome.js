function createNewChromosome(nGene) {
    let chromosome = [];

    for (let i = 0; i < nGene; i++) {
        chromosome[i] = Math.floor(Math.random() * 2);
    }

    return chromosome;
}