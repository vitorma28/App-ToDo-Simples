// Criação de tarefas
function createTask(title = null, description = null, key = null) {
    // Tag pai das quests.
    const questlist = document.getElementsByClassName('questlist')[0];
    
    // tag do editor.
    const viewer = document.getElementsByClassName('view-section-container')[0];
    
    const viewerTitle = viewer.getElementsByClassName('view-title')[0];
    const viewerDesc = viewer.getElementsByClassName('view-description')[0];

    const spacer = document.getElementsByClassName('spacer')[0];
    
    if (!spacer.classList.contains('invisible')) {
        spacer.classList.add('invisible');
    }

    let task;

    if (!title) {
        if (!(viewerTitle.value && viewerDesc.value)) {
            alert('Título ou descrição vazios.');
            return;
        }

        task = defTask(viewerTitle.value, viewerDesc.value);
        viewerTitle.value = '';
        viewerDesc.value = '';
        saveInObj(task);
    }
    else {
        task = {
            title,
            description,
            key
        };
    }

    questlist.innerHTML += `
<div class="quest" data-key="${task.key}">
    <div class="quest-title">${task.title}</div>
    <div class="quest-btns">
        <button class="quest-btn-view" data-key="${task.key}">Visualizar</button>
        <button class="quest-btn-del" data-key="${task.key}">Remover</button>
    </div>
    <div class="true-hidden quest-description">${task.description}</div>
</div>  
`
    ;

    const actual_quests = document.getElementsByClassName('quest');

    for (const i in [...actual_quests]) {
        if (actual_quests[i].getAttribute('data-key') == task.key) {
            actual_quests[i].getElementsByClassName('quest-btn-view')[0].addEventListener('click', toggleViewer);
            actual_quests[i].getElementsByClassName('quest-btn-del')[0].addEventListener('click', deleteTask);
        }
    }

    if (!title) {
        toggleViewer({ noAction: true });
    }
}