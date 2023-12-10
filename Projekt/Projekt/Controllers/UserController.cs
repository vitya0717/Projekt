using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt.DTO;
using Projekt.Models;

namespace Projekt.Controllers
{
    [Route("webshop/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult> addUser(PostUserDTO user)
        {
            try
            {
                await using (ProjektDbContext context = new ProjektDbContext())
                {
                    context.Users.Add(user.convertToUser());
                    context.SaveChanges();
                }
                return StatusCode(200, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("users")]
        public async Task<ActionResult> getUsers()
        {
            try
            {
                await using (ProjektDbContext context = new ProjektDbContext())
                {
                    var response = context.Users
                 .Include(u => u.Orders)
                 .ToList();
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
