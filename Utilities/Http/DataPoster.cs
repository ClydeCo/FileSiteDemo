using FileSiteDemo.Entities.Request;
using FileSiteDemo.Interfaces.Utilities.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileSiteDemo.Utilities.Http
{
    public class DataPoster : IPostData
    {
        private readonly IHttpClientFactory _clientFactory;

        public DataPoster(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        private async Task<HttpResponseMessage> GetResponseMessage<T>(string clientName, Dictionary<string, string> headers, string urlEndpoint, T requestObject)
        {
            var client = _clientFactory.CreateClient(clientName);

            var serializedObject = JsonConvert.SerializeObject(requestObject, Formatting.None, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore});
            var stringContent = new StringContent(serializedObject, Encoding.UTF8, "application/json");
            stringContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

            foreach (var keyValuePair in headers)
            {
                stringContent.Headers.Add(keyValuePair.Key, keyValuePair.Value);
            }

            client.Timeout = Timeout.InfiniteTimeSpan;
            return await client.PostAsync(urlEndpoint, stringContent);
        }

        private async Task<HttpResponseMessage> GetEncodedResponseMessage<T>(string clientName, Dictionary<string, string> headers, string urlEndpoint, T requestObject)
            where T : IGenerateKeyValuePairs
        {
            var client = _clientFactory.CreateClient(clientName);
            var request = new HttpRequestMessage(HttpMethod.Post, urlEndpoint);

            var encodedContent = new FormUrlEncodedContent(requestObject.GetKeyValuePairs());
            encodedContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-www-form-urlencoded");
            request.Content = encodedContent;

            foreach (var keyValuePair in headers)
            {
                request.Headers.Add(keyValuePair.Key, keyValuePair.Value);
            }

            client.Timeout = Timeout.InfiniteTimeSpan;
            return await client.SendAsync(request);
        }

        public TResponse Post<TRequest, TResponse>(string clientName, Dictionary<string, string> headers, string urlEndpoint, TRequest postData)
        {
            var response = GetResponseMessage(clientName, headers, urlEndpoint, postData).Result;
            if (!response.IsSuccessStatusCode) throw new HttpResponseException(response);
            return response.Content.ReadAsAsync<TResponse>().Result;
        }

        public TResponse PostEncoded<TRequest, TResponse>(string clientName, Dictionary<string, string> headers, string urlEndpoint, TRequest postData)
            where TRequest : IGenerateKeyValuePairs
        {
            var response = GetEncodedResponseMessage(clientName, headers, urlEndpoint, postData).Result;
            if (!response.IsSuccessStatusCode) throw new HttpResponseException(response);
            return response.Content.ReadAsAsync<TResponse>().Result;
        }
    }
}
