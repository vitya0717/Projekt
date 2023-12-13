using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekt.DTO.Response;

namespace Projekt.Controllers
{
    [Route("products/")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        public ResponseObject responseObject = new();


        [HttpGet("all")]
        public async Task<ActionResult> GetAllProducts()
        {
            try
            {
                await using ProjektDbContext db = new ProjektDbContext();
                var response = db.Products.ToList();

                return Ok(responseObject.create(response.ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(responseObject.create(ex.Message));
            }
        }
    }
}
