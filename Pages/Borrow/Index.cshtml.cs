using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.Borrow
{
    public class IndexModel : PageModel
    {
        private readonly LibraryManagerContext db;
        private JsonAccess jsonAccess;

        public IEnumerable<BookModel> AvailableBooks { get; set; }

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
            jsonAccess = new JsonAccess(db);
        }

        public void OnGet()
        {
            jsonAccess.SaveBorrowdBooks();
            jsonAccess.SaveUsersWithBooks();
            jsonAccess.SaveUsersWithoutAllBooks();
        }

        public void OnPostSetAvailableBooks([FromBody] int userId)
        {
            jsonAccess.SaveThisUserAvailableBooks(userId);
        }

        public void OnPostSaveBorrow([FromBody] string[] borrowedBooks)
        {
            if (int.TryParse(borrowedBooks[0], out int userId))
            {
                bool isUser = db.Users.Where(x => x.UserId == userId).Any();
                if (isUser)
                {
                    for (int i = 1; i < borrowedBooks.Length; i++)
                    {
                        if (int.TryParse(borrowedBooks[i], out int bookId))
                        {
                            bool isBook = db.Books.Where(x => x.BookId == bookId).Any();
                            if (isBook)
                            {
                                bool wasBook = db.Borrows.Where(x => x.UserId == userId).Where(x => x.IsReturned == false).Where(x => x.BookId == bookId).Any();
                                if (!wasBook)
                                {
                                    BorrowModel newBorrow = new BorrowModel();
                                    newBorrow.UserId = userId;
                                    newBorrow.BookId = bookId;
                                    newBorrow.BookId = bookId;
                                    newBorrow.FromDate = DateTime.UtcNow;
                                    newBorrow.ToDate = DateTime.UtcNow.AddMonths(1);
                                    newBorrow.IsReturned = false;

                                    db.Borrows.Add(newBorrow);
                                    db.SaveChanges();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
