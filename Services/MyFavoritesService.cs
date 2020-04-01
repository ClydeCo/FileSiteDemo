using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Utilities.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileSiteDemo.Services
{
    public class MyFavoritesService : IMyFavoritesService
    {
        private readonly IHelpWithHttp _httpHelper;

        public MyFavoritesService(IHelpWithHttp httpHelper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
        }

        public GetMyFavoritesResponseData GetMyFavoritesChildren(string xAuthToken, GetMyFavoritesRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetMyFavoritesResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/my-favorites/children");
        }
    }
}
