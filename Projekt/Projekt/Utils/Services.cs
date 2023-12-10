﻿using System.Security.Cryptography;
using System.Text;

namespace Projekt.Utils
{
    public class Services
    {
        private static readonly Random random = new Random();

        public static string generateHashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] buffer = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + salt));

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < buffer.Length; i++)
                {
                    sb.Append(buffer[i].ToString("x2"));
                }
                return sb.ToString();
            }
        }

        public static string generateRandomSalt(byte length)
        {
            string output = string.Empty;
            string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (int i = 0; i < length; i++)
            {
                output += chars[random.Next(chars.Length)];
            }
            return output;
        }
    }
}
