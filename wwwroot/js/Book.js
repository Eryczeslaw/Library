var dictBookGenre;
var dataSource;

$(document).ready(function () {

    $.get("JsonData/DictBookGenre.json", function (data) {
        dictBookGenre = data;
    });

    $.get("JsonData/Books.json", function (data) {

        dataSource = new kendo.data.DataSource({
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
                        ISBN: { type: "string" },
                        BookGenreId: { type: "number" },
                        Count: { type: "number" },
                        AddDate: { type: "date" },
                        ModifiedDate: { type: "date" },
                    }
                }
            },
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: {
                input: true
            },
            sortable: true,
            height: 750,
            columns: [
                { field: "Author", title: "Author", width: "200px" },
                { field: "Title", title: "Title" },
                { field: "ReleaseDate", title: "Release Date", width: "300px" },
                { field: "ISBN", title: "ISBN", width: "100px" },
                { command: { text: "Details", click: details}, title: " ", width: "80px" },
                { command: { text: "Edit", click: edit }, title: " ", width: "70px" }
            ],
        });
    })
});

$("#dialogAdd").kendoDialog({
    width: "600px",
    height: "500px",
    title: "Add new book",
    closable: true,
    modal: true,
    visible: false
});

$("#dialogEdit").kendoDialog({
    width: "600px",
    height: "500px",
    title: "Edit book",
    closable: true,
    modal: true,
    visible: false
});

var addDialog = $("#dialogAdd").data("kendoDialog");
var editDialog = $("#dialogEdit").data("kendoDialog");

function addBook() {
    addDialog.content('<div id="addDialogContent"><style> #dialogContainer > label {min-width: 100px;height: 30px;font-weight: 500;} #dialogContainer > input {width: 170px;height: 30px;} #dialogContainer > span {color: red;height: 30px;font-size: 14px;font-weight: 600;margin-left: 5px;}</style><form novalidate><div id = "dialogContainer" style = "float:left; margin:5px; height:330px; padding:5px;" ><label>Author:</label><input id="addAuthor" type="text" required /><span id="addErrorAuthor" aria-live="polite"></span> <br /><label>Title:</label><input id="addTitle" type="text" required /><span id="addErrorTitle" aria-live="polite"></span> <br /><label>ReleaseDate:</label><input id="addReleaseDate" type="date" style="width:130px;" required /><span id="addErrorReleaseDate" aria-live="polite"></span> <br /><label>ISBN:</label><input id="addISBN" type="text" required pattern ="[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3}" /><span id="addErrorISBN" aria-live="polite"></span> <br /><label>BookGenreId:</label><label class="addBookGenreId"></label><span id="addErrorBookGenreId" aria-live="polite"></span> <br /><label>Count:</label><input id="addCount" type="number" value="1" min="1" required /><span id="addErrorCount" aria-live="polite"></span> <br /></div ><div style="clear:both;"></div><div style="margin: 10px; float:left;"><a class="btn btn-success btn-lg text-white" style="margin:5px;" onclick="acceptAdd()">Accept</a><a class="btn btn-danger btn-lg text-white" style="margin:5px;" onclick="cancel()">Cancel</a></div></form ></div>');

    var dictBook = '<select id="addbookGenreId" type="number" min="1" required>';
    for (var i = 0; i < dictBookGenre.length; i++) {
        dictBook += '<option value=' + dictBookGenre[i].BookGenreId + '>' + dictBookGenre[i].Name + '</option>';
    }
    dictBook += '</select>';

    $('.addBookGenreId').html(dictBook);

    addDialog.open();
};

function edit(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    editBook(dataItem);
}

function editBook(book) {
    editDialog.content('<div id="editDialogContent"><style> #dialogContainer > label {min-width: 100px;height: 30px;font-weight: 500;} #dialogContainer > input {width: 170px;height: 30px;} #dialogContainer > span {color: red;height: 30px;font-size: 14px;font-weight: 600;margin-left: 5px;}</style><form novalidate><div id = "dialogContainer" style = "float:left; margin:5px; height:330px; padding:5px;" ><input type="hidden" id="editBookId"/><label>Author:</label><input id="editAuthor" type="text" required /><span id="editErrorAuthor" aria-live="polite"></span> <br /><label>Title:</label><input id="editTitle" type="text" required /><span id="editErrorTitle" aria-live="polite"></span> <br /><label>ReleaseDate:</label><input id="editReleaseDate" type="date" style="width:130px;" required /><span id="editErrorReleaseDate" aria-live="polite"></span> <br /><label>ISBN:</label><input id="editISBN" type="text" required pattern ="[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3}" /><span id="editErrorISBN" aria-live="polite"></span> <br /><label>BookGenreId:</label><label class="editBookGenreId"></label><span id="editErrorBookGenreId" aria-live="polite"></span> <br /><label>Count:</label><input id="editCount" type="number" value="1" min="1" required /><span id="editErrorCount" aria-live="polite"></span> <br /></div ><div style="clear:both;"></div><div style="margin: 10px; float:left;"><a class="btn btn-success btn-lg text-white" style="margin:5px;" onclick="acceptEdit()">Accept</a><a class="btn btn-danger btn-lg text-white" style="margin:5px;" onclick="cancel()">Cancel</a></div></form ></div>');
    $('.k-widget k-window k-display-inline-flex').hide();

    var dictBook = '<select id="editbookGenreId" type="number" min="1" required>';
    for (var i = 0; i < dictBookGenre.length; i++) {
        if (i + 1 == book.BookGenreId) {
            dictBook += '<option value=' + dictBookGenre[i].BookGenreId + ' selected="selected">' + dictBookGenre[i].Name + '</option>';
        }
        else {
            dictBook += '<option value=' + dictBookGenre[i].BookGenreId + '>' + dictBookGenre[i].Name + '</option>';
        }
    }
    dictBook += '</select>';

    fillEditDialog(book);

    $('.editBookGenreId').html(dictBook);

    editDialog.open();
};

function fillEditDialog(book) {

    var month = (book.ReleaseDate.getMonth() + 1);
    if (month < 10) month = "0" + month;

    var day = book.ReleaseDate.getDate();
    if (day < 10) day = "0" + day;

    var ReleaseDate = book.ReleaseDate.getFullYear() + "-" + month + "-" + day;

    $("#editBookId").val(book.BookId);
    $("#editAuthor").val(book.Author);
    $("#editTitle").val(book.Title);
    $("#editReleaseDate").val(ReleaseDate);
    $("#editISBN").val(book.ISBN);
    $("#editbookGenreId").val(book.BookGenreId);
    $("#editCount").val(book.Count);
}

function acceptAdd() {
    var type = "add";
    var isRight = Validation(type)

    if (isRight == true) {

        var Now = myDate();
        var book = {
            "Author": $("#addAuthor").val(),
            "Title": $("#addTitle").val(),
            "ReleaseDate": $("#addReleaseDate").val(),
            "ISBN": $("#addISBN").val(),
            "BookGenreId": Number($("#addbookGenreId").val()),
            "Count": Number($("#addCount").val()),
            "AddDate": Now,
            "ModifiedDate": Now
        };

        $.ajax({
            type: "POST",
            url: "/Book/Index?handler=AddBook",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(book),
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        })

        addDialog.close();
        location.reload();
    }
}

function acceptEdit() {
    var type = "edit";
    var isRight = Validation(type)

    if (isRight == true) {

        var Now = myDate();
        var book = {
            "Author": $("#editAuthor").val() + ";#" + $("#editBookId").val(),
            "Title": $("#editTitle").val(),
            "ReleaseDate": $("#editReleaseDate").val(),
            "ISBN": $("#editISBN").val(),
            "BookGenreId": Number($("#editbookGenreId").val()),
            "Count": Number($("#editCount").val()),
            "ModifiedDate": Now
        };

        $.ajax({
            type: "POST",
            url: "/Book/Index?handler=EditBook",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(book),
            headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        })

        editDialog.close();
        location.reload();
    }
}

function myDate() {
    var Today = new Date();

    var month = (Today.getMonth() + 1);
    if (month < 10) month = "0" + month;

    var day = Today.getDate();
    if (day < 10) day = "0" + day;

    var hour = Today.getHours();
    if (hour < 10) hour = "0" + hour;

    var minute = Today.getMinutes();
    if (minute < 10) minute = "0" + minute;

    return Today.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00";
};

function details(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    window.location.href = '/Book/Details?id=' + dataItem.BookId;
}

function cancel() {
    addDialog.close();
    editDialog.close();
}