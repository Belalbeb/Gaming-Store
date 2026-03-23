using GamingStore.models;

namespace GamingStore.Dto
{
    public class ProductDto
    {
        public string Name { get; set; }
        public ProductCategory Category { get; set; }
        public string description { get; set; }
        public string Image { get; set; }
        public int Price { get; set; }
    }
}
