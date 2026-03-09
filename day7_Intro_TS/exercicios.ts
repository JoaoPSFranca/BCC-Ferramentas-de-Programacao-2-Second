console.clear();
const numeros: number[] = [1, 2, 3, 4, 5];

// 1. Crie uma função que retorne a quantidade de números pares do vetor numeros.
function qtd_pares(numeros: number[]): number {
    let count = 0;

    for (let item of numeros)
        if (item % 2 == 0)
            count++;

    return count;
}

// 2. Crie uma função anônima que retorne a soma dos elementos ímpares do vetor numeros.
const qtd_impares = function (numeros: number[]): number {
    let count = 0;

    for (let item of numeros)
        if (item % 2 != 0)
            count++;

    return count;
}

// 3. Crie uma arrow function que mostre no console os elementos em ordem inversa (do último para o primeiro).
const ordem_inversa = (numeros: number[]) => {
    let num_rev = [...numeros];
    num_rev.reverse();

    for (let item of num_rev)
        console.log(item);
}

// 4. Crie uma função para encontrar e retornar o maior elemento do array numeros.
function maior_numero(numeros: number[]): number {
    let maior = 0;

    for (let item of numeros)
        if (item > maior)
            maior = item;

    return maior;
}

// 5. Crie uma função para encontrar e retornar o menor elemento do array numeros.
function menor_numero(numeros: number[]): number {
    let menor = numeros[0];

    for (let item of numeros)
        if (item < menor)
            menor = item;

    return menor;
}

// 6. Crie uma função para calcular e retornar a média entre os elemento do array numeros.
function media(numeros: number[]): number {
    let count = 0;

    for (let item of numeros) 
        count += item;

    return count / numeros.length;
}

// 7. Criar uma função que retorne todos os elementos pares do array numeros.
function numeros_pares(numeros: number[]): number[] {
    let pares = [];

    for (let item of numeros)
        if (item % 2 == 0) 
            pares.push(item);

    return pares;
}

console.log("Vetor base: ", numeros);
console.log("1 - quantidade pares: ", qtd_pares(numeros));
console.log("2 - quantidade impares: ", qtd_impares(numeros));
console.log("3 - ordem inversa: ");
ordem_inversa(numeros);
console.log("4 - maior numero: ", maior_numero(numeros));
console.log("5 - menor numero: ", menor_numero(numeros));
console.log("6 - media: ", media(numeros));
console.log("7 - todos os numeros pares: ", numeros_pares(numeros));
