using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IWorkspacesService
    {
        GetLibraryWorkspacesResponseData GetLibraryWorkspaces(string xAuthToken, GetLibraryWorkspacesRequestData requestData);
        GetWorkspaceChildrenResponseData GetWorkspaceChildren(string xAuthToken, GetWorkspaceChildrenRequestData requestData);
    }
}