using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
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
            if (ModelState.IsValid)
            {
                db.Books.Add(book);

                db.SaveChanges();
                bookJson.Save();
            }
        }

        public void OnPostEditBook([FromBody] BookModel book)
        {
            if (ModelState.IsValid)
            {
                string[] AuthorAndId = book.Author.Split(";#");
                BookModel result = db.Books.SingleOrDefault(x => x.BookId == int.Parse(AuthorAndId[1]));
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
