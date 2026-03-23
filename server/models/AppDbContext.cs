using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace GamingStore.models
{
    public class AppDbContext:IdentityDbContext<ApplicationUser>
    {
        public AppDbContext():base()
        {
            
        }
        public AppDbContext(DbContextOptions<AppDbContext> dbContextOptions):base(dbContextOptions)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //    modelBuilder.Entity<Product>()
            //.Property(p => p.Category)
            //.HasConversion<string>();
            modelBuilder.Entity<Order>()
         .Property(o => o.Amount)
         .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(o => o.Price)
                .HasPrecision(18, 2);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
       public DbSet<Product> products { set; get; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<CartItem> cartItems { get; set; }
        public DbSet<Favourite> favourites { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }
        public DbSet<Discount>  discounnts { get; set; }
    }
}
