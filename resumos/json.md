# JSON

## Conceito

É uma forma de armazenar informações em strings, tornando capaz colocá-las em arquivos ou, neste caso, no localStorage.

## Funções

Em JavaScript, utiliza-se o objeto `JSON` para manipular JSON. Nele, há 2 funções:

`parse` - Transforma uma string JSON em um objeto JavaScript.

`stringify` - Transforma um objeto JavaScript em uma string JSON.

## Exemplos

`JSON.parse('{"age": 53}');` -> retorna o objeto da string: {age: 53}.

`JSON.stringify( {age: 53} );` -> retorna a string contendo o objeto: '{"age": 53}'.
