using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekt.DTO;
using Projekt.Models;

namespace Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        public ActionResult addOrder(Order order)
        {
            try
            {

                using (ProjektDbContext context = new ProjektDbContext())
                {

                    context.Orders.Add(order);
                    context.SaveChanges();
                }
                return StatusCode(200, order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
