// Remoção de tarefas
function deleteTask(event) {
    // Obtém as tarefas atuais e placeholder de atividades.
    const quests = document.getElementsByClassName('quest');
    const spacer = document.getElementsByClassName('spacer')[0];

    // Pega o elemento (botão) que chamou o evento.
    const element = event.target;

    // Pega a chave a ser buscada
    const key = element.getAttribute('data-key');
    
    // Busca na lista de afazeres pela chave correspondente.
    for (const i in [...quests]) {
        const currElement = quests[i];
        const elementKey = currElement.getAttribute('data-key');

        if (elementKey == key) {
            // Ativa animação de 'Arrastar para a direita'.
            currElement.classList.add('removing-shift');

            // Aguarda 500ms e apaga o elemento.
            setTimeout(() => {
                currElement.remove();
                deleteFromObj(key); // Remove do objeto também
                
                if ([...quests].length == 0) {
                    spacer.classList.remove('invisible');
                }
            }, 500);
            
            break;
        }
    }

}