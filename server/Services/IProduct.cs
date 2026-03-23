using GamingStore.models;
using GamingStore.wwwroot.images.products;

namespace GamingStore.Services
{
    public interface IProduct
    {
      Task<List<Product>> GetAllProductAsync();
        Task AddProduct(ProductCreateDto product);
        public Task<bool> UpdateLoved(int id, bool liked);
        public  Task<Product> GetProductById(int id);
        public Task<List<Product>> GetProductWithSameCategory(ProductCategory category);
        public  Task UpdateProduct(int id, ProductCreateDto request);
        public Task<List<int>> GetAllCat();
    }
}
