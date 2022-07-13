using Microsoft.AspNetCore.Http;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories
{
    public interface IBookRepository
    {
        Task<Book> AddBookAsync(BookPostModel bookMod);
        Task<byte[]> GetImage(string name);
        Task<Book> GetBookById(int id);
        Task<Book> UpdateBook(BookModel bookModel);
        Task DeleteBookAsync(int bookId);
        Task<bool> UpdateCover(int id, IFormFile file);
        Task<List<BookModel>> GetAllBooksAsync();
        Task<List<Book>> GetTopBooks();
        Task<List<Book>> SearchBook(string name);
    }
}
