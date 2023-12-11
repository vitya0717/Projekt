using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projekt.Migrations
{
    /// <inheritdoc />
    public partial class xd2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "productId",
                table: "OrderDetails");

            migrationBuilder.AddColumn<int>(
                name: "ItemProductId",
                table: "OrderDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ItemProductId",
                table: "OrderDetails",
                column: "ItemProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Products_ItemProductId",
                table: "OrderDetails",
                column: "ItemProductId",
                principalTable: "Products",
                principalColumn: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Products_ItemProductId",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ItemProductId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "ItemProductId",
                table: "OrderDetails");

            migrationBuilder.AddColumn<int>(
                name: "productId",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
