using GamingStore.models;

namespace GamingStore.wwwroot.images.products
{
    public class ProductCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? Trailer_Link { get; set; }
        public double Rate { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public ProductCategory Category { get; set; }

        public IFormFile? CardImage { get; set; }               // الصورة الرئيسية
        public List<IFormFile>? ProductImages { get; set; }
    }
}