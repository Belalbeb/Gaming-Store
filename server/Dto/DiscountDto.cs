namespace GamingStore.Dto
{
    public class DiscountDto
    {
        public string Code { get; set; } = string.Empty;

        public decimal Percentage { get; set; }

        public DateTime? StartDate { get; set; } = DateTime.Now;

        public DateTime ExpiryDate { get; set; } = DateTime.Now.AddDays(5);

        public bool IsActive { get; set; } = true;

        public int UsageLimit { get; set; } = 100;
    }
}
