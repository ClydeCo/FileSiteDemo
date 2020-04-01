using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IMyMattersService
    {
        GetMyMattersResponseData GetMyMattersChildren(string xAuthToken, GetMyMattersRequestData requestData);
    }
}