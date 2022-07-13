using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineBookStore.Data
{
    public class Cart
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User user { get; set; }
        [Required]
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public virtual Book book { get; set; }
        public int Quantity { get; set; }
    }
}
