using Library.Models;
using System;
using System.Linq;

namespace Library.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryManagerContext _context;

        public BookRepository(LibraryManagerContext context)
        {
            _context = context;
        }

        public void Add(BookModel book)
        {
            book.AddDate = DateTime.UtcNow;
            _context.Books.Add(book);

            _context.SaveChanges();
        }

        public BookModel Get(int bookId) => _context.Books.SingleOrDefault(x => x.BookId == bookId);

        public IQueryable<BookModel> GetAllBooks() => _context.Books;

        public void Update(int bookId, BookModel book)
        {
            BookModel result = _context.Books.SingleOrDefault(x => x.BookId == bookId);
            if (result != null)
            {
                result.Author = book.Author;
                result.Title = book.Title;
                result.ReleaseDate = book.ReleaseDate;
                result.ISBN = book.ISBN;
                result.BookGenreId = book.BookGenreId;
                result.Count = book.Count;
                book.ModifiedDate = DateTime.UtcNow;

                _context.SaveChanges();
            }
        }
    }
}
