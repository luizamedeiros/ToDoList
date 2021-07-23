var btnAdd = document.getElementById('btnAdd');
var btnDel = document.getElementsByClassName('btnDelItem');
var inputItem = document.getElementById("inputItem");
var list = document.getElementById("taskList");
var listItemsArray = [];
var listContainer = document.querySelector(".list-container");

window.onload = function() {
    var localStorageItems = JSON.parse(localStorage.getItem('listaDeItens'));
    listItemsArray = localStorageItems ? localStorageItems : [];
    console.log(listItemsArray);
    if (listItemsArray) {
        listItemsArray.forEach(showItems);
    }
}

function addItemToList() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' às ' + today.getHours() + ":" + today.getMinutes() + '.';
    var txtInput = inputItem.value;
    listItemsArray.push({ 'valor': txtInput, 'checkboxAtivo': false, 'date': date });
    localStorage.setItem('listaDeItens', JSON.stringify(listItemsArray));
    inputItem.value = "";
    showItems({ 'valor': txtInput, 'checkboxAtivo': false }, listItemsArray.length - 1);
}

function showItems(data, index) {
    var task = document.createElement('li');
    task.setAttribute("id", `todo${index}`);
    task.setAttribute("draggable", "true");
    task.setAttribute("ondragstart", "drag(event)");
    task.setAttribute("class", "draggable")
    var taskDescription = `<input class="checkboxes" type="checkbox" onChange="defineCheckbox(${index})" 
                            ${data.checkboxAtivo? "checked":""} >
                            <span class="btnDelItem" onClick="delItemFromList(${index})">&#128465;
                            </span>
                            <label class="checkedLabel"for="todo${index}">${data.valor}</label>
                            <p class = "dateAdded"> Adicionado em ${data.date}</p>`;
    task.innerHTML = taskDescription;
    list.appendChild(task);
}

function delItemFromList(index) {
    if (confirm("Você quer mesmo deletar esse item? Não poderá recuperá-lo depois!")) {
        listItemsArray.splice(index, 1);
        var element = document.getElementById(`todo${index}`);
        element.remove();
        refreshList();

    }
}

function deleteAll() {
    if (listItemsArray < 1) {
        window.alert("Não há itens para apagar!");
    } else {
        if (confirm("Você quer apagar todos os itens? Não poderá recuperá-los depois!")) {
            listItemsArray = [];
            refreshList();
        }
    }
}

function defineCheckbox(index) {
    listItemsArray[index].checkboxAtivo = !listItemsArray[index].checkboxAtivo;
    localStorage.setItem('listaDeItens', JSON.stringify(listItemsArray));

}

function refreshList() {
    localStorage.setItem('listaDeItens', JSON.stringify(listItemsArray));
    list.innerHTML = '';
    listItemsArray.forEach(showItems);
}

function returnItemsLeft() {
    return listItemsArray.length;
}

const dragAndDropArea = document.getElementById("taskList");
new Sortable(dragAndDropArea, {
    animation: 150
});