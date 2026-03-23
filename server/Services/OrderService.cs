using GamingStore.Dto;
using GamingStore.models;
using Microsoft.EntityFrameworkCore;

namespace GamingStore.Services
{
    public class OrderService:IOrderService
    {
        private readonly AppDbContext _dbContext;
        private readonly IBitcoinPaymentService _btcService;

        public OrderService(AppDbContext dbContext, IBitcoinPaymentService btcService)
        {
            _dbContext = dbContext;
            _btcService = btcService;
        }

        public async Task<Order> CreateOrderWithTxIdAsync(
            string userId,
      string name,
      string email,
      List<CartItemDto> cartItems,
      string txId
  )
        {
            var order = new Order
            {
                UserId=userId,
                Name = name,
                Email = email,
                TxId = txId,
                Status = OrderStatus.Pending ,
                OrderItems = cartItems.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList(),
                TotalAmount = (float)cartItems.Sum(i => i.Quantity * i.Price),
               
            };

            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            return order;
        }

        public async Task<Order> SubmitTxIdAsync(int orderId, string txId)
        {
            var order = await _dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null) throw new Exception("Order not found");

            order.TxId = txId;
            order.Status = OrderStatus.Paid;
            await _dbContext.SaveChangesAsync();

            return order;
        }

        public async Task<Order> ApproveOrderAsync(int orderId)
        {
            var order = await _dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null) throw new Exception("Order not found");

            decimal totalAmount = order.OrderItems.Sum(oi => oi.Price * oi.Quantity);

            bool valid = await _btcService.VerifyTransactionAsync(order.BtcAddress, order.TxId, totalAmount);
            if (!valid) throw new Exception("Transaction invalid");

            order.Status = OrderStatus.Approved;
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order> RejectOrderAsync(int orderId)
        {
            var order = await _dbContext.Orders.FindAsync(orderId);
            if (order == null) throw new Exception("Order not found");

            order.Status = OrderStatus.Rejected;
            await _dbContext.SaveChangesAsync();
            return order;
        }

        private string GenerateBtcAddress()
        {
            // ممكن تستخدم API أو عنوان ثابت للتجربة
            return "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
        }

        public async Task<List<Order>> GetOrderByIdAsync(string userId)
        {
          var orders= _dbContext.Orders.Include(x => x.OrderItems).ThenInclude(p=>p.Product).ThenInclude(x=>x.Images).Where(x => x.UserId == userId).ToList();
            return orders;


        }
        public async Task<List<Order>> GetOrders()
        {
           var orders=await _dbContext.Orders.Include(x => x.OrderItems).ThenInclude(y=>y.Product).ThenInclude(x=>x.Images).ToListAsync();
            return orders;
        }
        public async Task<Order> GetOrderByOrderId(int id)
        {
            var order = await _dbContext.Orders.Include(x => x.OrderItems).ThenInclude(x=>x.Product).ThenInclude(x=>x.Images).FirstOrDefaultAsync(x => x.Id == id);
            return order;
        }

    }
}
