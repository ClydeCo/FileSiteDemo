using System.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using FileSiteDemo.Utilities.Http;
using FileSiteDemo.Interfaces.Utilities.Http;

namespace FileSiteDemo.Utilities.Http
{
    public class DataGetter : IGetData
    {
        private readonly IHttpClientFactory _clientFactory;

        public DataGetter(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        private async Task<HttpResponseMessage> GetResponseMessage(string clientName, Dictionary<string, string> headers, string urlEndPoint)
        {
            var client = _clientFactory.CreateClient(clientName);
            var request = new HttpRequestMessage(HttpMethod.Get, urlEndPoint);

            foreach (var keyValuePair in headers)
            {
                request.Headers.Add(keyValuePair.Key, keyValuePair.Value);
            }

            client.Timeout = Timeout.InfiniteTimeSpan;
            return await client.SendAsync(request);
        }

        public T Get<T>(string clientName, Dictionary<string, string> headers, string urlEndPoint)
        {
            var response = GetResponseMessage(clientName, headers, urlEndPoint).Result;
            if (!response.IsSuccessStatusCode) throw new HttpResponseException(response);
            return response.Content.ReadAsAsync<T>().Result;
        }

        public Stream GetStream(string clientName, Dictionary<string, string> headers, string urlEndPoint)
        {
            var response = GetResponseMessage(clientName, headers, urlEndPoint).Result;
            if (!response.IsSuccessStatusCode) throw new HttpResponseException(response);
            return response.Content.ReadAsStreamAsync().Result;
        }
    }
}
