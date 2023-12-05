namespace Projekt.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string UserName { get; set; }
        public DateTime UserRegDate { get; private set; }

        public IList<Order>? Orders { get; set; }

    }
}
