var books;
var dataSource;

$(document).ready(function () {
    $("#addDialog").hide();
    $.get("JsonData/Books.json", function (data, status) {
        books = data;

        dataSource = new kendo.data.DataSource({
            data: books,
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "BookId",
                    fields: {
                        Author: { type: "string" },
                        Title: { type: "string" },
                        ReleaseDate: { type: "date" },
                        ISBN: { type: "string" },
                        BookGenreId: { type: "number" },
                        Count: { type: "number" },
                    }
                }
            },
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: {
                refresh: true,
                input: true
            },
            sortable: true,
            height: 800,
            toolbar: "<button class='create' name='create' onclick='addBook()'>Add book</button>",
            columns: [
                "BookId",
                { field: "Author", title: "Author", width: "150px" },
                { field: "Title", title: "Title" },
                { field: "ReleaseDate", title: "Release Date", width: "220px" },
                { field: "ISBN", title: "ISBN", width: "120px" },
                { field: "BookGenreId", title: "Book Genre Id", width: "60px" },
                { field: "Count", title: "Count", width: "60px" },
                {
                    command: [
                        {
                            className: "btn-details",
                            name: "Details",
                            click: function (e) {
                                kendo.alert(e.target.text());
                            }
                        },
                        { name: "edit" }
                    ], title: "&nbsp;", width: "160px"
                }
            ],
            editable: "popup"
        });
    })
});

$("#dialog").kendoDialog({
    width: "550px",
    height: "500px",
    title: "Add new book",
    closable: true,
    modal: true,
    visible: false
});

var addDialog = $("#dialog").data("kendoDialog");

function addBook() {
    addDialog.content('<div id="addDialog"><style>#addContainer > label {min-width: 100px;height: 30px;font-weight: 500;} #addContainer > input {width: 170px;height: 30px;} #addContainer > span {color: red;height: 30px;font-size: 16px;font-weight: 500;margin-left: 5px;}</style><form novalidate><div id = "addContainer" style = "float:left; margin:5px; height:330px; padding:5px;" ><label>Author:</label><input id="addAuthor" type="text" required /><span id="errorAuthor" aria-live="polite"></span> <br /><label>Title:</label><input id="addTitle" type="text" required /><span id="errorTitle" aria-live="polite"></span> <br /><label>ReleaseDate:</label><input id="addReleaseDate" type="date" style="width:130px;" required /><span id="errorReleaseDate" aria-live="polite"></span> <br /><label>ISBN:</label><input id="addISBN" type="text" required /><span id="errorISBN" aria-live="polite"></span> <br /><label>BookGenreId:</label><input id="addBookGenreId" type="number" value="1" min="1" required><span id="errorBookGenreId" aria-live="polite"></span> <br /><label>Count:</label><input id="addCount" type="number" value="1" min="1" required /><span id="errorCount" aria-live="polite"></span> <br /></div ><div style="clear:both;"></div><div style="margin: 10px; float:left;"><a class="btn btn-success" style="margin:5px;" onclick="accept()">Accept</a><a class="btn btn-danger" style="margin:5px;" onclick="cancel()">Cancel</a></div></form ></div>');

    addDialog.open();
};

function accept() {

    dataSource.add({
        "BookId": books[books.length - 1].BookId + 1,
        "Author": $("#addAuthor").val(),
        "Title": $("#addTitle").val(),
        "ReleaseDate": $("#addReleaseDate").val(),
        "ISBN": $("#addISBN").val(),
        "BookGenreId": $("#addBookGenreId").val(),
        "Count": $("#addCount").val(),
        "AddDate": Date.now(),
        "ModifiedDate": Date.now()
    });

    /*const form = document.getElementsByTagName('form')[0];*/

    const author = document.getElementById('addAuthor');
    const authorError = document.getElementById('errorAuthor');

    const title = document.getElementById('addTitle');
    const titleError = document.getElementById('errorTitle');

    const releaseDate = document.getElementById('addReleaseDate');
    const releaseDateError = document.getElementById('errorReleaseDate');

    const ISBN = document.getElementById('addISBN');
    const ISBNError = document.getElementById('errorISBN');

    const bookGenreId = document.getElementById('addBookGenreId');
    const bookGenreIdError = document.getElementById('errorBookGenreId');

    const count = document.getElementById('addCount');
    const countError = document.getElementById('errorCount');

    author.addEventListener('input', function (event) {

        if (author.validity.valid) {
            authorError.textContent = '';
        } else {
            showAuthorError();
        }
    });

    title.addEventListener('input', function (event) {
        if (title.validity.valid) {
            titleError.textContent = '';
        } else {
            showTitleError();
        }

    });

    releaseDate.addEventListener('input', function (event) {

        if (releaseDate.validity.valid) {
            releaseDateError.textContent = '';
        } else {
            showReleaseDateError();
        }
    });

    ISBN.addEventListener('input', function (event) {

        if (ISBN.validity.valid) {
            ISBNError.textContent = '';
        } else {
            showISBNError();
        }
    });

    bookGenreId.addEventListener('input', function (event) {

        if (bookGenreId.validity.valid) {
            bookGenreIdError.textContent = '';
        } else {
            showBookGenreIdError();
        }
    });

    count.addEventListener('input', function (event) {

        if (count.validity.valid) {
            countError.textContent = '';
        } else {
            showCountError();
        }
    });

    function addDialogValidation() {

        var IsValid = true;

        if (!author.validity.valid) {
            showAuthorError();
            event.preventDefault();
            IsValid = false;
        } 

        if (!title.validity.valid) {
            showTitleError();
            event.preventDefault();
            IsValid = false;
        }

        if (!releaseDate.validity.valid) {
            showReleaseDateError();
            event.preventDefault();
            IsValid = false;
        }

        if (!ISBN.validity.valid) {
            showISBNError();
            event.preventDefault();
            IsValid = false;
        }

        if (!bookGenreId.validity.valid) {
            showBookGenreIdError();
            event.preventDefault();
            IsValid = false;
        }

        if (!count.validity.valid) {
            showCountError();
            event.preventDefault();
            IsValid = false;
        } 

        if(IsValid) {
            addDialog.close();
            books = dataSource.data();
        }
    }

    function showAuthorError() {
        if (author.validity.valueMissing) {
            authorError.textContent = 'You need to enter an Author.';
        } else if (author.validity.typeMismatch) {
            authorError.textContent = 'Entered value needs to be a string.';
        }
    }

    function showTitleError() {
        if (title.validity.valueMissing) {
            titleError.textContent = 'You need to enter a Title.';
        } else if (title.validity.typeMismatch) {
            titleError.textContent = 'Entered value needs to be a string';
        }
    }

    function showReleaseDateError() {
        if (releaseDate.validity.valueMissing) {
            releaseDateError.textContent = 'You need to enter a Release Date.';
        } else if (releaseDate.validity.typeMismatch) {
            releaseDateError.textContent = 'Entered value needs to be a date';
        }
    }

    function showISBNError() {
        if (ISBN.validity.valueMissing) {
            ISBNError.textContent = 'You need to enter an ISBN.';
        } else if (ISBNE.validity.typeMismatch) {
            ISBNError.textContent = 'Entered value needs to be a string';
        }
    }

    function showBookGenreIdError() {
        if (bookGenreId.validity.valueMissing) {
            bookGenreIdError.textContent = 'You need to enter a Book Genre Id.';
        } else if (bookGenreId.validity.typeMismatch) {
            bookGenreIdError.textContent = 'Entered value needs to be a number';
        }
    }

    function showCountError() {
        if (count.validity.valueMissing) {
            countError.textContent = 'You need to enter a Count.';
        } else if (count.validity.typeMismatch) {
            countError.textContent = 'Entered value needs to be a number';
        } else if (count.validity.rangeUnderflow) {
            countError.textContent = 'Entered value needs to be positive';
        }
    }

    addDialogValidation();
}

function cancel() {
    addDialog.close();
}

