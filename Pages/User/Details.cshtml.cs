using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.User
{
    public class DetailsModel : PageModel
    {
        [BindProperty]
        public UserModel NewUser { get; set; }
        public IEnumerable<BookModel> Books { get; set; }
        public IEnumerable<BorrowModel> Borrows { get; set; }
        public IEnumerable<DictBookGenreModel> DictBookGenres { get; set; }

        private readonly LibraryManagerContext db;

        public DetailsModel(LibraryManagerContext _db)
        {
            db = _db;
            DictBookGenres = db.DictBookGenres;
        }

        public void OnGet(int id)
        {
            NewUser = db.Users.SingleOrDefault(x => x.UserId == id);
            Borrows = db.Borrows.Where(x => x.UserId == id);
            Books = from book in db.Books
                    from borrow in db.Borrows
                    where book.BookId == borrow.BookId && borrow.UserId == id
                    select book;
        }
    }
}
