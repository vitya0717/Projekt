namespace Projekt.Models
{
    public class Order
    {
        public Guid OrderId { get;  set; }
        public required string ProductName { get; set; }
        public required int ProductPrice { get; set; }
        public required string ProductDescription { get; set; }
        public DateTime OrderData { get; set; }

    }
}
