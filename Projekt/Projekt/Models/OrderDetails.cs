using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt.Models
{
    public class OrderDetails
    {
        [Key]
        public int orderDeatilId { get; set; }
        [JsonIgnore]
        public int orderId { get; set; }
        public Product? Item { get; set; }
        public int? Quantity { get; set; }
    }
}
