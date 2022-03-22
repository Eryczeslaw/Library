using Microsoft.EntityFrameworkCore;

namespace Library.Models
{
    public class LibraryManagerContext : DbContext
    {
        public LibraryManagerContext(DbContextOptions<LibraryManagerContext> options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<BookModel> Books { get; set; }
        public DbSet<BorrowModel> Borrows { get; set; }
        public DbSet<DictBookGenreModel> DictBookGenres { get; set; }
    }
}
