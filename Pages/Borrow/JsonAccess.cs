using Library.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Library.Pages.Borrow
{
    public class JsonAccess
    {
        private readonly LibraryManagerContext db;
        private string jsonString;

        public JsonAccess(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void SaveBorrowdBooks()
        {
            var BorrowedBooks = (from book in db.Books
                                 from borrow in db.Borrows
                                 from user in db.Users
                                 where book.BookId == borrow.BookId && user.UserId == borrow.UserId && borrow.IsReturned == false
                                 select new { borrow.BorrowId, book.BookId, book.Author, book.Title, user.FirstName, user.LastName });


            StreamWriter streamWriter;
            string outPath = @"E:\Programowianie\Visual Studio\C#\Library\wwwroot\JsonData\BorrowedBooks.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(BorrowedBooks);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }

        public void SaveUsersWithBooks()
        {
            var UsersWithBooks = (from user in db.Users
                                  from borrow in db.Borrows
                                  where user.UserId == borrow.UserId
                                  select new
                                  {
                                      user.UserId,
                                      user.FirstName,
                                      user.LastName,
                                      user.Email,
                                      Count = (from br in db.Borrows
                                               where br.UserId == borrow.UserId && br.IsReturned == false
                                               select br).Count()
                                  }).Distinct();

            StreamWriter streamWriter;
            string outPath = @"E:\Programowianie\Visual Studio\C#\Library\wwwroot\JsonData\UsersWithBooks.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(UsersWithBooks);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }

        public void SaveUsersWithoutAllBooks()
        {
            var UsersWithoutAllBooks = from user in db.Users
                                       where (from borrow in db.Borrows
                                              where borrow.UserId == user.UserId && borrow.IsReturned == false
                                              select borrow.UserId).Count() < db.Books.Count()
                                       select new { user.UserId, user.FirstName, user.LastName };

            StreamWriter streamWriter;
            string outPath = @"E:\Programowianie\Visual Studio\C#\Library\wwwroot\JsonData\UsersWithoutAllBooks.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(UsersWithoutAllBooks);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }

        public void SaveThisUserAvailableBooks(int userId)
        {
            IEnumerable<BookModel> AvailableBooks = from book in db.Books
                                                    where (from borrow in db.Borrows
                                                           where borrow.BookId == book.BookId && borrow.IsReturned == false
                                                           select borrow.BookId).Count() < book.Count
                                                    select book;

            IEnumerable<BookModel> thisAvailableBooks = AvailableBooks.Except((from borrow in db.Borrows
                                                                               from books in db.Books
                                                                               where borrow.UserId == userId && borrow.BookId == books.BookId && borrow.IsReturned == false
                                                                               select books).Distinct());
            StreamWriter streamWriter;
            string outPath = @"E:\Programowianie\Visual Studio\C#\Library\wwwroot\JsonData\ThisAvailableBooks.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(thisAvailableBooks);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }
    }
}
