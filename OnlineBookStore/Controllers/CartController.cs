using Microsoft.AspNetCore.Authorization;
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
    //[Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }
        [HttpPost("Add")]
        public async Task<IActionResult> AddToCart([FromBody]CartModel cartModel)
        {
            var result = await cartRepository.AddToCart(cartModel);
            return Ok(result);
        }
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateCart([FromBody]CartModel cartModel)
        {
            var result = await cartRepository.UpdateCart(cartModel);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Remove(int Id)
        {
            var result = await cartRepository.RemoveProduct(Id);
            if (result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetAllProduct(string Id)
        {
            var result = await cartRepository.GetAllProduct(Id);
            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
