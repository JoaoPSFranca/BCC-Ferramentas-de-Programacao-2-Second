const numeros: number[] = [1, 2, 3, 4, 5];

// for each: aplica a função a cada item, não altera o vetor em si, serve mais para print
numeros.forEach(n => {
    console.log(`Número atual: ${n}`);
});

// map: aplica a função a cada item do vetor, alterando ele, nesse caso dobrando o valor 
const dobrados = numeros.map(n => n * 2); 

// filter: retorna apenas os números que seguem uma determinada condição, precisa de true e false
const pares = numeros.filter(n => n % 2 === 0); 

// reduce: serve para retornar apenas um valor, nesse caso soma todos os números
// "O resultado de uma iteração serve como entrada para a próxima iteração"
// os parametros são uma função com parâmetros (nessa ordem): valorAnterior, elemento, index
// podendo ser ocultado qualquer um dos itens do parenteses, desde que mantenha a ordem
// e além disso, pode ser passado um valor inicial, mas caso não haja valor inicial
// ele entende que o primeiro valor é o primeiro elemento e pula a primeira iteração
const somaTotal = numeros.reduce((acumulador, n) => acumulador + n, 0); 

// some: verifica se tem pelo menos um item que satisfaça o critério
// ele interrompe imediatamente ao encontrar o primeiro que satisfaz o critério
// every: é o contrário, achou um que não atende o critério, retorna false
const temPar = numeros.some((elem) => elem % 2 == 0);

// find: acha o primeiro elemento que satisfaz o critério e o retorna
// findIndex: faz a mesma coisa, mas retorna a posição e não o elemento
const primeiroPar = numeros.find((elem) => elem % 2 == 0);

// includes: verifica se tem um elemento específico
// é igual ao some, mas em vez de passar uma função, passa o elemento diretamente
const tem3 = numeros.includes(3);

// push: adiciona no final
// unshift: adiciona no inicio
// pop: remove do final
// shift: remove do inicio
// splice: remove uma determinada quantidade de elementos a partir de uma posição splice(posição, quantidade)