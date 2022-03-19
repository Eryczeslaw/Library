using Library.Models;
using System;
using System.Linq;

namespace Library.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LibraryManagerContext _context;

        public UserRepository(LibraryManagerContext context)
        {
            _context = context;
        }

        public void Add(UserModel user)
        {
            user.AddDate = DateTime.UtcNow;
            user.IsActive = true;
            _context.Users.Add(user);

            _context.SaveChanges();
        }

        public void Delete(int userId)
        {
            UserModel result = _context.Users.SingleOrDefault(x => x.UserId == userId);
            if (result != null)
            {
                result.IsActive = false;

                _context.SaveChanges();
            }
        }

        public UserModel Get(int userId) => _context.Users.SingleOrDefault(x => x.UserId == userId);

        public IQueryable<UserModel> GetAllUsers() => _context.Users.Where(x => x.IsActive);

        public void Update(int userId, UserModel user)
        {
            UserModel result = _context.Users.SingleOrDefault(x => x.UserId == userId);
            if (result != null)
            {
                result.FirstName = user.FirstName;
                result.LastName = user.LastName;
                result.BirthDate = user.BirthDate;
                result.Email = user.Email;
                result.Phone = user.Phone;
                user.ModifiedDate = DateTime.UtcNow;

                _context.SaveChanges();
            }
        }
    }
}
