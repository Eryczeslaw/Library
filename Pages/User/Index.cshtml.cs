using Library.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace Library.Pages.User
{
    public class IndexModel : PageModel
    {
        public IEnumerable<UserModel> Users { get; set; }
        public IEnumerable<BorrowModel> Borrows { get; set; }

        private readonly LibraryManagerContext db;

        public IndexModel(LibraryManagerContext _db)
        {
            db = _db;
        }

        public void OnGet()
        {
            Users = db.Users.Where(x => x.IsActive);
            Borrows = db.Borrows.Where(x => !x.IsReturned);
        }
    }
}
