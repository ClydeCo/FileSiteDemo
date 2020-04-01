using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using FileSiteDemo.Entities.Request;

namespace FileSiteDemo.Interfaces.Utilities.Http
{
    public interface IPostData
    {
        TResponse Post<TRequest, TResponse>(string clientName, Dictionary<string, string> headers, string urlEndpoint, TRequest postData);
        TResponse PostEncoded<TRequest, TResponse>(string clientName, Dictionary<string, string> headers, string urlEndpoint, TRequest postData) where TRequest : IGenerateKeyValuePairs;
    }
}