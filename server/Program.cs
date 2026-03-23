
using GamingStore.models;
using GamingStore.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;

namespace GamingStore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnnectionString")));
            builder.Services.AddControllers()
             .AddJsonOptions(options =>
             {
                 options.JsonSerializerOptions.ReferenceHandler =
                     System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
             });
            builder.Services.AddScoped<IProduct, ProductServices>();
            builder.Services.AddScoped<ICartServices, CartService>();
            builder.Services.AddScoped<IDiscount, DiscountServices>();
            builder.Services.AddScoped<IFavourite, FavouriteServices>();
            builder.Services.AddHttpClient();
            builder.Services.AddScoped<IBitcoinPaymentService, BitcoinPaymentService>();
            builder.Services.AddScoped<IOrderService, OrderService>();

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                 
                    ValidateIssuerSigningKey = true,
                    
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseCors(x => {
                x.AllowAnyHeader();
                x.AllowAnyOrigin();
                x.AllowAnyMethod();

            });
            app.UseAuthentication();
            app.UseAuthorization();
     


            app.MapControllers();

            app.Run();
        }
    }
}
