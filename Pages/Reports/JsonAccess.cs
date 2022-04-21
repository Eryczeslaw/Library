using Library.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Library.Pages.Reports
{
    public class JsonAccess
    {
        private readonly LibraryManagerContext db;
        private string jsonString;

        public JsonAccess(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void SaveBooksMostOftenBorrowed()
        {
            var BooksMostOftenBorrowed = (from book in db.Books
                                          from borrow in db.Borrows
                                          where book.BookId == borrow.BookId
                                          select new
                                          {
                                              book.BookId,
                                              book.Author,
                                              book.Title,
                                              book.BookGenreId,
                                              BookGenre = (from genre in db.DictBookGenres
                                                           where genre.BookGenreId == book.BookGenreId
                                                           select genre.Name).First(),
                                              book.ReleaseDate,
                                              Count = (from br in db.Borrows
                                                       where br.BookId == borrow.BookId
                                                       select br).Count(),
                                          }).Distinct().OrderByDescending(x => x.Count);

            StreamWriter streamWriter;
            string outPath = @"wwwroot\JsonData\BooksMostOftenBorrowed.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(BooksMostOftenBorrowed);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }

        public void SaveMostActiveUsers()
        {
            var MostActiveUsers = (from user in db.Users
                                   from borrow in db.Borrows
                                   where user.UserId == borrow.UserId
                                   select new
                                   {
                                       user.UserId,
                                       user.FirstName,
                                       user.LastName,
                                       Count = (from br in db.Borrows
                                                where br.UserId == borrow.UserId
                                                select br).Count()
                                   }).Distinct().OrderByDescending(x => x.Count);

            StreamWriter streamWriter;
            string outPath = @"wwwroot\JsonData\MostActiveUsers.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(MostActiveUsers);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }
    }
}
