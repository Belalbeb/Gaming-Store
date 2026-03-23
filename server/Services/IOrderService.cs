using GamingStore.Dto;
using GamingStore.models;

namespace GamingStore.Services
{
    public interface IOrderService
    {
        public Task<Order> CreateOrderWithTxIdAsync(
            string userId,
string name,
string email,
List<CartItemDto> cartItems,
string txId
);
        Task<Order> SubmitTxIdAsync(int orderId, string txId);
        Task<Order> ApproveOrderAsync(int orderId);
        Task<Order> RejectOrderAsync(int orderId);
        Task<List<Order>> GetOrderByIdAsync(string userId);
        public Task<List<Order>> GetOrders();
        public Task<Order> GetOrderByOrderId(int id);
    }
}
