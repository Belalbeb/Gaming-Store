using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingStore.Migrations
{
    /// <inheritdoc />
    public partial class update_product : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rate",
                table: "products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Trailor_Link",
                table: "products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rate",
                table: "products");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "products");

            migrationBuilder.DropColumn(
                name: "Trailor_Link",
                table: "products");
        }
    }
}
