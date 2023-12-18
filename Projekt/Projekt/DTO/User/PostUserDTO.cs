using Projekt.Models;
using Projekt.Utils;
using System.Text.Json.Serialization;

namespace Projekt.DTO
{
    public class PostUserDTO
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }

        public PostUserDTO(string username, string password, string email)
        {
            Username = username;
            Password = password;
            Email = email;
        }
    }
}
