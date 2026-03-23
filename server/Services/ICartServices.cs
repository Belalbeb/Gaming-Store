using GamingStore.Dto;

namespace GamingStore.Services
{
    public interface ICartServices
    {
        Task<CartDto> GetCartAsync(string userId);
        Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto);
        Task<CartDto> UpdateItemAsync(string userId, UpdateCartItemDto dto);
        Task<bool> RemoveItemAsync(string userId, int productId);
        Task<bool> ClearCartAsync(string userId);
    }
}
