using Library.Models;
using System;
using System.Linq;

namespace Library.Repositories
{
    public interface IBorrowRepository
    {
        BorrowModel Get(int borrowId);
        IQueryable<BorrowModel> GetAllBooks();
        IQueryable<BorrowModel> GetAllUsers();
        void Add(BorrowModel borrow, DateTime toDate);
        void Delete(int userId);
        void Extend(int borrowId, DateTime toDate);
    }
}
