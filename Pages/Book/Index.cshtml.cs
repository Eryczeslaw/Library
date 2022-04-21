using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Library.Pages.Book
{
    public class IndexModel : PageModel
    {
        public IEnumerable<DictBookGenreModel> BookGenres { get; set; }

        private readonly LibraryManagerContext db;
        private JsonAccess bookJson;

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
            BookGenres = db.DictBookGenres;
            bookJson = new JsonAccess(db);
        }

        public void OnPostAddBook([FromBody] BookModel book)
        {
            if (Validation(book))
            {
                db.Books.Add(book);

                db.SaveChanges();
                bookJson.Save();
            }
        }

        public void OnPostEditBook([FromBody] BookModel book)
        {
            string[] AuthorAndId = book.Author.Split(";#");
            if (int.TryParse(AuthorAndId[^1], out int bookId))
            {
                book.BookId = bookId;
                book.Author = AuthorAndId[0];

                if (db.Books.Where(x => x.BookId == book.BookId).Any())
                {
                    if (Validation(book))
                    {
                        BookModel result = db.Books.SingleOrDefault(x => x.BookId == book.BookId);
                        result.Author = AuthorAndId[0];
                        result.Title = book.Title;
                        result.ReleaseDate = book.ReleaseDate;
                        result.ISBN = book.ISBN;
                        result.BookGenreId = book.BookGenreId;
                        result.Count = book.Count;
                        result.ModifiedDate = book.ModifiedDate;

                        db.SaveChanges();
                        bookJson.Save();
                    }
                }
            }
        }

        public bool Validation(BookModel book)
        {
            if (string.IsNullOrWhiteSpace(book.Author))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(book.Title))
            {
                return false;
            }

            if (!DateTime.TryParse(book.ReleaseDate.ToString(), out DateTime date))
            {
                return false;
            }

            RegularExpressionAttribute regularExpressionISBN = new RegularExpressionAttribute(@"^[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3}$");
            if (!regularExpressionISBN.IsValid(book.ISBN))
            {
                return false;
            }
            if (!BookGenres.Where(x => x.BookGenreId == book.BookGenreId).Any())
            {
                return false;
            }
            if (!int.TryParse(book.Count.ToString(), out int count))
            {
                return false;
            }
            return true;
        }
    }
}
