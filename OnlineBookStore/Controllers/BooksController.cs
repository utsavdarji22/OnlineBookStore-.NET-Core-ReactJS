using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStore.Data;
using OnlineBookStore.Model;
using OnlineBookStore.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository bookRepository;
        private readonly Context context;

        public BooksController(IBookRepository bookRepository, Context context)
        {
            this.bookRepository = bookRepository;
            this.context = context;
        }



        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBook([FromForm] BookPostModel bookMod)
        {
            var books = await bookRepository.AddBookAsync(bookMod);
            if (books != null)
            {

                return Ok(books);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage([FromRoute] int id)
        {
            var book = await context.Books.FindAsync(id);
            var path = Path.Combine(Directory.GetCurrentDirectory() + "\\Images\\");
            var filePath = path + book.CoverImage;
            string[] ext = book.CoverImage.Split(".");
            if (System.IO.File.Exists(filePath))
            {
                byte[] b = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(b, "image/" + ext[1]);
            }
            return Ok(filePath);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById([FromRoute] int id)
        {
            var ans = await bookRepository.GetBookById(id);
            return Ok(ans);
        }
        [HttpPut]

        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBook([FromBody] BookModel bookModel)
        {
            var res = await bookRepository.UpdateBook(bookModel);
            return Ok(res);
        }


        [HttpDelete("{id}")]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            await bookRepository.DeleteBookAsync(id);
            return Ok();
        }

        [HttpPut("image/{id}")]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCover([FromRoute] int id, [FromForm] FileUpload formFile)
        {
            var res = await bookRepository.UpdateCover(id, formFile.CoverImage);
            if (res)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await bookRepository.GetAllBooksAsync();
            return Ok(books);
        }
        [HttpGet("Top")]
        public async Task<IActionResult> GetTopBooks()
        {
            var res = bookRepository.GetTopBooks();
            return Ok(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchBook([FromQuery] string name)
        {
            var res = bookRepository.SearchBook(name);
            return Ok(res);
        }

    }

}
