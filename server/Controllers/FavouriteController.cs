using GamingStore.Dto;
using GamingStore.models;
using GamingStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GamingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavouriteController : ControllerBase
    {
        private readonly IFavourite favourite;

        public FavouriteController(IFavourite favourite)
        {
            this.favourite = favourite;
        }
        [HttpPost]
        public async Task<IActionResult> AddToFavourite([FromBody]int ProductId)
        {
            FavouriteDto dto = new FavouriteDto()
            {
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                ProductId = ProductId
            };
            var result =await favourite.AddToFavourite(dto);
            if (!result)
                return BadRequest("wrong Data Request");
            return Created();
        }
        [HttpGet]
        public async Task<IActionResult> GetFavourite()
        {
            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Ok(new { products=await favourite.GetInFavourite(UserId) });
        }
        [HttpDelete("removeFavourite/{productId}")]
        public async Task<IActionResult> DeleteFromFavourite([FromRoute] int productId)
        {
            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            FavouriteDto dto = new FavouriteDto()
            {
                UserId = UserId!,
                ProductId = productId
            };
            var result = await favourite.RemoveFromFavourite(dto);
            if (!result) return BadRequest();
            return Ok();


        }
    }
}
