using System.ComponentModel.DataAnnotations.Schema;

namespace GamingStore.models
{
    public class Order
    {
        public int Id { get; set; }
        public string? UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser? User { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string BtcAddress { get; set; } = string.Empty;
        public string TxId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public float TotalAmount { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
    public enum OrderStatus
    {
        Pending=0, 
        Paid=1,     
        Approved=2,  
        Rejected=3   
    }

}
