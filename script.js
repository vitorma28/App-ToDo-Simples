const viewBtns = document.getElementsByClassName('quest-btn-view');
const delBtns = document.getElementsByClassName('quest-btn-del');
const quests = document.getElementsByClassName('quest');
const questlist = document.getElementsByClassName('questlist')[0];
const spacer = document.getElementsByClassName('spacer')[0];

const viewer = document.getElementsByClassName('view-section-container')[0];
const exitViewerBtn = document.getElementsByClassName('view-btn-exit')[0];
const addTaskBtn = document.getElementsByClassName('create-btn')[0];
const saveBtn = viewer.getElementsByClassName('view-btn-save')[0];


const viewerTitle = viewer.getElementsByClassName('view-title')[0];
const viewerDesc = viewer.getElementsByClassName('view-description')[0];
const viewerKey = viewer.getElementsByClassName('view-key')[0];

let tasksObj = localStorageToObj();

loadObjToHTML();


for (const btn of [...viewBtns, exitViewerBtn, addTaskBtn]) {
    btn.addEventListener('click', toggleViewer);
}

for (const btn of delBtns) {
    btn.addEventListener('click', deleteTask);
}

saveBtn.addEventListener('click', function () {
    if (saveBtn.innerHTML == 'Criar') {
        createTask();
    }
    else {
        editTask();
    }
});


function deleteTask(event) {
    const quests = document.getElementsByClassName('quest');
    const element = event.target;

    const key = element.getAttribute('data-key');
    
    for (const i in [...quests]) {
        const currElement = quests[i];
        const elementKey = currElement.getAttribute('data-key');
        if (elementKey == key) {
            currElement.classList.add('removing-shift');
            setTimeout(() => {
                currElement.remove();
                deleteFromObj(key);
                
                if ([...document.getElementsByClassName('quest')].length == 0) {
                    document.getElementsByClassName('spacer')[0].classList.remove('invisible');
                }
            }, 500);
            break;
        }
    }

}


function toggleViewer(event) {
    viewer.classList.toggle('hidden');
    viewer.classList.toggle('visible');

    if (event.noAction ?? false) {
        return;
    }

    if (event.target.classList.contains('create-btn')) {
        saveBtn.innerHTML = 'Criar';

        viewerTitle.value = '';
        viewerDesc.value = '';
        viewerKey.innerHTML = '';
    }
    else if (event.target.classList.contains('quest-btn-view')) {
        saveBtn.innerHTML = 'Editar e salvar';

        const thisKey = event.target.getAttribute('data-key');
        
        for (const i in quests) {
            if (quests[i].getAttribute('data-key') == thisKey) {
                viewerTitle.value = quests[i].getElementsByClassName('quest-title')[0].innerHTML.trim();
                viewerDesc.value = quests[i].getElementsByClassName('quest-description')[0].innerHTML.trim();
                viewerKey.innerHTML = quests[i].getAttribute('data-key');
                break;
            }
        }
    }
}


function editTask() {
    for (const i in tasksObj.quests) {
        if (tasksObj.quests[i].key == viewerKey.innerHTML) {
            tasksObj.quests[i].title = viewerTitle.value;
            tasksObj.quests[i].description = viewerDesc.value;
            objToLocalStorage();
            break;
        }
    }

    const quests = document.getElementsByClassName('quest');

    for (const i in [...quests]) {
        if (quests[i].getAttribute('data-key') == viewerKey.innerHTML) {
            quests[i].getElementsByClassName('quest-title')[0].innerHTML = viewerTitle.value;
            quests[i].getElementsByClassName('quest-description')[0].innerHTML = viewerDesc.value;
            break;
        }
    }



    toggleViewer({ noAction: true });
}


function createTask(title = null, description = null, key = null) {
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


function defTask(title, description) {
    return {title, description, key: tasksObj.nextKey++};
}


function objToLocalStorage() {
    localStorage.setItem('myapptodo_quests', JSON.stringify(tasksObj));
}


function loadObjToHTML() {
    for (const quest of tasksObj.quests) {
        createTask(quest.title, quest.description, quest.key);
    }
}


function localStorageToObj() {
    return JSON.parse(localStorage.getItem('myapptodo_quests') ?? '{"nextKey": 0, "quests": []}');
}


function saveInObj(task) {
    tasksObj.quests.push(task);

    objToLocalStorage();
}


function deleteFromObj(key) {
    for (const i in tasksObj.quests) {
        if (tasksObj.quests[i].key == key) {
            tasksObj.quests.splice(i, i + 1);
        }
    }

    objToLocalStorage();
}
