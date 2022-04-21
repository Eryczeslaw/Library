
$(document).ready(function () {

    $("#filterCointainer").html('<div id="filter"><style>#filter {background-color: #A5A5A5; padding: 5px; margin: 10px;} #filter > label {margin-left: 5px;font-weight: 700;} #filter > input {margin:5px; margin-right:7px;} #filter > select {margin:5px; height:30px;} #filter > button{margin:5px;}</style><label>Title: </label><input id = "titleFilters" /><label>Genre: </label><select id="genreFilters"></select><label>From: </label><input type="date" id="fromReleaseDate" /><label>To: </label><input type="date" id="toReleaseDate" /><button class="btn btn-info text-white" onclick="filtering()">Filter</button><button class="btn btn-warning text-white" onclick="reset()">Reset</button><div>')

    $.get("JsonData/DictBookGenre.json", function (data) {
        dictBookGenre = data;

        var dictBook = '<option value=0>Wszystkie</option>';
        for (var i = 0; i < dictBookGenre.length; i++) {
            dictBook += '<option value=' + dictBookGenre[i].BookGenreId + '>' + dictBookGenre[i].Name + '</option>';
        }
        $('#genreFilters').html(dictBook);
    });

    $.get("JsonData/BooksMostOftenBorrowed.json", function (data) {

        dataSourceBooks = new kendo.data.DataSource({
            data: data,
            batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "BorrowId",
                    fields: {
                        Title: { type: "string" },
                        Author: { type: "string" },
                        BookGenreId: { type: "number" },
                        BookGenre: { type: "string" },
                        ReleaseDate: { type: "date" },
                        Count: { type: "number" },
                    }
                }
            },
        });

        $("#gridBooks").kendoGrid({
            dataSource: dataSourceBooks,
            pageable: {
                input: true
            },
            height: 300,
            columns: [
                { field: "Title", title: "Title" },
                { field: "Author", title: "Author" },
                { field: "BookGenre", title: "Book Genre", width: "200px" },
                { field: "ReleaseDate", title: "Release date", format: "{0:d}", width: "100px" },
                { field: "Count", title: "Count", width: "100px" },
            ],
        });
    })

    $.get("JsonData/MostActiveUsers.json", function (data) {

        dataSourceUsers = new kendo.data.DataSource({
            data: data,
            batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "UserId",
                    fields: {
                        FirstName: { type: "string" },
                        LastName: { type: "string" },
                        Count: { type: "number" }
                    }
                }
            },
        });

        $("#gridUsers").kendoGrid({
            dataSource: dataSourceUsers,
            pageable: {
                input: true
            },
            filterable: {
                mode: "row"
            },
            height: 300,
            columns: [
                {
                    field: "FirstName", title: "First Name", filterable: {
                        cell: {
                            operator: "startswith",
                            showOperators: false
                        }
                    }
                },
                {
                    field: "LastName", title: "Last Name", filterable: {
                        cell: {
                            operator: "startswith",
                            showOperators: false
                        }
                    }
                },
                {
                    field: "Count", title: "Number of borrows", filterable: {
                        cell: {
                            enabled: true,
                        }
                    },
                },
            ],
        });
    })
});

function filtering() {
    let bookGenreIdOperator;
    if ($("#genreFilters").val() == 0) {
        bookGenreIdOperator = "neq"
    }
    else {
        bookGenreIdOperator = "eq";
    }

    let fromReleaseDateOparator;
    if ($("#fromReleaseDate").val() == "") {
        fromReleaseDateOparator = "isnotnull";
    }
    else {
        fromReleaseDateOparator = "gte";
    }

    let toReleaseDateOparator;
    if ($("#toReleaseDate").val() == "") {
        toReleaseDateOparator = "isnotnull";
    }
    else {
        toReleaseDateOparator = "lte";
    }

    dataSourceBooks.filter([
        { field: "Title", operator: "startswith", value: $("#titleFilters").val() },
        { field: "BookGenreId", operator: bookGenreIdOperator, value: $("#genreFilters").val() },
        { field: "ReleaseDate", operator: fromReleaseDateOparator, value: kendo.parseDate($("#fromReleaseDate").val()) },
        { field: "ReleaseDate", operator: toReleaseDateOparator, value: kendo.parseDate($("#toReleaseDate").val()) },
    ]);
};

function reset() {

    $("#filterCointainer").html('<div id="filter"><style>#filter {background-color: #A5A5A5; padding: 5px; margin: 10px;} #filter > label {margin-left: 5px;font-weight: 700;} #filter > input {margin:5px; margin-right:7px;} #filter > select {margin:5px; height:30px;} #filter > button{margin:5px;}</style><label>Title: </label><input id = "titleFilters" /><label>Genre: </label><select id="genreFilters"></select><label>From: </label><input type="date" id="fromReleaseDate" /><label>To: </label><input type="date" id="toReleaseDate" /><button class="btn btn-info text-white" onclick="filtering()">Filter</button><button class="btn btn-warning text-white" onclick="reset()">Reset</button><div>')

    $.get("JsonData/DictBookGenre.json", function (data) {
        dictBookGenre = data;

        let dictBook = '<option value=0>Wszystkie</option>';
        for (var i = 0; i < dictBookGenre.length; i++) {
            dictBook += '<option value=' + dictBookGenre[i].BookGenreId + '>' + dictBookGenre[i].Name + '</option>';
        }
        $('#genreFilters').html(dictBook);
    });

    dataSourceBooks.filter([
        { field: "Title", operator: "isnotnull" },
        { field: "BookGenreId", operator: "isnotnull" },
        { field: "ReleaseDate", operator: "isnotnull" },
        { field: "ReleaseDate", operator: "isnotnull" },
    ]);
}