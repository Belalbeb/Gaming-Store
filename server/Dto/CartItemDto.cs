using GamingStore.models;

namespace GamingStore.Dto
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public List<ProductImage> images { get; set; }
        public decimal Price { get; set; }
    }
}
