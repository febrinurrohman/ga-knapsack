const items = [
    { name: "A", weight: 142, value: 220 },
    { name: "B", weight: 63, value: 467 },
    { name: "C", weight: 47, value: 124 },
    { name: "D", weight: 78, value: 353 },
    { name: "E", weight: 16, value: 252 },
    { name: "F", weight: 34, value: 652 },
    { name: "G", weight: 145, value: 168 },
    { name: "H", weight: 37, value: 799 },
    { name: "I", weight: 83, value: 367 },
    { name: "J", weight: 48, value: 345 },
    { name: "K", weight: 86, value: 335 },
];

let table = `<table class="table-common">`;
let no = 1;

table += `<tr>
    <th>No</th>
    <th>Name</th>
    <th>Weight (gram)</th>
    <th>Value</th>
</tr>`;

items.forEach(el => {
    table += "<tr>";
    table += `<td align="center">${no++}</td>`;
    table += `<td align="center">${el.name}</td>`;
    table += `<td align="center">${el.weight}</td>`;
    table += `<td align="center">${el.value}</td>`;
    table += "</tr>";
});

table += "</table>";
document.getElementById("items_table").innerHTML = table;

document.getElementById("form").onsubmit = function (e) {
    e.preventDefault();

    document.getElementById("process_box").innerHTML = "";

    const nGene = items.length;
    const nPopulation = document.getElementById("n_population").value;
    const maxWeight = document.getElementById("max_weight").value;
    const targetValue = document.getElementById("target_value").value; // 3235
    const mutationRate = document.getElementById("mutation_rate").value;

    let processBox = `Number of population: ${nPopulation}<br>`;
    processBox += `Max allowed weight: ${maxWeight}<br>`;
    processBox += `Target of value: ${targetValue}<br>`;
    processBox += `Mutation rate: ${mutationRate}<br><br>`;

    document.getElementById("process_box").innerHTML = processBox;

    let fit = false;
    let iteration = 1;
    let currentMax = {};

    // initial population
    let population = initialPopulation(nPopulation, nGene, items, maxWeight);

    while (!fit) {
        // selection
        const selectedParent = selection([...population]);

        // crossover
        const children = crossover(nGene, selectedParent);

        // mutation
        let mutant = [];

        for (let i = 0; i < children.length; i++) {
            mutant[i] = mutation([...children[i]], mutationRate, items, maxWeight);
        }

        // regeneration
        population = regeneration([...population], [...mutant]);

        // termination
        let valueList = [];

        for (let i = 0; i < population.length; i++) {
            valueList[i] = population[i].totalValue;
        }

        let maxValue = Math.max(...valueList);

        console.log(`Iteration ${iteration}, current fittest value ${maxValue}`);

        document.getElementById("process_box").innerHTML += `Iteration ${iteration}, current fittest value ${maxValue}<br>`;

        if (maxValue >= targetValue) {
            let index = valueList.indexOf(maxValue);
            currentMax = population[index];
            fit = true;
        }

        iteration++;
        
        updateScroll();
    }

    let selectedTable = `<table class="table-common">`;
    no = 1;

    selectedTable += `<tr>
        <th>No</th>
        <th>Name</th>
        <th>Weight (gram)</th>
        <th>Value</th>
    </tr>`;

    for (let i = 0; i < currentMax.chromosome.length; i++) {
        if (currentMax.chromosome[i] === 1) {
            selectedTable += "<tr>";
            selectedTable += `<td align="center">${no++}</td>`;
            selectedTable += `<td align="center">${items[i].name}</td>`;
            selectedTable += `<td align="center">${items[i].weight}</td>`;
            selectedTable += `<td align="center">${items[i].value}</td>`;
            selectedTable += "</tr>";
        }
    }

    selectedTable += `<tr>
            <th colspan="2">&nbsp;</th>
            <th>${currentMax.totalWeight}</th>
            <th>${currentMax.totalValue}</th>
        </tr>
    </table>`;

    document.getElementById("selected_items_table").innerHTML = selectedTable;
};

function updateScroll() {
    var element = document.getElementById("process_box");
    element.scrollTop = element.scrollHeight;
}