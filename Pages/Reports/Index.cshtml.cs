using Library.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace Library.Pages.Reports
{
    public class IndexModel : PageModel
    {
        private readonly LibraryManagerContext db;
        private JsonAccess jsonAccess;

        public IEnumerable<DictBookGenreModel> BookGenres { get; set; }

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
            BookGenres = db.DictBookGenres;
            jsonAccess = new JsonAccess(db);
        }

        public void OnGet()
        {
            jsonAccess.SaveBooksMostOftenBorrowed();
            jsonAccess.SaveMostActiveUsers();
        }
    }
}
