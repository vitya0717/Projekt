﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Projekt;

#nullable disable

namespace Projekt.Migrations
{
    [DbContext(typeof(ProjektDbContext))]
    [Migration("20231211073054_xd2")]
    partial class xd2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Projekt.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("OrderId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Projekt.Models.OrderDetails", b =>
                {
                    b.Property<int>("orderDeatilId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("ItemProductId")
                        .HasColumnType("int");

                    b.Property<int>("orderId")
                        .HasColumnType("int");

                    b.HasKey("orderDeatilId");

                    b.HasIndex("ItemProductId");

                    b.HasIndex("orderId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("Projekt.Models.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ProductDescription")
                        .HasColumnType("longtext");

                    b.Property<byte[]>("ProductImage")
                        .HasColumnType("longblob");

                    b.Property<string>("ProductName")
                        .HasColumnType("longtext");

                    b.Property<int?>("ProductPrice")
                        .HasColumnType("int");

                    b.HasKey("ProductId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Projekt.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UserRegDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Projekt.Models.Order", b =>
                {
                    b.HasOne("Projekt.Models.User", null)
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Projekt.Models.OrderDetails", b =>
                {
                    b.HasOne("Projekt.Models.Product", "Item")
                        .WithMany()
                        .HasForeignKey("ItemProductId");

                    b.HasOne("Projekt.Models.Order", null)
                        .WithMany("OrderedItems")
                        .HasForeignKey("orderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");
                });

            modelBuilder.Entity("Projekt.Models.Order", b =>
                {
                    b.Navigation("OrderedItems");
                });

            modelBuilder.Entity("Projekt.Models.User", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
