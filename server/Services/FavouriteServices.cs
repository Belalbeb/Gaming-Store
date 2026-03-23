using GamingStore.Dto;
using GamingStore.models;
using Microsoft.EntityFrameworkCore;
using System.CodeDom;
using System.Threading.Tasks;

namespace GamingStore.Services
{
    public class FavouriteServices : IFavourite
    {
        private readonly AppDbContext dbContext;

        public FavouriteServices(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<bool> AddToFavourite(FavouriteDto favouriteDto)
        {
            if (favouriteDto == null)
                return false;

            var exists = await dbContext.favourites
                .AnyAsync(f => f.UserId == favouriteDto.UserId &&
                               f.ProductId == favouriteDto.ProductId);

            if (exists)
                return false;

            var product = await dbContext.products
                .FirstOrDefaultAsync(x => x.Id == favouriteDto.ProductId);

            if (product == null)
                return false;

            var favourite = new Favourite
            {
                UserId = favouriteDto.UserId,
                ProductId = favouriteDto.ProductId
            };

            product.Loved = true;

            await dbContext.favourites.AddAsync(favourite);
            await dbContext.SaveChangesAsync();

            return true;
        }
        public async Task<bool> RemoveFromFavourite(FavouriteDto favouriteDto)
        {
            if (favouriteDto == null)
                return false;

            var favourite = await dbContext.favourites
                .FirstOrDefaultAsync(x => x.UserId == favouriteDto.UserId
                                       && x.ProductId == favouriteDto.ProductId);

            if (favourite == null)
                return false;

            var product = await dbContext.products
                .FirstOrDefaultAsync(x => x.Id == favouriteDto.ProductId);

            if (product != null)
                product.Loved = false;

            dbContext.favourites.Remove(favourite);

            await dbContext.SaveChangesAsync();

            return true;
        }
        public async Task<List<Product>> GetInFavourite(string userId)
        {
            var products = await dbContext.favourites
             .Where(f => f.UserId == userId)
             .Include(f => f.Product)
                .ThenInclude(p => p.Images)
                   .Select(f => f.Product)
                        .ToListAsync();

            return products;
        }
    }
}
