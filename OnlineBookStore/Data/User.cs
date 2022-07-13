using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Data
{
    public class User : IdentityUser
    {   
        public string FullName { get; set; }
        public string Address { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
    }
}
