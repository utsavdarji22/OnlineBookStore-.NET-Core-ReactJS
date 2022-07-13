using Microsoft.AspNetCore.Mvc;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly Context context;

        public CartRepository(Context context)
        {
            this.context = context;
        }

        
        public async Task<CartModel> AddToCart(CartModel cartData)
        {
            var cart = context.Cart.Where(x => x.BookId == cartData.BookId && cartData.UserId == x.UserId).FirstOrDefault();
            if (cart != null)
            {
                cart.Quantity = (int)cart.Quantity + 1;
                await context.SaveChangesAsync();
                return new CartModel()
                {
                    Id = cart.Id,
                    Quantity = cart.Quantity,
                    UserId = cart.UserId,
                    BookId = cart.BookId
                };
            }
            else
            {
                Cart newCart = new Cart()
                {
                    BookId = cartData.BookId,
                    UserId = cartData.UserId,
                    Quantity = 1,
                };
                context.Cart.Add(newCart);
                await context.SaveChangesAsync();
                return new CartModel()
                {
                    Id = newCart.Id,
                    Quantity = newCart.Quantity,
                    UserId = newCart.UserId,
                    BookId = newCart.BookId
                };
            }
        }
        
        public async Task<CartModel> UpdateCart(CartModel cartModel)
        {
            var cart = context.Cart.Find(cartModel.Id);
            if(cart != null)
            {
                cart.Quantity -= 1;
                await context.SaveChangesAsync();
                return new CartModel()
                {
                    Id = cart.Id,
                    Quantity = cart.Quantity,
                    UserId = cart.UserId,
                    BookId = cart.BookId
                };
            }
            else
            {
                return null;
            }
            
        }
        public async Task<bool> RemoveProduct(int Id)
        {
            try {
                var cart = await context.Cart.FindAsync(Id);
                context.Cart.Remove(cart);

                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<CartModel>> GetAllProduct(string Id)
        {
            try
            {
                var result = context.Cart.Where(x => x.UserId == Id).Select(x => new CartModel()
                {
                    Id = x.Id,
                    BookId = x.BookId,
                    UserId = x.UserId,
                    Quantity= x.Quantity
                }).ToList() ;
                return result;
            }
            catch
            {
                return null;
            }
        }
    }   
}
