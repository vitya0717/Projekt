using Projekt.DTO;
using Projekt.Utils;

namespace Projekt.Models
{
    public class User
    {
        public Guid UserId { get; private set; }
        public string Username { get; set; }
        public string Password { get; set; }
        private string? Salt { get; set; }
        public string Email { get; set; }
        public DateTime UserRegDate { get; private set; }
        public IList<Order>? Orders { get; set; } = null;

        public string setSalt()
        {
            Salt = Services.generateRandomSalt(64);
            return Salt;
        }

        public User(string username, string email, string password)
        {
            UserId = Guid.NewGuid();
            Username = username;
            UserRegDate = DateTime.UtcNow;
            Email = email;
            Password = password;
        }

        public PostUserDTO convertToPostUser()
        {
            return new PostUserDTO(Username, Email, Password);
        }
    }
}
