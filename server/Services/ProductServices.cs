using Azure.Core;
using GamingStore.models;
using GamingStore.wwwroot.images.products;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GamingStore.Services
{
    public class ProductServices : IProduct
    {
        private readonly IWebHostEnvironment env;

        public ProductServices(AppDbContext context, IWebHostEnvironment env)
        {
            Context = context;
            this.env = env;
        }

        public AppDbContext Context { get; }

        public async Task<List<Product>> GetAllProductAsync()
        {
            List<Product> products = await Context.products.Include(x=>x.Images).ToListAsync();
                return products;
            
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await Context.products.Include(x => x.Images).FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }
        public async Task AddProduct(ProductCreateDto request)
        {
            // إنشاء المنتج بدون حفظه أولاً
            var product = new Product
            {
                Name = request.Name,
                description = request.Description,
                Price = request.Price,
                Trailor_Link = request.Trailer_Link,
                Rate = request.Rate,
                ReleaseDate = request.ReleaseDate,
                Category = request.Category,
                Images = new List<ProductImage>()
            };

            // مسار فولدر الصور العام
            var productsRoot = Path.Combine(env.WebRootPath, "images/products");
            Directory.CreateDirectory(productsRoot);

            // حفظ صورة الكارد
            if (request.CardImage != null)
            {
                var cardImageName = "card_" + Guid.NewGuid() + Path.GetExtension(request.CardImage.FileName);
                var cardImagePath = Path.Combine(productsRoot, cardImageName);

                using (var stream = new FileStream(cardImagePath, FileMode.Create))
                {
                    await request.CardImage.CopyToAsync(stream);
                }

                product.Images.Add(new ProductImage
                {
                    ImageUrl = $"/images/products/{cardImageName}",
                    IsMain = true
                });
            }

            // حفظ باقي صور المنتج
            if (request.ProductImages != null && request.ProductImages.Count > 0)
            {
                int index = 1;
                foreach (var file in request.ProductImages)
                {
                    var imageName = $"image_{index}_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var imagePath = Path.Combine(productsRoot, imageName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    product.Images.Add(new ProductImage
                    {
                        ImageUrl = $"/images/products/{imageName}",
                        IsMain = false
                    });

                    index++;
                }
            }

            // أخيرًا، حفظ المنتج مع كل الصور دفعة واحدة
            Context.products.Add(product);
            await Context.SaveChangesAsync();
        }
        public async Task UpdateProduct(int id, ProductCreateDto request)
        {
            // جلب المنتج الموجود من DB
            var product = await Context.products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                throw new Exception("Product not found");

            // تحديث الحقول العادية
            product.Name = request.Name;
            product.description = request.Description;
            product.Price = request.Price;
            product.Trailor_Link = request.Trailer_Link;
            product.Rate = request.Rate;
            product.ReleaseDate = request.ReleaseDate;
            product.Category = request.Category;

            var productsRoot = Path.Combine(env.WebRootPath, "images/products");
            Directory.CreateDirectory(productsRoot);

            // تحديث صورة الكارد لو فيه صورة جديدة
            if (request.CardImage != null)
            {
                // اختياري: احذف الصورة القديمة Main
                var oldCard = product.Images.FirstOrDefault(img => img.IsMain);
                if (oldCard != null)
                {
                    var oldPath = Path.Combine(env.WebRootPath, oldCard.ImageUrl.TrimStart('/'));
                    if (File.Exists(oldPath)) File.Delete(oldPath);

                    product.Images.Remove(oldCard);
                }

                var cardImageName = "card_" + Guid.NewGuid() + Path.GetExtension(request.CardImage.FileName);
                var cardImagePath = Path.Combine(productsRoot, cardImageName);

                using (var stream = new FileStream(cardImagePath, FileMode.Create))
                {
                    await request.CardImage.CopyToAsync(stream);
                }

                product.Images.Add(new ProductImage
                {
                    ImageUrl = $"/images/products/{cardImageName}",
                    IsMain = true
                });
            }

            // تحديث باقي صور المنتج (اختياري: حذف القديم وإضافة الجديد)
            if (request.ProductImages != null && request.ProductImages.Count > 0)
            {
                // احذف الصور القديمة اللي مش Main
                var oldImages = product.Images.Where(img => !img.IsMain).ToList();
                foreach (var img in oldImages)
                {
                    var oldPath = Path.Combine(env.WebRootPath, img.ImageUrl.TrimStart('/'));
                    if (File.Exists(oldPath)) File.Delete(oldPath);
                    product.Images.Remove(img);
                }

                // إضافة الصور الجديدة
                int index = 1;
                foreach (var file in request.ProductImages)
                {
                    var imageName = $"image_{index}_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var imagePath = Path.Combine(productsRoot, imageName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    product.Images.Add(new ProductImage
                    {
                        ImageUrl = $"/images/products/{imageName}",
                        IsMain = false
                    });

                    index++;
                }
            }

            // حفظ التغييرات
            await Context.SaveChangesAsync();
        }
        public async Task<bool> UpdateLoved(int id,bool liked)
        {
         var product=await Context.products.FirstOrDefaultAsync(product => product.Id == id);
            product!.Loved = liked;
           await Context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Product>> GetProductWithSameCategory(ProductCategory category)
        {
            var products = await Context.products
                .Where(p => p.Category == category)
                .Include(p => p.Images)
                .ToListAsync();

            return products;
        }
        public async Task<List<int>> GetAllCat()
        {
            var result = await Context.products
                .GroupBy(p => p.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            List<int> cats = new List<int>();

            cats.Add(result.FirstOrDefault(x => x.Category == ProductCategory.PC)?.Count ?? 0);
            cats.Add(result.FirstOrDefault(x => x.Category == ProductCategory.PS5)?.Count ?? 0);
            cats.Add(result.FirstOrDefault(x => x.Category == ProductCategory.PS4)?.Count ?? 0);
            cats.Add(result.FirstOrDefault(x => x.Category == ProductCategory.XBOX)?.Count ?? 0);

            return cats;
        }
    }
}
