let board = document.querySelector(".board");
let btnCreateColumn = document.querySelector(".btn-create-column");

let cardSelected = null;
let btnAddCardClicked = null;
let columnNameClicked = null;
let cardClicked = null;
let columnClicked = null;

let backgroundCover = document.querySelector(".background-cover");
let divNewCard = document.querySelector(".div-create-new-card");
let divNewColumn = document.querySelector(".div-create-new-column");
let divEditColumn = document.querySelector(".div-edit-column-name");
let divEditCard = document.querySelector(".div-edit-card-name");
let divDeleteCard = document.querySelector(".div-delete-card");
let divDeleteColumn = document.querySelector(".div-delete-column");

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

    closeBackgroundCover();

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

    closeBackgroundCover();

    document.querySelector("#input-new-card").value = "";
    saveData();
}

function editColumnName(){
    let newName = document.querySelector("#input-edit-column").value;
    columnNameClicked.innerText = newName;
    closeBackgroundCover();
    saveData();
}

function editCardName(){
    let newName = document.querySelector("#input-edit-card").value;
    cardClicked.innerText = newName;
    cardClicked.innerHTML += `<span class="btn-card-delete">X</span>`;
    closeBackgroundCover();
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
            saveData();
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

function deleteCard(){
    cardClicked.parentNode.remove();
    saveData();
    closeBackgroundCover();
}

function deleteColumn(){
    columnClicked.parentNode.remove();
    saveData();
    closeBackgroundCover();
}

function updateBtnDeleteCardList(){
    let btnDeleteList = document.querySelectorAll(".btn-card-delete");

    btnDeleteList.forEach(b => {
        b.onclick = (event) => {
            cardClicked = event.target;
            showDivDeleteCard();
        }
    });
}

function updateBtnDeleteColumnList(){
    let btnDeleteList = document.querySelectorAll(".btn-column-delete");

    btnDeleteList.forEach(b => {
        b.onclick = (event) => {
            columnClicked = event.target;
            showDivDeleteColumn();
        }
    });
}

function updateColumnCardsList() {
    let columnCardsList = document.querySelectorAll(".column-cards");

    columnCardsList.forEach(c => {
        c.addEventListener("dragenter", (event) => {
            
            if (event.target.classList.contains("column-cards")) {
                event.target.appendChild(cardSelected);
            }
        });

        c.addEventListener("drop", (event) => {
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
    divEditColumn.classList.remove("d-none");
}

function showDivNewCard() {
    backgroundCover.classList.remove("d-none");
    divNewCard.classList.remove("d-none");
}

function showDivNewColumn() {
    backgroundCover.classList.remove("d-none");
    divNewColumn.classList.remove("d-none");
}

function showDivDeleteCard(){
    backgroundCover.classList.remove("d-none");
    divDeleteCard.classList.remove("d-none");
}

function showDivDeleteColumn(){
    backgroundCover.classList.remove("d-none");
    divDeleteColumn.classList.remove("d-none");
}

function closeBackgroundCover() {
    backgroundCover.classList.add("d-none");
    divNewCard.classList.add("d-none");
    divNewColumn.classList.add("d-none");
    divEditColumn.classList.add("d-none");
    divEditCard.classList.add("d-none");
    divDeleteCard.classList.add("d-none");
    divDeleteColumn.classList.add("d-none");
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