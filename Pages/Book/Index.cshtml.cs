using Library.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

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

        public void OnGet()
        {
            //bookJson.Save();
        }
    }
}
