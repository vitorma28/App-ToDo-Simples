// Edição de tarefas
function editTask() {
    // tag do editor.
    const viewer = document.getElementsByClassName('view-section-container')[0];
    
    // Pega os elementos do viewer atualizados.
    const viewerTitle = viewer.getElementsByClassName('view-title')[0];
    const viewerDesc = viewer.getElementsByClassName('view-description')[0];
    const viewerKey = viewer.getElementsByClassName('view-key')[0];

    // Obtém a lista recente de deveres.
    const quests = document.getElementsByClassName('quest');

    // Busca um a um pelo correspondente à chave.
    for (const i in tasksObj.quests) {
        const currentQuest = tasksObj.quests[i];

        if (currentQuest.key == viewerKey.innerHTML) {
            // Substitui título e descrição.
            currentQuest.title = viewerTitle.value;
            currentQuest.description = viewerDesc.value;

            objToLocalStorage();
            break;
        }
    }

    // Atualiza no HTML também.
    // Busca um a um no HTML pela chave.
    for (const i in quests) {
        const current = quests[i];

        if (current.getAttribute('data-key') == viewerKey.innerHTML) {
            // Substitui título e descrição.
            current.getElementsByClassName('quest-title')[0].innerHTML = viewerTitle.value;
            current.getElementsByClassName('quest-description')[0].innerHTML = viewerDesc.value;
            
            break;
        }
    }


    // Tirar editor de tarefas.
    toggleViewer({ noAction: true });
}