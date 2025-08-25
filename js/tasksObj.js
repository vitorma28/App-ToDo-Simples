// Funções de integração taskObj-localStorage.


// Armazena o objeto de tarefas no localStorage.
function objToLocalStorage() {
    localStorage.setItem('myapptodo_quests', JSON.stringify(tasksObj));
}





// Carrega o objeto armazenado no localStorage.
function localStorageToObj() {
    // Se a chave não existir, define-se um objeto por padrão.

    // Objeto-padrão.
    const defaultObj = {
        nextKey: 0,
        quests: []
    };

    const tasksJSON = localStorage.getItem('myapptodo_quests');

    // Se tasksJSON != null
    if (tasksJSON) {
        return JSON.parse(tasksJSON);
    }
    else return defaultObj
}





// Carrega todas as tarefas no objeto para a lista no HTML.
function loadObjToHTML() {
    // Pega as tarefas do objeto e transforma em HTML.
    for (const quest of tasksObj.quests) {
        createTask(quest.title, quest.description, quest.key);
    }

    // Depois de ter gerado o HTML
    // obtém os botões de 'Visualizar' e 'Remover'.
    const viewBtns = document.getElementsByClassName('quest-btn-view');
    const delBtns = document.getElementsByClassName('quest-btn-del');

    // Então atribui a cada botão seus respectivos eventos.
    for (const btn of [...viewBtns]) {
        btn.addEventListener('click', toggleViewer);
    }

    for (const btn of [...delBtns]) {
        btn.addEventListener('click', deleteTask);
    }
}





// Salva uma tarefa no objeto.
// Obs: Salva automaticamente do localStorage.
function saveInObj(task) {
    tasksObj.quests.push(task);

    // Salva no localStorage.
    objToLocalStorage();
}





// Remove elemento do objeto de acordo com a chave.
// Obs: Salva automaticamente do localStorage.
function deleteFromObj(key) {
    // Procura uma a uma por uma tarefa com a mesma chave.
    // Quando achar, remove-a.
    for (const i in tasksObj.quests) {
        if (tasksObj.quests[i].key == key) {
            tasksObj.quests.splice(i, i + 1);
        }
    }

    // Salva no localStorage.
    objToLocalStorage();
}





// Cria objeto de tarefa
function defTask(title, description) {
    return {
        title,
        description,
        key: tasksObj.nextKey++ // Aumenta automaticamente a próxima chave.
    };
}
