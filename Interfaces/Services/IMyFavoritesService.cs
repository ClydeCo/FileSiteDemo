using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IMyFavoritesService
    {
        GetMyFavoritesResponseData GetMyFavoritesChildren(string xAuthToken, GetMyFavoritesRequestData requestData);
    }
}