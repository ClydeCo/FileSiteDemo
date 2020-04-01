using FileSiteDemo.Entities.Request;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Utilities.Http
{
    public class HttpHelper : IHelpWithHttp
    {
        private const string ErrorClientNameNotSet = "Client name is not set. Please set it with SetClientId(). Must correlate with client names already configured in startup.cs";

        private readonly IGetData _dataGetter;
        private readonly IPostData _dataPoster;

        private string _clientName;
        private Dictionary<string, string> _headers = new Dictionary<string, string>();

        public HttpHelper(IGetData dataGetter, IPostData dataPoster)
        {
            _dataGetter = dataGetter;
            _dataPoster = dataPoster;
        }

        public IHelpWithHttp SetClientName(string clientName)
        {
            _clientName = clientName;
            return this;
        }

        public IHelpWithHttp AddHeader(string name, string value)
        {
            _headers.Remove(name);
            _headers.Add(name, value);
            return this;
        }

        public IHelpWithHttp SetHeaders(Dictionary<string, string> headers)
        {
            _headers = headers;
            return this;
        }

        public T Get<T>(string urlEndPoint)
        {
            try
            {
                if (string.IsNullOrEmpty(_clientName))
                {
                    throw new ArgumentNullException(ErrorClientNameNotSet);
                }

                var result = _dataGetter.Get<T>(_clientName, _headers, urlEndPoint);
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public Stream GetStream(string urlEndPoint)
        {
            try
            {
                if (string.IsNullOrEmpty(_clientName))
                {
                    throw new ArgumentNullException(ErrorClientNameNotSet);
                }

                var result = _dataGetter.GetStream(_clientName, _headers, urlEndPoint);
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public TResponse Post<TRequest, TResponse>(string urlEndPoint, TRequest postData)
        {
            try
            {
                if (string.IsNullOrEmpty(_clientName))
                {
                    throw new ArgumentNullException(ErrorClientNameNotSet);
                }

                var result = _dataPoster.Post<TRequest, TResponse>(_clientName, _headers, urlEndPoint, postData);
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public TResponse PostEncoded<TRequest, TResponse>(string urlEndPoint, TRequest postData)
            where TRequest : IGenerateKeyValuePairs
        {
            try
            {
                if (string.IsNullOrEmpty(_clientName))
                {
                    throw new ArgumentNullException(ErrorClientNameNotSet);
                }

                var result = _dataPoster.PostEncoded<TRequest, TResponse>(_clientName, _headers, urlEndPoint, postData);
                return result;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }
    }
}
