using FileSiteDemo.Entities.Request;
using System.Collections.Generic;
using System.IO;

namespace FileSiteDemo.Interfaces.Utilities.Http
{
    public interface IHelpWithHttp
    {
        IHelpWithHttp AddHeader(string name, string value);
        IHelpWithHttp SetClientName(string clientName);
        IHelpWithHttp SetHeaders(Dictionary<string, string> headers);

        T Get<T>(string urlEndPoint);
        Stream GetStream(string urlEndPoint);

        TResponse Post<TRequest, TResponse>(string urlEndPoint, TRequest postData);
        TResponse PostEncoded<TRequest, TResponse>(string urlEndPoint, TRequest postData) where TRequest : IGenerateKeyValuePairs;
    }
}