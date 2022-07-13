using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Model
{
    public class UserModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [Compare("ConfirmPwd")]
        public string Password { get; set; }
        [Required]
        public string ConfirmPwd { get; set; }
        public string FullName { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Address { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
    }
}
