using System.Text.Json;

namespace GamingStore.Services
{
    public class BitcoinPaymentService:IBitcoinPaymentService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public BitcoinPaymentService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<bool> VerifyTransactionAsync(string btcAddress, string txId, decimal amount)
        {
            var client = _httpClientFactory.CreateClient();
            string url = $"https://api.blockcypher.com/v1/btc/main/txs/{txId}";
            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode) return false;

            var json = await response.Content.ReadAsStringAsync();
            using JsonDocument doc = JsonDocument.Parse(json);

            var outputs = doc.RootElement.GetProperty("outputs");
            foreach (var output in outputs.EnumerateArray())
            {
                string address = output.GetProperty("addresses")[0].GetString()!;
                decimal valueBtc = output.GetProperty("value").GetDecimal() / 100_000_000m;

                if (address == btcAddress && valueBtc >= amount)
                    return true;
            }
            return false;
        }
    }
}
