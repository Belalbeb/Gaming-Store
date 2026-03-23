using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GamingStore.models
{
   
    public class Favourite
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public int ProductId { get; set; }

        public ApplicationUser User { get; set; }
        public Product Product { get; set; }
    }
}
