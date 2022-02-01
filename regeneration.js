function regeneration(population, mutant) {
    let valueList = [];

    for (let i = 0; i < population.length; i++) {
        valueList[i] = population[i].totalValue;
    }

    for (let i = 0; i < mutant.length; i++) {
        let minValue = Math.min(...valueList);
        let index = valueList.indexOf(minValue);

        valueList.splice(index, 1);
        population.splice(index, 1);
    }

    return population.concat(mutant);
}