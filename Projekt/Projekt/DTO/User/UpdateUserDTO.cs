namespace Projekt.DTO.User
{
    public class UpdateUserDTO
    {
        public Guid UserId { get; set; }
        public string? Username { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? Email { get; set; }
    }
}
