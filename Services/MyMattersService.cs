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
    public class MyMattersService : IMyMattersService
    {
        private readonly IHelpWithHttp _httpHelper;

        public MyMattersService(IHelpWithHttp httpHelper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
        }

        public GetMyMattersResponseData GetMyMattersChildren(string xAuthToken, GetMyMattersRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetMyMattersResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/users/{requestData.UserId}/my-matters/children");
        }
    }
}
