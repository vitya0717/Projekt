using Projekt.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt.DTO.Order
{
    public class PostOrderDeatilDTO
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        
    }
}
