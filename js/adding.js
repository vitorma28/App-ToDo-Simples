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

    const newQuest = document.createElement('div');

    newQuest.className = 'quest';
    newQuest.setAttribute('data-key', task.key);

    newQuest.innerHTML = `
        <div class="quest-title">${task.title}</div>
        <div class="quest-btns">
            <button class="quest-btn-view" data-key="${task.key}">Visualizar</button>
            <button class="quest-btn-del" data-key="${task.key}">Remover</button>
        </div>
        <div class="hidden quest-description">${task.description}</div>
    `;

    questlist.appendChild(newQuest);

    const quests = document.getElementsByClassName('quest');

    for (const i in [...quests]) {
        const current = quests[i];

        if (current.getAttribute('data-key') == task.key) {
            current.getElementsByClassName('quest-btn-view')[0].addEventListener('click', toggleViewer);
            current.getElementsByClassName('quest-btn-del')[0].addEventListener('click', confirmDeleting);

            break;
        }
    }

    if (!title) {
        toggleViewer({ noAction: true });
    }
}
