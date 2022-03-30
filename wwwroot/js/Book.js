﻿var books = [{
    "BookId": 6, "Author": "Paulo Coelho", "Title": "Alchemik", "ReleaseDate": "1988-01-01T00:00:00", "ISBN": "111-54-13", "BookGenreId": 1, "Count": 5, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 13, "Author": "Dan Brown", "Title": "Kod Leonarda da Vinci", "ReleaseDate": "2003-03-19T00:00:00", "ISBN": "111-54-89", "BookGenreId": 1, "Count": 3, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 19, "Author": "Hanya Yanagihara", "Title": "Małe życie", "ReleaseDate": "2015-01-01T00:00:00", "ISBN": "111-54-10", "BookGenreId": 1, "Count": 3, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 24, "Author": "Frank Herbert", "Title": "Diuna", "ReleaseDate": "1965-08-01T00:00:00", "ISBN": "111-33-23", "BookGenreId": 1, "Count": 4, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-02-22T00:00:00"
}, {
    "BookId": 25, "Author": "Stanisław Lem", "Title": "Solaris", "ReleaseDate": "1961-01-01T00:00:00", "ISBN": "111-12-05", "BookGenreId": 2, "Count": 3, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 27, "Author": "Joe Haldeman", "Title": "Wieczna wojna", "ReleaseDate": "1974-01-01T00:00:00", "ISBN": "111-98-23", "BookGenreId": 2, "Count": 4, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 29, "Author": "Richard Paul Evans", "Title": "Dotknąć nieba", "ReleaseDate": "2012-05-08T00:00:00", "ISBN": "111-23-55", "BookGenreId": 3, "Count": 6, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 31, "Author": "Beth Reekles", "Title": "Domek przy plaży", "ReleaseDate": "2019-05-11T00:00:00", "ISBN": "111-76-43", "BookGenreId": 3, "Count": 4, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 33, "Author": "Jane Austen", "Title": "Duma i uprzedzenie", "ReleaseDate": "1913-01-28T00:00:00", "ISBN": "111-32-11", "BookGenreId": 4, "Count": 4, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 35, "Author": "John Green", "Title": "Gwiazd naszych wina", "ReleaseDate": "2012-01-10T00:00:00", "ISBN": "111-86-34", "BookGenreId": 4, "Count": 5, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}, {
    "BookId": 37, "Author": "Olga Tokarczuk", "Title": "Opowiadania bizarne", "ReleaseDate": "2018-04-18T00:00:00", "ISBN": "111-32-45", "BookGenreId": 5, "Count": 2, "AddDate": "2022-03-22T00:00:00", "ModifiedDate": "2022-03-22T00:00:00"
}];


var dataSource = new kendo.data.DataSource({
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
        "Author",
        { field: "Title", title: "Title" },
        { field: "ReleaseDate", title: "Release Date", width: "220px" },
        { field: "ISBN", title: "ISBN", width: "120px" },
        { field: "BookGenreId", title: "Book Genre Id", width: "120px" },
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

$("#dialog").kendoDialog({
    width: "450px",
    height: "500px",
    title: "Add new book",
    closable: true,
    modal: true,
    visible: false
});

var addDialog = $("#dialog").data("kendoDialog");

function addBook() {
    //dataSource.add({
    //    "BookId": 39,
    //    "Author": "Alice Munro",
    //    "Title": "Za kogo ty się uważasz?",
    //    "ReleaseDate": "1977-01-01T00:00:00",
    //    "ISBN": "111-42-12",
    //    "BookGenreId": 5,
    //    "Count": 3,
    //    "AddDate": "2022-03-22T00:00:00",
    //    "ModifiedDate": "2022-03-22T00:00:00"
    //});
   
    addDialog.content('<div><div style = "float:left; margin:5px; height:330px; padding:5px;" ><label>Author:</label>  <br /><label>Title:</label>  <br /><label>ReleaseDate:</label>  <br /><label>ISBN:</label>  <br /><label>BookGenreId:</label>  <br /><label>Count:</label>  <br /></div ><div style="float: left; margin: 5px; height:330px; padding:5px;"><input type="text" /> <br /><input type="text" /> <br /><input type="date" /> <br /><input type="text" /> <br /><input type="number" /> <br /><input type="number" /> <br /></div><div style="clear:both;"></div><div style="margin: 10px; float:right;"><a class= "btn btn-success" style="margin:5px;" onclick = "accept()" > Accept</a ><a class="btn btn-danger" style="margin:5px;" onclick="cancel()">Cancel</a></div ></div > ');
    addDialog.open();
};

function accept() {
    kendo.alert("Accept!");
    addDialog.close();
}

function cancel() {
    kendo.alert("Cancel!");
    addDialog.close();
}