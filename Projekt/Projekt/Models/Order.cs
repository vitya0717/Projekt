using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekt.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public Guid UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public ICollection<OrderDetails>? OrderedItems { get; set; } 

    }
}
