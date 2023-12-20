using Microsoft.AspNetCore.Authorization;
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
    [ApiController, Authorize]
    public class UserController : ControllerBase
    {

        public ResponseObject responseObject = new ResponseObject();

        [Authorize(Roles = "Admin, User")]
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

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult> getAllUser()
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
