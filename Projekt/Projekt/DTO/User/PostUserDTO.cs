using Projekt.Models;
using Projekt.Utils;

namespace Projekt.DTO
{
    public class PostUserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        internal string Salt { get; set; }
        public string Email { get; set; }

        public string setSalt()
        {
            Salt = Services.generateRandomSalt(64);
            return Salt;
        }

        public PostUserDTO(string username, string password, string email)
        {
            Username = username;
            Password = password;
            Email = email;
        }

        internal User convertToUser()
        {
            User responseUser = new User(Username, Email, Password);
            responseUser.Password = Services.generateHashPassword(Password, Salt);

            return responseUser;
        }
    }
}
