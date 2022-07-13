using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Model
{
    public class FileUpload
    {

        public IFormFile CoverImage { get; set; }
    }
}
