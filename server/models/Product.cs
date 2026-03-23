using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace GamingStore.models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ProductCategory Category { get; set; }
        public string description { get; set; }
        public double Rate { get; set; }
        public string? Trailor_Link { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public List<ProductImage> ?Images {get; set;}
        public Decimal Price { get; set; }
        public bool Loved { get; set; } = false;

    }
   public enum ProductCategory
    {
        PC=0,
        PS4=1,
        PS5=2,
        XBOX=3

    }
}
