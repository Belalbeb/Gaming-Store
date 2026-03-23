using GamingStore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GamingStore.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminOrderController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public AdminOrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("{orderId}/approve")]
        public async Task<IActionResult> Approve(int orderId)
        {
            try
            {
                var order = await _orderService.ApproveOrderAsync(orderId);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("{orderId}/reject")]
        public async Task<IActionResult> Reject(int orderId)
        {
            var order = await _orderService.RejectOrderAsync(orderId);
            return Ok(order);
        }
    }
}
