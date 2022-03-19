using Library.Models;
using System.Linq;

namespace Library.Repositories
{
    interface IUserRepository
    {
        UserModel Get(int userId);
        IQueryable<UserModel> GetAllUsers();
        void Add(UserModel user);
        void Update(int userId, UserModel user);
        void Delete(int userId);
    }
}
