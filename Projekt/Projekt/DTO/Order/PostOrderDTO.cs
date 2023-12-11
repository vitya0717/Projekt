using Projekt.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt.DTO.Order
{
    public class PostOrderDTO
    {
        public Guid UserId { get; set; }
        public DateTime OrderDate { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetails>? OrderedItems { get; set; }
    }
}
