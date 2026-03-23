using GamingStore.Dto;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CheckoutDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var order = await _orderService.CreateOrderWithTxIdAsync(
                userId!,
                dto.Name,
                dto.Email,
                dto.CartItems,
                dto.TxId
            );

            return Ok();
        }
        [HttpGet("getUserOrder")]
        public async Task<IActionResult> GetOrderById()
            {
          var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders =await _orderService.GetOrderByIdAsync(userId);
            return Ok(new { orders = orders });

        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders =await _orderService.GetOrders();
            return Ok(orders);

        }
        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetByOrderId([FromRoute]int id)
        {
            var order =await _orderService.GetOrderByOrderId(id);
            return Ok(order);
        }
        [HttpGet("Accept/{id}")]
        public async Task<IActionResult> ApproveOrder([FromRoute] int id)
        {
           await _orderService.ApproveOrderAsync(id);
            return Ok();

        }
        [HttpGet("Reject/{id}")]
        public async Task<IActionResult> RejectOrder([FromRoute] int id)
        {
            await _orderService.RejectOrderAsync(id);
            return Ok();

        }

    }
}
