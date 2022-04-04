var dictBookGenre;
var books;
var dataSource;

$(document).ready(function () {

    $("#addDialog").hide();

    $.get("JsonData/DictBookGenre.json", function (data, status) {
        dictBookGenre = data;
    });

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
                        AddDate: { type: "date" },
                        ModifiedDate: { type: "date" },
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
            toolbar: "<button class='btn btn-info' name='create' onclick='addBook()'>Add book</button>",
            columns: [
                { field: "Author", title: "Author", width: "200px" },
                { field: "Title", title: "Title" },
                { field: "ReleaseDate", title: "Release Date", width: "230px" },
                { field: "ISBN", title: "ISBN", width: "100px" },
                { field: "BookGenreId", title: "Genre Id", width: "80px" },
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
    width: "600px",
    height: "500px",
    title: "Add new book",
    closable: true,
    modal: true,
    visible: false
});

var addDialog = $("#dialog").data("kendoDialog");

function addBook() {
    addDialog.content('<div id="addDialog"><style>#addContainer > label {min-width: 100px;height: 30px;font-weight: 500;} #addContainer > input {width: 170px;height: 30px;} #addContainer > span {color: red;height: 30px;font-size: 14px;font-weight: 600;margin-left: 5px;}</style><form novalidate><div id = "addContainer" style = "float:left; margin:5px; height:330px; padding:5px;" ><label>Author:</label><input id="addAuthor" type="text" required /><span id="errorAuthor" aria-live="polite"></span> <br /><label>Title:</label><input id="addTitle" type="text" required /><span id="errorTitle" aria-live="polite"></span> <br /><label>ReleaseDate:</label><input id="addReleaseDate" type="date" style="width:130px;" required /><span id="errorReleaseDate" aria-live="polite"></span> <br /><label>ISBN:</label><input id="addISBN" type="text" required pattern ="[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3}" /><span id="errorISBN" aria-live="polite"></span> <br /><label>BookGenreId:</label><label class="addBookGenreId"></label><span id="errorBookGenreId" aria-live="polite"></span> <br /><label>Count:</label><input id="addCount" type="number" value="1" min="1" required /><span id="errorCount" aria-live="polite"></span> <br /></div ><div style="clear:both;"></div><div style="margin: 10px; float:left;"><a class="btn btn-success" style="margin:5px;" onclick="accept()">Accept</a><a class="btn btn-danger" style="margin:5px;" onclick="cancel()">Cancel</a></div></form ></div>');

    var dictBook = '<select id="bookGenreId" type="number" min="1" required>';
    for (var i = 0; i < dictBookGenre.length; i++) {
        dictBook += '<option value=' + dictBookGenre[i].BookGenreId + '>' + dictBookGenre[i].Name + '</option>';
    }
    dictBook += '</select>';

    $('.addBookGenreId').html(dictBook);

    addDialog.open();
};

function accept() {
    var isRight = acceptValidation();

    if (isRight == true) {

        var Now = MyDate();

        var book = {
            "BookId": 0,
            "Author": $("#addAuthor").val(),
            "Title": $("#addTitle").val(),
            "ReleaseDate": $("#addReleaseDate").val(),
            "ISBN": $("#addISBN").val(),
            "BookGenreId": Number($("#bookGenreId").val()),
            "Count": Number($("#addCount").val()),
            "AddDate": Now,
            "ModifiedDate": Now
        };

        dataSource.add(book);
        books.push(book);

        $.ajax({
            type: "POST",
            url: "/Book/Index?handler=AddBook",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(book),
            headers: {
                RequestVerificationToken:
                    $('input:hidden[name="__RequestVerificationToken"]').val()
            },
        })
        addDialog.close();
    }
}

function MyDate() {
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

function cancel() {
    addDialog.close();

    var fs = require('fs');
    fs.writeFile('JsonData/Books.json', books);
}
