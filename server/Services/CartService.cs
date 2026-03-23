using GamingStore.Dto;
using GamingStore.models;
using Microsoft.EntityFrameworkCore;

namespace GamingStore.Services
{
    public class CartService : ICartServices
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            this._context = context;
        }
        public async Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto)
        {
            var cart = await _context.carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.carts.Add(cart);
            }

            var item = cart.Items?.FirstOrDefault(i => i.ProductId == dto.ProductId);

            if (item == null)
            {
                cart.Items.Add(new CartItem()
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                });
            }
            else
            {
                item.Quantity += dto.Quantity;
            }

            await _context.SaveChangesAsync();
            return await GetCartAsync(userId);

        }

        public async Task<bool> ClearCartAsync(string userId)
        {
            var cart = await _context.carts
          .Include(c => c.Items)
          .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return false;

            cart.Items.Clear();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CartDto> GetCartAsync(string userId)
        {
            var cart = await _context.carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return new CartDto();

            return new CartDto
            {
                Id = cart.Id,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.Product.Name,
                    Quantity = i.Quantity,
                
                    images=i.Product.Images,
                    Price = (decimal)i.Product.Price
                }).ToList(),
                TotalPrice = (decimal)cart.Items.Sum(i => i.Quantity * i.Product.Price)
            };

        }

        public async Task<bool> RemoveItemAsync(string userId, int productId)
        {
            var cart = await _context.carts
           .Include(c => c.Items)
             .FirstOrDefaultAsync(c => c.UserId == userId);

            var item = cart?.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item == null) return false;

            cart.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CartDto> UpdateItemAsync(string userId, UpdateCartItemDto dto)
        {
            var cart = await _context.carts
            .Include(c => c.Items)
           .FirstOrDefaultAsync(c => c.UserId == userId);

            var item = cart?.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);

            if (item == null) throw new Exception("Item not found");

            item.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();

            return await GetCartAsync(userId);
        }
    }
}
