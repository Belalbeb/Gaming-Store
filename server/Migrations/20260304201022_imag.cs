using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingStore.Migrations
{
    /// <inheritdoc />
    public partial class imag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
             name: "ProductImage",
             columns: table => new
             {
                 Id = table.Column<int>(type: "int", nullable: false)
                     .Annotation("SqlServer:Identity", "1, 1"),
                 ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                 IsMain = table.Column<bool>(type: "bit", nullable: false),
                 DisplayOrder = table.Column<int>(type: "int", nullable: false),
                 ProductId = table.Column<int>(type: "int", nullable: false)
             },
             constraints: table =>
             {
                 table.PrimaryKey("PK_ProductImage", x => x.Id);
                 table.ForeignKey(
                     name: "FK_ProductImage_products_ProductId",
                     column: x => x.ProductId,
                     principalTable: "products",
                     principalColumn: "Id",
                     onDelete: ReferentialAction.Cascade);
             });
        }

    }
}
