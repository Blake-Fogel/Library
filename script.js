const myLibrary = new Map();
const tableBody = document.querySelector('tbody');
const openDButton = document.querySelector('#open-dialog');
const dialog = document.querySelector('dialog');
dialog.addEventListener('close',(event) => {
    let tempData = new FormData(form);
    if (form.checkValidity() && dialog.returnValue==='confirm') {
        addDialogBookToLibrary(tempData);
    }
    form.reset();
});
const dialogButton = document.querySelector('#submit-dialog');
const form = document.querySelector('form');
const stringInputs = document.querySelectorAll('.StringInput');
stringInputs.forEach(element => {
    element.addEventListener('input', (event) => {
        if (element.validity.patternMismatch) {
            element.setCustomValidity("Enter a string that contains letters/numbers");
        } else {
            element.setCustomValidity("");
        }
    })
});
const numberInput = document.querySelector('.NumberInput');
numberInput.addEventListener('input', (event) => {
    if (numberInput.validity.rangeUnderflow || numberInput.validity.rangeOverflow) {
        numberInput.setCustomValidity("Enter a number 1-10,000");
    } else {
        numberInput.setCustomValidity("");
    }
})
document.querySelector('body > button').addEventListener('click',() => {
    document.querySelector('dialog').showModal();
});
class Book {
    constructor(author,title,finishedReading,pageAmount) {
        this.author = author;
        this.title = title;
        this.finishedReading = finishedReading;
        this.pageAmount = pageAmount;
        this.id = crypto.randomUUID();
    }
}

function addBookToLibrary(author,title,finishedReading,pageAmount) {
    let book = new Book(author,title,finishedReading,pageAmount);
    myLibrary.set(book.id,book);
    addBookToLibraryTable(book);
}
function addDialogBookToLibrary(data) {
    addBookToLibrary(data.get('Author'),data.get('Title'),(data.get('Finished')!==null ? 'true' : false),data.get('PageCount'));
}
function addBookToLibraryTable(book) {
    let row = tableBody.insertRow();
    for (const propertyName in book) {
        if (propertyName==='finishedReading') {
            let td = row.insertCell();
            td.style.verticalAlign = 'center';
            td.style.textAlign = 'center';
            let checkBox = document.createElement('input');
            checkBox.checked = book.finishedReading;
            checkBox.type = 'checkbox';
            checkBox.addEventListener('change', (event) => {
               book.finishedReading = checkBox.checked;
            });
            td.appendChild(checkBox);
        } else {
            let td = row.insertCell();
            td.innerText=book[propertyName];   
        }
    }
    let td = row.insertCell();
    let button = document.createElement('button');
    button.style.display = 'grid';
    button.style.alignItems = 'center';
    button.style.justifyItems = 'center';
    button.innerText = 'Delete';
    td.appendChild(button);
    button.addEventListener('click', (event) => {
        myLibrary.delete(book.id);
        refreshTable();
    })
}
function clearLibraryTable() {
    tableBody.innerHTML = '';
}
function displayLibrary() {
    for (const book of myLibrary) {
        addBookToLibraryTable(book);
    }
}
function refreshTable() {
    clearLibraryTable();
    displayLibrary();
}
addBookToLibrary('test','testing',true,8153);
