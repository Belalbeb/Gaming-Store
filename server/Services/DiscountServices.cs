using GamingStore.Dto;
using GamingStore.models;
using Microsoft.EntityFrameworkCore;

namespace GamingStore.Services
{
    public class DiscountServices : IDiscount
    {
        private readonly AppDbContext dbContext;

        public DiscountServices(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Discount> AddDiscount(DiscountDto discountDto)
        {
            Discount discount = new Discount()
            {
                Code = discountDto.Code,
                Percentage=discountDto.Percentage,
                ExpiryDate = discountDto.ExpiryDate,
                StartDate = discountDto.StartDate,
                UsageLimit = discountDto.UsageLimit,
                UsedCount = 0,
                IsActive = true
            };

           await dbContext.discounnts.AddAsync(discount);
            await dbContext.SaveChangesAsync();

            return discount;
        }
        public async Task<Discount?> ValidateDiscount(string code)
        {
            var discount = await dbContext.discounnts
                .FirstOrDefaultAsync(d => d.Code == code);

            if (discount == null) return null;



            if (!discount.IsActive)
                return null;

            if (DateTime.Now < discount.StartDate || DateTime.Now > discount.ExpiryDate)
                return null;

            if (discount.UsedCount >= discount.UsageLimit)
                return null;

            return discount;
        }
        public async Task<decimal> ApplyDiscount(string code, decimal total)
        {
            var discount = await ValidateDiscount(code);

            if (discount == null)
                return total;

            var discountValue = total * discount.Percentage / 100;

            return total - discountValue;
        }
        public async Task<List<Discount>> GetAllDiscount()
        {
            var discounts =await dbContext.discounnts.ToListAsync();
            return discounts;
        }
        public async Task<bool> DeleteDiscount(int id)
        {
            var discount =await dbContext.discounnts.FirstOrDefaultAsync(x => x.Id == id);
            if (discount == null) return false;
            dbContext.discounnts.Remove(discount);
            await dbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateDiscount(int id,updateDiscountDto discountDto)
        {
            var discount = await dbContext.discounnts.FirstOrDefaultAsync(x => x.Id == id);
            if (discount == null) return false;
            discount.IsActive = discountDto.isActive;
            discount.Percentage = discountDto.percentage;
            dbContext.discounnts.Update(discount);
           await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
