using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt.Models
{
    public class OrderDetails
    {
        [Key]
        public int OrderDeatilId { get; set; }
        [JsonIgnore]
        public int OrderId { get; set; }
        public Product? Item { get; set; }
        public int? Quantity { get; set; }
    }
}
