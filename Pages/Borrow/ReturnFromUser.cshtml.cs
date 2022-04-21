using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.Borrow
{
    public class ReturnFromUserModel : PageModel
    {
        private readonly LibraryManagerContext db;

        public IEnumerable<BorrowModel> Borrows { get; set; }
        public IEnumerable<BookModel> Books { get; set; }
        public IEnumerable<DictBookGenreModel> Genre { get; set; }

        [BindProperty]
        public List<int> AreChecked { get; set; }


        public ReturnFromUserModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet(int id)
        {
            Borrows = db.Borrows.Where(x => x.UserId == id).Where(x => x.IsReturned == false);
            Books = db.Books;
            Genre = db.DictBookGenres;
        }

        public IActionResult OnPost()
        {
            foreach (int borrow in AreChecked)
            {
                bool isBorrow = db.Borrows.Where(x => x.BorrowId == borrow).Any();
                if (isBorrow)
                {
                    BorrowModel result = db.Borrows.SingleOrDefault(x => x.BorrowId == borrow);
                    result.ToDate = DateTime.UtcNow;
                    result.IsReturned = true;
                    db.SaveChanges();
                }
            }

            return RedirectToPage("Index");
        }
    }
}
