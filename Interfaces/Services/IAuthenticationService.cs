using FileSiteDemo.Entities;
using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IAuthenticationService
    {
        OAuth2ResponseData AuthenticateUser(OAuth2RequestData authData);
        DiscoveryResponseData GetDiscovery(string xAuthToken);
        OAuth2ResponseData RefreshToken(RefreshTokenRequestData refreshData);
    }
}