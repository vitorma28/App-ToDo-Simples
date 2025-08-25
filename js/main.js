// Obtendo algumas tags

const exitViewerBtn = document.getElementsByClassName('view-btn-exit')[0];
const addTaskBtn = document.getElementsByClassName('create-btn')[0];
const saveBtn = document.getElementsByClassName('view-btn-save')[0];

let tasksObj = localStorageToObj();

loadObjToHTML();

addTaskBtn.addEventListener('click', toggleViewer);
exitViewerBtn.addEventListener('click', toggleViewer);

saveBtn.addEventListener('click', function () {
    if (saveBtn.innerHTML == 'Criar') {
        createTask();
    }
    else {
        editTask();
    }
});


// Visualizar/ocultar editor de tarefas
function toggleViewer(event) {
    // Obtém a lista recente de deveres.
    const quests = document.getElementsByClassName('quest');
    
    // tag do editor.
    const viewer = document.getElementsByClassName('view-section-container')[0];

    // Obtém o conteúdo atualizado dos valores de editor.
    const viewerTitle = viewer.getElementsByClassName('view-title')[0];
    const viewerDesc = viewer.getElementsByClassName('view-description')[0];
    const viewerKey = viewer.getElementsByClassName('view-key')[0];
    
    // Toda vez que a função é ativada:
    // O editor troca: Ativo/Inativo.
    viewer.classList.toggle('hidden');
    viewer.classList.toggle('visible');

    // noAction -> Ativado quando a função é chamada
    // pelo fechamento da janela. (como clicar em salvar).
    // Evita erros com 'undefined' e 
    if (event.noAction ?? false) { // Operador: coaliscência nula.
        return;
    }

    // Verificar se quem chamou foi o botão de criar tarefa.
    if (event.target.classList.contains('create-btn')) {
        // Troca o título do botão de salvamento.
        saveBtn.innerHTML = 'Criar';

        // Zera os campos do editor para serem preenchidos.
        viewerTitle.value = '';
        viewerDesc.value = '';
        viewerKey.innerHTML = '';
    }
    // Verifica se quem chamou foi a visualização de uma pendência.
    else if (event.target.classList.contains('quest-btn-view')) {
        // Troca o título do botão de salvamento.
        saveBtn.innerHTML = 'Editar e salvar';

        // Chave do afazer atual.
        const thisKey = event.target.getAttribute('data-key');
        
        for (const i in quests) {
            const current = quests[i];

            if (current.getAttribute('data-key') == thisKey) {
                // Carrega as informações do dever atual nos campos do editor.
                viewerTitle.value = current.getElementsByClassName('quest-title')[0].innerHTML.trim();
                viewerDesc.value = current.getElementsByClassName('quest-description')[0].innerHTML.trim();
                viewerKey.innerHTML = current.getAttribute('data-key');

                break;
            }
        }
    }
}



