using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Linq;

namespace Library.Pages.User
{
    public class EditModel : PageModel
    {
        [BindProperty]
        public UserModel User { get; set; }

        private readonly LibraryManagerContext db;

        public EditModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet(int id)
        {
            User = db.Users.SingleOrDefault(x => x.UserId == id);
        }

        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                UserModel result = db.Users.SingleOrDefault(x => x.UserId == User.UserId);

                result.FirstName = User.FirstName;
                result.LastName = User.LastName;
                result.BirthDate = User.BirthDate;
                result.Email = User.Email;
                result.Phone = User.Phone;
                User.ModifiedDate = DateTime.UtcNow;

                db.SaveChanges();

                return RedirectToPage("Index");
            }
            else
            {
                return Page();
            }
        }
    }
}
