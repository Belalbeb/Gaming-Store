using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamingStore.models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public List<CartItem> Items { get; set; } = new();
    }
}
