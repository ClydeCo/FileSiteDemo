using AutoMapper;
using FileSiteDemo.Entities;
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
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IHelpWithHttp _httpHelper;

        public AuthenticationService(IHelpWithHttp httpHelper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
        }

        public OAuth2ResponseData AuthenticateUser(OAuth2RequestData authData)
        {
            return _httpHelper.PostEncoded<OAuth2RequestData, OAuth2ResponseData>("/auth/oauth2/token", authData);
        }

        public OAuth2ResponseData RefreshToken(RefreshTokenRequestData refreshData)
        {
            return _httpHelper.PostEncoded<RefreshTokenRequestData, OAuth2ResponseData>("/auth/oauth2/token", refreshData);
        }

        public DiscoveryResponseData GetDiscovery(string xAuthToken)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<DiscoveryResponseData>("/api");
        }
    }
}
