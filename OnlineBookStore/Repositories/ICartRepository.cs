using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories
{
    public interface ICartRepository
    {
        Task<CartModel> AddToCart(CartModel cartData);
        Task<CartModel> UpdateCart(CartModel cartModel);
        Task<bool> RemoveProduct(int Id);
        Task<List<CartModel>> GetAllProduct(string Id);
    }
}
