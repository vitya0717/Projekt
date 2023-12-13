using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekt.DTO.Response;
using Projekt.DTO;
using Projekt.Models;
using Projekt.Utils;
using Projekt.DTO.User;

namespace Projekt.Controllers
{
    [Route("webshop/auth/")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public ResponseObject responseObject = new();

        [HttpPost("register")]
        public async Task<ActionResult> registerUser(PostUserDTO user)
        {
            User responseUser = null!;
            try
            {
                await using (ProjektDbContext context = new())
                {
                    responseUser = new User(user.Username, user.Email, user.Password)
                    {
                        Salt = user.setSalt()
                    };
                    responseUser.Password = Services.generateHashPassword(user.Password, responseUser.Salt);

                    context.Users.Add(responseUser);
                    context.SaveChanges();
                }
                return Ok(responseObject.create(responseUser, "Successful registration!", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> loginUser(LoginUserDTO user)
        {
            await using ProjektDbContext context = new();
            User responseUser = context.Users.FirstOrDefault(x => x.Email == user.Email)!;
            try
            {

                if (responseUser == null) return Ok(responseObject.create(null!, "Incorrect email or password!", 400));

                if (responseUser.Password != Services.generateHashPassword(user.Password!, responseUser.Salt!))
                {
                    return Ok(responseObject.create(null!, "Incorrect email or password!", 400));
                }

                return Ok(responseObject.create(responseUser, "Successful logged in!", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }

    }
}
