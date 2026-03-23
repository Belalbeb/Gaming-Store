using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamingStore.Migrations
{
    /// <inheritdoc />
    public partial class notuni : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_favourites_UserId",
                table: "favourites");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "discounnts",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_favourites_UserId",
                table: "favourites",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_favourites_UserId",
                table: "favourites");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "discounnts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_favourites_UserId",
                table: "favourites",
                column: "UserId",
                unique: true);
        }
    }
}
