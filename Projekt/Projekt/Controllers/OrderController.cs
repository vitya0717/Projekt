﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;
using Projekt.DTO;
using Projekt.DTO.Order;
using Projekt.Models;

namespace Projekt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost("orderProduct")]
        public async Task<ActionResult> orderItems(PostOrderDeatilDTO details)
        {
            try
            {
                await using var context = new ProjektDbContext();

                OrderDetails orderDetails = new()
                {
                    orderDeatilId = 0,
                    orderId = details.orderId
                };
                var item = context.Products.FirstOrDefault(s => s.ProductId == details.ProductId);
                orderDetails.Item = item;

                context.OrderDetails.Add(orderDetails);
                context.SaveChanges();
                return Ok(orderDetails);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addOrder")]
        public async Task<ActionResult> createOrder(PostOrderDTO order)
        {
            try
            {
                await using var context = new ProjektDbContext();
                Order newOrder = new()
                {
                    OrderId = 0,
                    UserId = order.UserId,
                    OrderDate = order.OrderDate
                };
                context.Orders.Add(newOrder);

                context.SaveChanges();
                return Ok(newOrder);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
