using Microsoft.AspNetCore.Identity;

namespace GamingStore.models
{
    public class ApplicationUser:IdentityUser
    {
        public string? Name { get; set; }
     
    }
}
