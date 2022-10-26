let board = document.querySelector(".board");
let btnCreateColumn = document.querySelector(".btn-create-column");

let cardSelected = null;
let btnAddCardClicked = null;
let columnNameClicked = null;
let cardClicked = null;

let backgroundCover = document.querySelector(".background-cover");
let divCard = document.querySelector(".div-create-new-card");
let divColumn = document.querySelector(".div-create-new-column");
let divColumnName = document.querySelector(".div-edit-column-name");

//------------------------------

function createColumn() {
    let columnName = document.querySelector("#input-new-column").value;

    let newColumn = document.createElement("div");
    newColumn.classList.add("column");
    newColumn.innerHTML += `
    <span class="btn-column-delete">X</span>
    <p class="column-name">${columnName}</p>            
    <div class="column-cards"></div>        
    <button class="btn-add-card">Adicionar cartão</button>`;

    board.insertBefore(newColumn, board.children[board.children.length - 1]);

    updateColumnCardsList();
    updateBtnAddCardList();
    updateColumnNameList();
    updateBtnDeleteColumnList();

    closeDiv("column");

    document.querySelector("#input-new-column").value = "";
    saveData();
}

function createCard() {
    let cardName = document.querySelector("#input-new-card").value;
    let newCard = `
            <div draggable="true" class="card">
                ${cardName}

                <span class="btn-card-delete">X</span>
            </div>`;

    let cardsEl = btnAddCardClicked.previousElementSibling;
    cardsEl.innerHTML += newCard;

    updateCardList();
    updateBtnDeleteCardList()

    closeDiv("card");

    document.querySelector("#input-new-card").value = "";
    saveData();
}

function editColumnName(){
    let newName = document.querySelector("#input-edit-column").value;
    columnNameClicked.innerText = newName;
    closeDiv("editColumName");
    saveData();
}

function editCardName(){
    let newName = document.querySelector("#input-edit-card").value;
    cardClicked.innerText = newName;
    cardClicked.innerHTML += `<span class="btn-card-delete">X</span>`;
    closeDiv("editCardName");
    updateBtnDeleteCardList();
    saveData();
}

//------------------------------

function updateCardList() {
    let cardList = document.querySelectorAll(".card");

    cardList.forEach(c => {
        c.addEventListener("dragstart", (event) => {
            c.classList.add("selected");
            cardSelected = event.target;
        });

        c.addEventListener("dragend", (event) => {
            c.classList.remove("selected");
        });

        c.ondblclick = (event) => {
            cardClicked = event.target;
            showDivEditCard();
            let text = event.target.innerText;
            text = text.slice(0, text.length - 1);
            document.querySelector("#input-edit-card").value = text;
        }
    });
}

function updateBtnDeleteCardList(){
    let btnDeleteList = document.querySelectorAll(".btn-card-delete");

    btnDeleteList.forEach(b => {
        b.onclick = (event) => {
            event.target.parentNode.remove();
            saveData();
        }
    });
}

function updateBtnDeleteColumnList(){
    let btnDeleteList = document.querySelectorAll(".btn-column-delete");

    btnDeleteList.forEach(b => {
        b.onclick = (event) => {
            event.target.parentNode.remove();
            saveData();
        }
    });
}

function updateColumnCardsList() {
    let columnCardsList = document.querySelectorAll(".column-cards");

    columnCardsList.forEach(c => {
        c.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);

        c.addEventListener("dragenter", (event) => {
            if (event.target.classList.contains("column-cards")) {
                event.target.appendChild(cardSelected);
            }
        });

        c.addEventListener("drop", (event) => {
            event.preventDefault();

            if (event.target.classList.contains("column-cards")) {
                cardSelected.parentNode.removeChild(cardSelected);
                event.target.appendChild(cardSelected);
            }
        });
    });
}

function updateBtnAddCardList() {
    let btnAddCardList = document.querySelectorAll(".btn-add-card");

    btnAddCardList.forEach(b => {
        b.onclick = (event) => {
            btnAddCardClicked = event.target;
            showDivNewCard();
        };
    });
}

function updateColumnNameList(){
    let columnNameList = document.querySelectorAll(".column-name");

    columnNameList.forEach(n => {
        n.ondblclick = (event) => {
            columnNameClicked = event.target;
            document.querySelector("#input-edit-column").value = event.target.innerText;
            showDivEditColumn();
        };
    });
}

//------------------------------

function showDivEditCard(){
    backgroundCover.classList.remove("d-none");
    document.querySelector(".div-edit-card-name").classList.remove("d-none");
}

function showDivEditColumn(){
    backgroundCover.classList.remove("d-none");
    divColumnName.classList.remove("d-none");
}

function showDivNewCard() {
    backgroundCover.classList.remove("d-none");
    divCard.classList.remove("d-none");
}

function showDivNewColumn() {
    backgroundCover.classList.remove("d-none");
    divColumn.classList.remove("d-none");
}

function closeDiv(name) {
    backgroundCover.classList.add("d-none");

    if (name == "card") {
        divCard.classList.add("d-none");
    } else if (name == "column") {
        divColumn.classList.add("d-none");
    } else if(name == "editColumName"){
        document.querySelector(".div-edit-column-name").classList.add("d-none");
    } else if(name == "editCardName"){
        document.querySelector(".div-edit-card-name").classList.add("d-none");
    }
}

function saveData(){
    localStorage.setItem("dl-miniTrello", board.innerHTML);
}

function getData(){
    if(localStorage.getItem("dl-miniTrello")){
        board.innerHTML = localStorage.getItem("dl-miniTrello");
    }else{
        console.log("Nenhum dado encontrado...");
    }
}

//------------------------------
getData();

updateCardList();
updateColumnCardsList();
updateBtnAddCardList();
updateColumnNameList();
updateBtnDeleteCardList();
updateBtnDeleteColumnList();