using GamingStore.Dto;
using GamingStore.models;
using GamingStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GamingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Cart : ControllerBase
    {
        private readonly ICartServices _cartService;

        public Cart(ICartServices cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _cartService.GetCartAsync(userId));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(AddToCartDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            return Ok(await _cartService.AddToCartAsync(userId, dto));
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateItem(UpdateCartItemDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _cartService.UpdateItemAsync(userId, dto));
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveItem(int productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _cartService.RemoveItemAsync(userId, productId));
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _cartService.ClearCartAsync(userId));
        }
    }
}
