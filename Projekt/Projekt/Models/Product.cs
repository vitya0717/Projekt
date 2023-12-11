using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public byte[]? ProductImage { get; set; }
        public int? ProductPrice { get; set; }
        public string? ProductDescription { get; set; }

    }
}
