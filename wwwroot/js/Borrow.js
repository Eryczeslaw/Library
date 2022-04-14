var dataSourceBooks;
var dataSourceUsers;
var users;
var books;

$(document).ready(function () {
    $.get("JsonData/UsersWithoutAllBooks.json", function (data) {
        users = data;
    });

    $.get("JsonData/BorrowedBooks.json", function (data) {

        dataSourceBooks = new kendo.data.DataSource({
            data: data,
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "BookId",
                    fields: {
                        Author: { type: "string" },
                        Title: { type: "string" },
                        ReleaseDate: { type: "date" },
                    }
                }
            },
        });

        $("#gridBooks").kendoGrid({
            dataSource: dataSourceBooks,
            pageable: {
                input: true
            },
            sortable: true,
            height: 700,
            columns: [
                { field: "Author", title: "Author", width: "160px" },
                { field: "Title", title: "Title" },
            ],
        });
    })

    $.get("JsonData/UsersWithBooks.json", function (data) {

        dataSourceUsers = new kendo.data.DataSource({
            data: data,
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "UserId",
                    fields: {
                        FirstName: { type: "string" },
                        LastName: { type: "string" },
                        Email: { type: "string" },
                    }
                }
            },
        });

        $("#gridUsers").kendoGrid({
            dataSource: dataSourceUsers,
            pageable: {
                input: true
            },
            sortable: true,
            height: 700,
            columns: [
                { field: "FirstName", title: "FirstName", width: "150px" },
                { field: "LastName", title: "LastName", width: "150px" },
                { field: "Email", title: "Email" },
            ],
        });
    })
});

$("#dialogAdd").kendoDialog({
    width: "600px",
    height: "550px",
    title: "Add borrow",
    closable: true,
    modal: true,
    visible: false
});

var addDialog = $("#dialogAdd").data("kendoDialog");

function addBorrow() {
    addDialog.content('<style> #dialogContainer > div > label {min-width: 50px; height: 30px; margin-top:15px; font-weight:700;} #dialogContainer > div > select {min-width: 180px; height: 30px; margin:5px; padding:5px;} </style ><div id="dialogContainer" style="margin:5px; height:380px; padding:5px;"><div id="Author" style="margin:5px;" ></div><div id="Books" style="margin:5px;"><div id="Book1"></div></div><div><button id="addNext" style="margin:5px;" onclick="addNext()">Add next</button></div></div><div style="clear:both;"> </div> <div style="margin: 10px; float:left;"><a class="btn btn-success btn-lg text-white" style="margin:5px;" onclick="acceptAdd()">Accept</a><a class="btn btn-danger btn-lg text-white" style="margin:5px;" onclick="cancel()">Cancel</a></div>');
    addDialog.open();

    var author = '<label>User:</label><select id="author">';
    for (var i = 0; i < users.length; i++) {
        author += '<option value=' + users[i].UserId + '>' + users[i].FirstName + ' ' + users[i].LastName + '</option>';
    }
    author += '</select>';

    $('#Author').html(author);

    let authorSelect = document.querySelector('#author');

    $.ajax({
        type: "POST",
        url: "/Borrow/Index?handler=SetAvailableBooks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: authorSelect.value,
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
    })
        .always(function () {
            getBooks();
        });

    authorSelect.addEventListener("change", function (event) {

        $.ajax({
            type: "POST",
            url: "/Borrow/Index?handler=SetAvailableBooks",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: authorSelect.value,
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        })
            .always(function () {
                getBooks();
            });
    });
};

var count;
var listBooks;
var bookselect;

function getBooks() {
    $.get("JsonData/ThisAvailableBooks.json", function (data) {
        books = data;
        count = 1;
        listBooks = new Array(1);

        generateBooks();
        bookselect = document.querySelector('#book' + count);
        listBooks.push(bookselect.value);
    });
};

function generateBooks() {
    var book = '';
    var Iswas;
    for (var j = 1; j <= count; j++) {

        book += '<label>Book' + j + ':</label><select id="book' + j + '">';
        for (var i = 0; i < books.length; i++) {
            Iswas = false;
            for (var k = 0; k < listBooks.length; k++) {
                if (books[i].BookId == listBooks[j - 1]) {
                    book += '<option value=' + books[i].BookId + ' selected>' + books[i].Title + '</option>';
                    Iswas = true;
                    break;
                }
                else if (books[i].BookId == listBooks[k]) {
                    Iswas = true;
                    break;
                }
            }
            if (!Iswas) {
                book += '<option value=' + books[i].BookId + '>' + books[i].Title + '</option>';
            }
        }
        book += '</select>';

        if (j == count && count > 1) {
            book += '<button class="remove" style="margin:5px;" onclick="remove()">Remove</button><br/>'
        }
        else {
            book += '<br/>';
            $('#addNext').show();
        }
    }

    $('#Books').html(book);

    if (count == 5) {
        $('#addNext').hide();
    }
    updateSelect();
};

function updateSelect() {
    for (var i = 0; i < listBooks.length; i++) {
        if (i == 0) {
            let bookSelect = document.querySelector('#book1');
            bookSelect.addEventListener("change", function (event) {
                listBooks[0] = bookSelect.value;
                generateBooks();
            });
        } else if (i == 1) {
            let bookSelect = document.querySelector('#book2');
            bookSelect.addEventListener("change", function (event) {
                listBooks[1] = bookSelect.value;
                generateBooks();
            });
        } else if (i == 2) {
            let bookSelect = document.querySelector('#book3');
            bookSelect.addEventListener("change", function (event) {
                listBooks[2] = bookSelect.value;
                generateBooks();
            });
        } else if (i == 3) {
            let bookSelect = document.querySelector('#book4');
            bookSelect.addEventListener("change", function (event) {
                listBooks[3] = bookSelect.value;
                generateBooks();
            });
        } else if (i == 4) {
            let bookSelect = document.querySelector('#book5');
            bookSelect.addEventListener("change", function (event) {
                listBooks[4] = bookSelect.value;
                generateBooks();
            });
        }
    }
}

function addNext() {
    listBooks.pop();
    bookselect = document.querySelector('#book' + count);
    listBooks.push(bookselect.value);
    count = count + 1;

    generateBooks();

    bookselect = document.querySelector('#book' + count);
    listBooks.push(bookselect.value);

    generateBooks();
};

function remove() {
    listBooks.pop();
    count = count - 1;
    generateBooks();
};

function acceptAdd() {
    let authorSelect = document.querySelector('#author');
    listBooks.unshift(authorSelect.value);
    $.ajax({
        type: "POST",
        url: "/Borrow/Index?handler=SaveBorrow",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(listBooks),
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
    });

    addDialog.close();
    location.reload();
};

function cancel() {
    addDialog.close();
};