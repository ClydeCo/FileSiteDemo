using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Utilities.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileSiteDemo.Services
{
    public class WorkspacesService : IWorkspacesService
    {
        private readonly IHelpWithHttp _httpHelper;

        public WorkspacesService(IHelpWithHttp httpHelper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
        }

        public GetLibraryWorkspacesResponseData GetLibraryWorkspaces(string xAuthToken, GetLibraryWorkspacesRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetLibraryWorkspacesResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/workspaces");
        }

        public GetWorkspaceChildrenResponseData GetWorkspaceChildren(string xAuthToken, GetWorkspaceChildrenRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetWorkspaceChildrenResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/workspaces/{requestData.WorkspaceId}/children");
        }
    }
}
