using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration configuration;
        private readonly Context context;

        public AccountRepository(UserManager<User> userManager, SignInManager<User> signInManager,
            IConfiguration configuration, Context context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
        }

        public async Task<string> SignUpAsync(UserModel userModel)
        {
            var ex = context.Users.Where(x => x.Email == userModel.Email).FirstOrDefault();
            if(ex == null)
            {
                var user = new User()
                {
                    UserName = userModel.Username,
                    Email = userModel.Email,
                    FullName = userModel.FullName,
                    PhoneNumber = userModel.Phone,
                    Address = userModel.Address,
                    IsAdmin = userModel.IsAdmin,
                };

                var result = await userManager.CreateAsync(user,userModel.Password);

                if (userModel.IsAdmin)
                    await userManager.AddToRoleAsync(user, "Admin");
                else
                    await userManager.AddToRoleAsync(user, "User");

                var role = await userManager.GetRolesAsync(user);
                var result1 = await signInManager.CheckPasswordSignInAsync(user, userModel.Password, false);
                if (!result1.Succeeded)
                {
                    return null;
                }

                var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,userModel.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

                foreach (var r in role)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, r));
                }

                var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                    );

                return new JwtSecurityTokenHandler().WriteToken(token);


            }
            else
            {
                return null; 
            }
        }
        public async Task<string> LoginAsync(SignInModel signInModel)
        {
            var user = await userManager.FindByEmailAsync(signInModel.Email);
            var role = await userManager.GetRolesAsync(user);
            var result = await signInManager.CheckPasswordSignInAsync(user, signInModel.Password, false);
            if (!result.Succeeded)
            {
                return null;
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,signInModel.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            foreach(var r in role)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, r));
            }

            var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);


        }

        public async Task<User> GetUserById(string email)
        {
            //string[] em = email.Split("%40");
            var res =  context.Users.Where(x => x.Email == email).FirstOrDefault();
            return res;
        }
    }
}
