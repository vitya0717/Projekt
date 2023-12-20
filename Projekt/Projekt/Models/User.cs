using Projekt.DTO;
using Projekt.Utils;
using System.Text.Json.Serialization;

namespace Projekt.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public DateTime UserRegDate { get; set; }

        [JsonIgnore]
        public IList<Order>? Orders { get; set; } = null;

    }
}
