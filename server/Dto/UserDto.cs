using System.ComponentModel.DataAnnotations;

namespace GamingStore.Dto
{
    public class UserDto
    {
        [EmailAddress]
        public string Email { get; set; }


        public string Password { get; set; }
      

    }
}
