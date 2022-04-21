using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace Library.Pages.User
{
    public class AddModel : PageModel
    {
        [BindProperty]
        public UserModel NewUser { get; set; }

        private readonly LibraryManagerContext db;

        public AddModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                NewUser.AddDate = DateTime.UtcNow;
                NewUser.ModifiedDate = DateTime.UtcNow;
                NewUser.IsActive = true;
                db.Users.Add(NewUser);

                db.SaveChanges();

                return RedirectToPage("Index");
            }

            return Page();
        }
    }
}
