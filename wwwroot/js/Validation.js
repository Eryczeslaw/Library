﻿function acceptValidation() {

    const author = document.getElementById('addAuthor');
    const authorError = document.getElementById('errorAuthor');

    const title = document.getElementById('addTitle');
    const titleError = document.getElementById('errorTitle');

    const releaseDate = document.getElementById('addReleaseDate');
    const releaseDateError = document.getElementById('errorReleaseDate');

    const ISBN = document.getElementById('addISBN');
    const ISBNError = document.getElementById('errorISBN');

    const bookGenreId = document.getElementById('bookGenreId');
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

        if (IsValid) {
            return IsValid;
        }
        return IsValid;
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
        ISBNError.textContent = 'Entered ISBN in the format 123-456-789';
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

    return addDialogValidation();
}
