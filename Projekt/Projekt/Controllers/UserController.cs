using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Projekt.DTO;
using Projekt.DTO.Order;
using Projekt.DTO.Response;
using Projekt.DTO.User;
using Projekt.Models;
using Projekt.Utils;
using BCrypt.Net;

namespace Projekt.Controllers
{
    [Route("webshop/")]
    [ApiController]
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
        [Authorize(Roles = "Admin, User")]
        [HttpDelete("deleteUser")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            try
            {
                await using var context = new ProjektDbContext();

                var userFind = context.Users.FirstOrDefault(item => item.UserId == userId);

                if (userFind == null)
                {
                    return Ok(responseObject.create(null!, "Nincs ilyen felhasználó", 400));
                }
                context.Users.Remove(userFind);
                context.SaveChanges();
                return Ok(responseObject.create(null!, "Felhasználó sikeresen törölve!", 200));


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("orders")]
        public async Task<ActionResult> getUserOrder(Guid id)
        {
            try
            {
                await using ProjektDbContext context = new ProjektDbContext();

                var relationResponse = context.Users
                 .Include(u => u.Orders)!
                 .ThenInclude(s => s.OrderedItems)!
                 .ThenInclude(s2 => s2.Item).ToList().FirstOrDefault(us => us.UserId == id);

                return Ok(responseObject.create(relationResponse!, $"Query successfully executed, and got 1 record", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }



        [Authorize(Roles = "User, Admin")]
        [HttpPut("settings")]
        public async Task<ActionResult> UpdateUser(UpdateUserDTO user)
        {
            try
            {
                await using ProjektDbContext context = new ProjektDbContext();

                User updated = context.Users!.FirstOrDefault(item => item.UserId! == user.UserId!)!;
                updated.UserId = user.UserId;
                updated.Email = user.Email;
                updated.Username = user.Username;

                if(user.NewPassword!.Equals(string.Empty))
                {
                    return Ok(responseObject.create(null!, "A jelszó nem lehet üres!", 400));
                }

                if (BCrypt.Net.BCrypt.Verify(user.NewPassword, updated.Password))
                {
                    return Ok(responseObject.create(null!, "A jelszó nem lehet ugyanaz!", 400));
                }

                if (!BCrypt.Net.BCrypt.Verify(user.OldPassword, updated.Password))
                {
                    return Ok(responseObject.create(null!, "Hibás jelszó", 400));
                }

                if(BCrypt.Net.BCrypt.HashPassword(user.NewPassword) != BCrypt.Net.BCrypt.HashPassword(user.OldPassword))
                {
                    updated.Password = BCrypt.Net.BCrypt.HashPassword(user.NewPassword);
                }
                context.Update(updated);
                context.SaveChanges();

                return Ok(responseObject.create(updated, $"Sikeres mentés!", 200));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(null!, ex.Message, 400));
            }
        }
        [Authorize(Roles = "Admin, User")]
        [HttpGet("user/{id}")]
        public async Task<ActionResult> getUser(Guid id)
        {
            try
            {
                await using ProjektDbContext context = new ProjektDbContext();

                var response = await context.Users.FirstOrDefaultAsync(item => item.UserId == id);

                if (response == null)
                {
                    return Ok(responseObject.create(null!, $"A megadott felhasználó nem létezik!", 200));
                }
                return Ok(responseObject.create(response, $"Sikeres lekérdezés", 200));
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
