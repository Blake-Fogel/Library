const myLibrary = [];
const tableBody = document.querySelector('tbody');
function Book(author,title,finishedReading,pageAmount) {
    if (!new.target) {
        throw Error("this is a constructor");
    }
    this.author = author;
    this.title = title;
    this.finishedReading = finishedReading;
    this.pageAmount = pageAmount;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(author,title,finishedReading,pageAmount) {
    let book = new Book(author,title,finishedReading,pageAmount);
    myLibrary.push(book);
}
function addBookToLibraryTable(book) {
    let row = tableBody.insertRow();
    for (const property of Object.values(book)) {
        let td = row.insertCell();
        td.innerText=property;
    }
    tableBody.appendChild(row);
}
function displayLibrary() {
    for (const book of myLibrary) {
        addBookToLibraryTable(book);
    }
}
addBookToLibrary('test','testing',true,8153);

displayLibrary();
