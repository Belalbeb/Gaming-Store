using GamingStore.models;

namespace GamingStore.Dto
{
    public class CheckoutDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string TxId { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    }
}
