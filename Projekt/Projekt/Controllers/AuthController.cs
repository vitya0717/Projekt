using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekt.DTO.Response;
using Projekt.DTO;
using Projekt.Models;
using Projekt.Utils;
using Projekt.DTO.User;
using Org.BouncyCastle.Asn1.Ocsp;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Projekt.Controllers
{
    [Route("webshop/auth/")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public ResponseObject responseObject = new();
        private readonly IConfiguration? _configuration;

        public AuthController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> registerUser(PostUserDTO request)
        {
            User user = new();
            try
            {
                await using (ProjektDbContext context = new())
                {
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                    user.UserId = Guid.NewGuid();
                    user.Username = request.Username!;
                    user.Role = "User";
                    user.Password = passwordHash!;
                    user.Email = request.Email!;
                    user.UserRegDate = DateTime.UtcNow;
                    

                    context.Users.Add(user);
                    context.SaveChanges();
                }
                return Ok(responseObject.create(user, "Successfuly registered!", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> loginUser(LoginUserDTO request)
        {

            try
            {
                await using (ProjektDbContext context = new())
                {
                    User responseUser = context.Users.FirstOrDefault(x => x.Email == request.Email)!;

                    if (responseUser == null) return BadRequest(responseObject.create(null!, "Incorrect email or password!", 400));

                    if(!BCrypt.Net.BCrypt.Verify(request.Password, responseUser.Password)) return BadRequest(responseObject.create(null!, "Incorrect email or password!", 400));

                    string responseToken = GenerateToken(responseUser);

                    return Ok(responseToken);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }

        private string GenerateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.Username!),
                new Claim("userId", user.UserId.ToString()),
                new Claim("role", user.Role!)
            };

            string myKey = _configuration?.GetSection("AppSettings:Token").Value!;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(myKey));
            //var key = new SymmetricSecurityKey(Convert.FromBase64String(myKey));


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

    }
}
