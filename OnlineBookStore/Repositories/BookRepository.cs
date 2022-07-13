using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Repositories

{
    

    public class BookRepository : IBookRepository
    {
        private readonly Context context;
        private readonly IWebHostEnvironment webHost;
         int i = 0;

        public BookRepository(Context context, IWebHostEnvironment webHost)
        {
            this.context = context;
            this.webHost = webHost;
        }


        public async Task<Book> AddBookAsync(BookPostModel bookMod)
        {
            // if (bookMod.CoverImage.Length > 0)
            //{
            try
            {
                //string path = webHost.WebRootPath + "\\Images";
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Images\\");
                Console.WriteLine(path);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                var init = context.Books.OrderByDescending(x => x.Id).FirstOrDefault();
                if (init == null)
                {
                    i = 0;
                }
                else
                {
                    string[] a= init.CoverImage.Split('C');
                    i = Int32.Parse( a[0]);
                    i++;
                }
                string[] ext = bookMod.CoverImage.FileName.Split(".");
                string file = i + "Cover." + ext[1];
                using (FileStream fs = new FileStream(path + file,FileMode.Create))
                {
                    bookMod.CoverImage.CopyTo(fs);
                    fs.Flush();

                }

                var book = new Book()
                {
                    Title = bookMod.Title,
                    Author = bookMod.Author,
                    CoverImage = file,
                    Quantity = bookMod.Quantity,
                    Price = bookMod.Price,
                    Description = bookMod.Description,
                    ReleaseDate = bookMod.ReleaseDate
                };
                context.Books.Add(book);
                await context.SaveChangesAsync();

                return book;
            }
            catch(Exception e)
            {
                throw (e);
            }
                
            /*}
            else
            {
                var book = new Book()
                {
                    Title = bookMod.Title,
                    Author = bookMod.Author,
                    Quantity = bookMod.Quantity,
                    Price = bookMod.Price,
                    Description = bookMod.Description
                };
                context.Books.Add(book);
                await context.SaveChangesAsync();

                return bookMod;
            }*/
            
        }

        public async Task<Book> GetBookById(int id)
        {
            var result = await context.Books.FindAsync(id);
            return result;
        }
        public async Task<byte[]> GetImage(string name)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory() + "Images\\");
            var filePath = path + name;
            if (File.Exists(filePath))
            {
                byte[] b = await File.ReadAllBytesAsync(filePath);
                return b;
            }
            return null;
        }
        public async Task<Book> UpdateBook(BookModel bookModel)
        {
            var result = await context.Books.FindAsync(bookModel.Id);
            result.Title = bookModel.Title;
            result.Author = bookModel.Author;
            result.Description = bookModel.Description;
            result.Price = bookModel.Price;
            result.Quantity = bookModel.Quantity;
            result.ReleaseDate = bookModel.ReleaseDate;
            await context.SaveChangesAsync();
            return result;
        }
        public async Task DeleteBookAsync(int bookId)
        {
            var book = new Book() { Id = bookId };

            context.Books.Remove(book);
            await context.SaveChangesAsync();
            
        }
        public async Task<bool> UpdateCover(int id, IFormFile file)
        {
            try
            {
                var res = await context.Books.FindAsync(id);
                string path = Path.Combine(Directory.GetCurrentDirectory(), "Images\\");

                string fileName = res.CoverImage;
                using (FileStream fs = new FileStream(path + fileName, FileMode.Create))
                {
                    file.CopyTo(fs);
                    fs.Flush();

                }

                return true;
            }catch(Exception e)
            {
                return false;
            }
            
        }

        public async Task<List<BookModel>> GetAllBooksAsync()
        {
            var records = await context.Books.Select(x => new BookModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Author = x.Author,
                Price = x.Price,
                Quantity = x.Quantity,
                ReleaseDate = x.ReleaseDate
            }).ToListAsync();
            return records;
        }
        public async Task<List<Book>> GetTopBooks()
        {
            var result = context.Books.OrderByDescending(x => x.ReleaseDate).Take(10).ToList() ;
            return result;
        }

        public async Task<List<Book>> SearchBook(string name)
        {
            var result = context.Books.Where(x => x.Title.Contains(name)).ToList();
            return result;
        }
    }
}
