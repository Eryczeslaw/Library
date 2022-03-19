using Library.Models;
using System;
using System.Linq;

namespace Library.Repositories
{
    public class BorrowRepository : IBorrowRepository
    {
        private readonly LibraryManagerContext _context;

        public BorrowRepository(LibraryManagerContext context)
        {
            _context = context;
        }

        public void Add(BorrowModel borrow, DateTime toDate)
        {
            borrow.FromDate = DateTime.UtcNow;
            borrow.ToDate = toDate;
            _context.Borrows.Add(borrow);

            _context.SaveChanges();
        }

        public void Delete(int borrowId)
        {
            BorrowModel result = _context.Borrows.SingleOrDefault(x => x.BorrowId == borrowId);
            if (result != null)
            {
                result.IsReturned = true;

                _context.SaveChanges();
            }
        }

        public void Extend(int borrowId, DateTime toDate)
        {
            BorrowModel result = _context.Borrows.SingleOrDefault(x => x.BorrowId == borrowId);
            if (result != null)
            {
                result.ToDate = toDate;

                _context.SaveChanges();
            }
        }

        public BorrowModel Get(int borrowId) => _context.Borrows.SingleOrDefault(x => x.BorrowId == borrowId);

        public IQueryable<BorrowModel> GetAllBooks() => _context.Borrows.Where(x => x.IsReturned);

        public IQueryable<BorrowModel> GetAllUsers() => _context.Borrows.Where(x => !x.IsReturned);
    }
}
