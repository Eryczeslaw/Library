using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace Library.Pages.User
{
    public class AddModel : PageModel
    {
        [BindProperty]
        public UserModel User { get; set; }

        private readonly LibraryManagerContext db;

        public AddModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet()
        {
        }

        public IActionResult OnPost(UserModel user)
        {
            if (ModelState.IsValid)
            {
                user.AddDate = DateTime.UtcNow;
                user.ModifiedDate = DateTime.UtcNow;
                user.IsActive = true;
                db.Users.Add(user);

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
