using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt.DTO;
using Projekt.DTO.Order;
using Projekt.DTO.Response;
using Projekt.Models;
using Projekt.Utils;

namespace Projekt.Controllers
{
    [Route("webshop/")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public ResponseObject responseObject = new ResponseObject();

        [HttpPost("register")]
        public async Task<ActionResult> addUser(PostUserDTO user)
        {
            User responseUser = null!;
            try
            {
                await using (ProjektDbContext context = new ProjektDbContext())
                {
                    responseUser = new User(user.Username, user.Email, user.Password);
                    responseUser.Salt = user.setSalt();
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

        [HttpGet("userOrders")]
        public async Task<ActionResult> getUserOrders()
        {
            try
            {
                await using ProjektDbContext context = new ProjektDbContext();

                var relationResponse = context.Users
                 .Include(u => u.Orders)!
                 .ThenInclude(s => s.OrderedItems)!
                 .ThenInclude(s2 => s2.Item)
                 .ToList();

                return Ok(responseObject.create(relationResponse, $"Query successfully executed, and got {relationResponse.Count} record", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }

        [HttpGet("users")]
        public async Task<ActionResult> getUsers()
        {
            try
            {
                await using ProjektDbContext context = new ProjektDbContext();

                var response = context.Users.ToList();

                return Ok(responseObject.create(response, $"Query successfully executed, and got {response.Count} record", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }
    }
}
