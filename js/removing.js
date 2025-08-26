// Remoção de tarefas
function deleteTask(key) {
    // Obtém as tarefas atuais e placeholder de atividades.
    const quests = document.getElementsByClassName('quest');
    const spacer = document.getElementsByClassName('spacer')[0];
    
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

function confirmDeleting(event) {
    const confirmationWindowContainer = document.getElementsByClassName('alert-remove-container')[0];
    const confirmationWindow = document.getElementsByClassName('alert-remove')[0];

    confirmationWindowContainer.classList.toggle('dark-ground');
    confirmationWindowContainer.classList.toggle('none-ground');
    confirmationWindow.classList.toggle('visible');
    confirmationWindow.classList.toggle('invisible');

    if (event.target.classList.contains('cancel-remove')) {
        return;
    }

    const deletingKey = confirmationWindowContainer.getElementsByClassName('deleting-key')[0];

    if (event.target.classList.contains('quest-btn-del')) {
        deletingKey.innerHTML = event.target.getAttribute('data-key');

        return;
    }

    deleteTask(deletingKey.innerHTML);
}
