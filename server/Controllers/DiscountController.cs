using GamingStore.Dto;
using GamingStore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GamingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscount discountService;

        public DiscountController(IDiscount discount)
        {
            this.discountService = discount;
        }
        [HttpPost]
        public async Task<IActionResult> AddDiscount(DiscountDto discountDto)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid input");
            var discount = await discountService.AddDiscount(discountDto);
            return Created();
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDiscounts()
        {
            var discounts = await discountService.GetAllDiscount();
            return Ok(discounts);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount([FromRoute] int id)
        {
          await  discountService.DeleteDiscount(id);
            return Ok();


        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiscount([FromRoute] int id, updateDiscountDto discountDto)
        {
            if (!ModelState.IsValid) return BadRequest();
          await  discountService.UpdateDiscount(id, discountDto);
            return Ok();
        }
    }
}
