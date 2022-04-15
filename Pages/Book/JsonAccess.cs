using Library.Models;
using Newtonsoft.Json;
using System.IO;
using System.Linq;

namespace Library.Pages.Book
{
    public class JsonAccess
    {
        private readonly LibraryManagerContext db;
        private string jsonString;

        public JsonAccess(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void Save()
        {
            var Books = from book in db.Books
                        from genre in db.DictBookGenres
                        where book.BookGenreId == genre.BookGenreId
                        select new { book.BookId, book.Author, book.Title, book.ReleaseDate, genre.BookGenreId, genre.Name, book.ISBN, book.Count };

            StreamWriter streamWriter;
            string outPath = @"wwwroot\JsonData\Books.json";

            if (!File.Exists(outPath))
            {
                streamWriter = File.CreateText(outPath);
            }
            else
            {
                streamWriter = new StreamWriter(outPath);
            }

            jsonString = JsonConvert.SerializeObject(Books);

            streamWriter.Write(jsonString);
            streamWriter.Close();
        }
    }
}
