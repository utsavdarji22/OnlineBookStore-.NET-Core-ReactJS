using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStore.Model;
using OnlineBookStore.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAccountRepository accountRepository;

        public UsersController(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody]UserModel userModel)
        {
            var result = await accountRepository.SignUpAsync(userModel);

            if (result != null)
            {
                return Ok(userModel);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] SignInModel signInModel)
        {
            var result = await accountRepository.LoginAsync(signInModel);

            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }

            return Ok(result);
        }
        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserById(string email)
        {
            var res = accountRepository.GetUserById(email);
            return Ok(res);
        }

    }
}
