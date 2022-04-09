using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.Book
{
    public class DetailsModel : PageModel
    {
        [BindProperty]
        public BookModel Book { get; set; }
        public IEnumerable<UserModel> Users { get; set; }
        public IEnumerable<BorrowModel> Borrows { get; set; }
        public IEnumerable<DictBookGenreModel> DictBookGenres { get; set; }
        public IEnumerable<BorrowModel> CurrentStatus { get; set; }

        private readonly LibraryManagerContext db;

        public DetailsModel(LibraryManagerContext _db)
        {
            db = _db;
            DictBookGenres = db.DictBookGenres;
        }

        public void OnGet(int id)
        {
            Book = db.Books.SingleOrDefault(x => x.BookId == id);
            Users = db.Users.Where(x => x.IsActive);
            Borrows = db.Borrows.Where(x => x.BookId == id);
            CurrentStatus = from borrow in db.Borrows
                            where borrow.BookId == id && borrow.IsReturned == false
                            select borrow;
        }
    }
}
