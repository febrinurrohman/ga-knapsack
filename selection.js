function selection(population) {
    let valueList = [];

    for (let i = 0; i < population.length; i++) {
        valueList[i] = population[i].totalValue;
    }

    let maxValue = Math.max(...valueList);
    let index = valueList.indexOf(maxValue);
    const parent1 = population[index];

    valueList.splice(index, 1);
    population.splice(index, 1);

    maxValue = Math.max(...valueList);
    index = valueList.indexOf(maxValue);
    const parent2 = population[index];

    return [parent1, parent2];
}