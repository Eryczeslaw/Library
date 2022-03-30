using Library.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Library.Pages.Book
{
    public class IndexModel : PageModel
    {

        private readonly LibraryManagerContext db;
        private JsonAccess bookJson;

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
            bookJson = new JsonAccess(db);
        }

        public void OnGet()
        {
            //bookJson.Save();
        }
    }
}
