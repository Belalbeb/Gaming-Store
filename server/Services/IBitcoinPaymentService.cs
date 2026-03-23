namespace GamingStore.Services
{
    public interface IBitcoinPaymentService
    {
        Task<bool> VerifyTransactionAsync(string btcAddress, string txId, decimal amount);
    }
}
