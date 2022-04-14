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
        public IEnumerable<BookModel> BorrowedBooks { get; set; }
        public IEnumerable<BorrowModel> HistoryBorrow { get; set; }
        public IEnumerable<DictBookGenreModel> DictBookGenres { get; set; }

        private readonly LibraryManagerContext db;

        public DetailsModel(LibraryManagerContext _db)
        {
            db = _db;
            Books = db.Books;
            DictBookGenres = db.DictBookGenres;
        }

        public void OnGet(int id)
        {
            NewUser = db.Users.SingleOrDefault(x => x.UserId == id);
            HistoryBorrow = db.Borrows.Where(x => x.UserId == id);
            BorrowedBooks = from book in db.Books
                            from borrow in db.Borrows
                            where book.BookId == borrow.BookId && borrow.UserId == id && borrow.IsReturned == false
                            select book;
        }
    }
}
