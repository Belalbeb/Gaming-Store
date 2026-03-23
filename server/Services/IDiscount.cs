using GamingStore.Dto;
using GamingStore.models;

namespace GamingStore.Services
{
    public interface IDiscount
    {
        Task<Discount> AddDiscount(DiscountDto discountDto);
        Task<Discount?> ValidateDiscount(string code);
        public Task<decimal> ApplyDiscount(string code, decimal total);
        public Task<List<Discount>> GetAllDiscount();
        public  Task<bool> DeleteDiscount(int id);
        public  Task<bool> UpdateDiscount(int id, updateDiscountDto discountDto);
    }
}
