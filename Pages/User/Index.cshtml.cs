using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.User
{
    public class IndexModel : PageModel
    {
        public IEnumerable<UserModel> Users { get; set; }
        private readonly LibraryManagerContext db;

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet()
        {
            Users = db.Users.Where(x => x.IsActive);
        }

        public IActionResult OnPostDelete(int id)
        {
            UserModel result = db.Users.SingleOrDefault(x => x.UserId == id);
            if (result == null)
            {
                NotFound();
            }

            result.IsActive = false;
            db.SaveChanges();

            return RedirectToPage("Index");
        }
    }
}
