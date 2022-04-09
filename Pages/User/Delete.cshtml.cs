using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;

namespace Library.Pages.User
{
    public class DeleteModel : PageModel
    {
        private readonly LibraryManagerContext db;

        public DeleteModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public IActionResult OnGet(int id)
        {
            if(db.Borrows.Where(x => x.UserId == id).Count() == 0)
            {
                UserModel result = db.Users.SingleOrDefault(x => x.UserId == id);
                if (result == null)
                {
                    NotFound();
                }

                result.IsActive = false;
                db.SaveChanges();
            }

            return RedirectToPage("Index");
        }
    }
}
