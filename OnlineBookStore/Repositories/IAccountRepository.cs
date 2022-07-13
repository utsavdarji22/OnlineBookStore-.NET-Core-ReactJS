using Microsoft.AspNetCore.Identity;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories
{
    public interface IAccountRepository
    {
        Task<string> SignUpAsync(UserModel userModel);
        Task<string> LoginAsync(SignInModel signInModel);
        Task<User> GetUserById(string email);
    }
}
