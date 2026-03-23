namespace GamingStore.models
{
    public class Discount
    {
        public int Id { get; set; }

        public string Code { get; set; } = string.Empty;

        public decimal Percentage { get; set; }

        public DateTime ?StartDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public bool IsActive { get; set; }

        public int UsageLimit { get; set; }

        public int UsedCount { get; set; }
    }
}
