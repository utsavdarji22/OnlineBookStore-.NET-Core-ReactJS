using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Model
{
    public class BookPostModel
    {

        public string Title { get; set; }
        public string Author { get; set; }
        public string ReleaseDate { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public long Quantity { get; set; }

        public IFormFile CoverImage { get; set; }
    }
}
