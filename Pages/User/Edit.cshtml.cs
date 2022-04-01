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
        public UserModel NewUser { get; set; }

        private readonly LibraryManagerContext db;

        public EditModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet(int id)
        {
            NewUser = db.Users.SingleOrDefault(x => x.UserId == id);
        }

        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                UserModel result = db.Users.SingleOrDefault(x => x.UserId == NewUser.UserId);

                result.FirstName = NewUser.FirstName;
                result.LastName = NewUser.LastName;
                result.BirthDate = NewUser.BirthDate;
                result.Email = NewUser.Email;
                result.Phone = NewUser.Phone;
                NewUser.ModifiedDate = DateTime.UtcNow;

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
