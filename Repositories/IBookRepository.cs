using Library.Models;
using System.Linq;

namespace Library.Repositories
{
    interface IBookRepository
    {
        BookModel Get(int bookId);
        IQueryable<BookModel> GetAllBooks();
        void Add(BookModel book);
        void Update(int bookId, BookModel book);
    }
}
