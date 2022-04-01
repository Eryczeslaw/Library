using Library.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace Library.Pages.Book
{
    public class JsonAccess
    {
        private readonly LibraryManagerContext db;
        private string jsonString;

        public IEnumerable<BookModel> Books { get; set; }

        public JsonAccess(LibraryManagerContext _db)
        {
            db = _db;
            Books = db.Books;
        }

        public void Save()
        {
            StreamWriter streamWriter;
            string outPath = @"E:\Programowianie\Visual Studio\C#\Library\wwwroot\JsonData\Books.json";

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
