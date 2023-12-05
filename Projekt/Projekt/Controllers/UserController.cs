using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekt.Models;

namespace Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public ActionResult addUser(User user)
        {
            using(ProjektDbContext context = new ProjektDbContext())
            {
                context.Users.Add(user);
            }
            return StatusCode(200, user);
        }
    }
}
