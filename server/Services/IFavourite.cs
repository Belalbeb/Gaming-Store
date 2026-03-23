using GamingStore.Dto;
using GamingStore.models;
using Microsoft.AspNetCore.SignalR;

namespace GamingStore.Services
{
    public interface IFavourite
    {
       Task<bool> AddToFavourite(FavouriteDto favouriteDto);
       Task<List<Product>> GetInFavourite(string UserId);
        Task<bool> RemoveFromFavourite(FavouriteDto favouriteDto);
    }
}
