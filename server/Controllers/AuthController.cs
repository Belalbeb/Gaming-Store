using GamingStore.Dto;
using GamingStore.models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GamingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public IConfiguration Configuration { get; }
        public RoleManager<IdentityRole> RoleManager { get; }

        public AuthController(UserManager<ApplicationUser> userManager,IConfiguration configuration,RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            Configuration = configuration;
            RoleManager = roleManager;
        }
        async Task<string> GenerateTokenAsync(ApplicationUser user)
        {
            List<Claim> claims = new()
{
    new Claim(ClaimTypes.NameIdentifier, user.Id),
    new Claim(ClaimTypes.Email, user.Email),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};

            var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken jwtSecurity = new JwtSecurityToken(
                issuer: Configuration["Jwt:Issuer"],
                audience: Configuration["Jwt:Audience"],
                claims: claims,
                signingCredentials: signingCredentials,
                expires:DateTime.Now.AddHours(2)

                );
            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurity);
           var expiration = jwtSecurity.ValidTo;
            return token;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Input");
            ApplicationUser applicationUser = new ApplicationUser()
            {
                Email = userDto.Email,
                UserName=userDto.Email

            };

            //await RoleManager.CreateAsync(new IdentityRole("user"));
         
           var result=await  userManager.CreateAsync(applicationUser, userDto.Password);

            if (!result.Succeeded)
            {

                if (result.Errors.Any(e => e.Code.StartsWith("Password")))
                {
                    return BadRequest("Password must be strong: use letters, numbers and special characters.");
                }
                return BadRequest(result.Errors);
            }

            await userManager.AddToRoleAsync(applicationUser, "user");
            return Ok(new { message = "Registered Success" });


        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("INcorrect UserNaqme or Password");
         var FoundedUser=await userManager.FindByEmailAsync(loginDto.Email);
            if(FoundedUser==null)
                return BadRequest("INcorrect UserNaqme or Password");
         var validUser=await userManager.CheckPasswordAsync(FoundedUser, loginDto.Password);
            //await RoleManager.CreateAsync(new IdentityRole("admin"));

            //await  userManager.AddToRoleAsync(FoundedUser, "admin");
            if(!validUser)
                return BadRequest("INcorrect UserNaqme or Password");
            //Generate token
            var roles =await userManager.GetRolesAsync(FoundedUser);
            
            
            return Ok(new
            {
                token=await GenerateTokenAsync(FoundedUser),
                userId = FoundedUser.Id,
                roles =roles
            });
        }
        [HttpPost("google")]
        public async Task<IActionResult> GoogleSignIn([FromBody] TokenDto dto)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(dto.token);
                var email = payload.Email;
                string ?name = payload.Name;

                var user =await userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    user = new ApplicationUser { Email = email, Name = name};
                   await userManager.CreateAsync(user);
                    
                }

                var jwt =await GenerateTokenAsync(user); 
                return Ok(new { token = jwt, user.Id});
            }
            catch
            {
                return Unauthorized("Invalid Google token");
            }
        }
        [HttpGet("GetEmail/{UserId}")]
        public async Task<IActionResult> GetEmail([FromRoute]string UserId)
        {
            var user =await userManager.FindByIdAsync(UserId);
            var email = await userManager.GetEmailAsync(user);
                return Ok(new {email=email});
        }
        [HttpPost("checkToken")]
       
        public IActionResult CheckToken([FromBody] string token)
        {
            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is missing" });

            try
            {
           
                var jwtHandler = new JwtSecurityTokenHandler();

                if (!jwtHandler.CanReadToken(token))
                    return Unauthorized(new { message = "Invalid token" });

                var jwtToken = jwtHandler.ReadJwtToken(token);

                var exp = jwtToken.Payload.Exp;
                if (exp == null)
                    return Unauthorized(new { message = "Token invalid, no exp" });

                var expDate = DateTimeOffset.FromUnixTimeSeconds((long)exp);
                if (expDate < DateTimeOffset.UtcNow)
                    return Unauthorized(new { message = "Token expired" });

              
                return Ok(new { message = "Token valid" });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Token invalid", error = ex.Message });
            }
        }
    }

}

