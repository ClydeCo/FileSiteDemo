using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IFoldersService
    {
        GetLibraryFoldersResponseData GetLibraryFolders(string xAuthToken, GetLibraryFoldersRequestData requestData);
        GetFolderChildrenResponseData GetFolderChildren(string xAuthToken, GetFolderChildrenRequestData requestData);
        GetFolderDocumentsResponseData GetFolderDocuments(string xAuthToken, GetFolderDocumentsRequestData requestData);
    }
}