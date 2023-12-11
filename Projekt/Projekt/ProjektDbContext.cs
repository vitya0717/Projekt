using Microsoft.EntityFrameworkCore;
using Projekt.Models;
using System;

namespace Projekt
{
    public class ProjektDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("Server=localhost;Port=3306;Database=ProjektDb;User=root;Password=;");
        }
    }
}
