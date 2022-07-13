using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Model
{
    public class CartModel
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
