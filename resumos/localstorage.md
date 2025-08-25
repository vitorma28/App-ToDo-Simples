# localStorage

## Conceito

localStorage é uma forma de armazenar informações no navegador de forma que elas persistam mesmo após o site ser fechado. Neste pequeno projeto, localStorage é usado para armazenar as tarefas, pois não queremos que elas sejam 'esquecidas' pelo computador assim que fecharmos a aba.

## Funções

O localStorage armazena as informações como um objeto, definindo-as em pares de chave-valor. Dessa forma, é possível nomear as informações guardadas, como uma variável, o nome que guarda a informação se chama 'chave'.

Existem duas funções principais que serão utilizadas: `getItem` e `setItem`.

`getItem` - Obtém o valor armazenado no localStorage com base na chave passada como parâmetro

`setItem` - Define ou altera um valor armazenado ao passar o nome da chave e o valor como parâmetros.

## Exemplos

`localStorage.setItem('name', 'John');` -> Define a chave `name` com o valor `John`.

`localStorage.getitem('name');` -> Retorna o valor da chave `name`: `John`.
