using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Interfaces.Utilities.Http
{
    public interface IGetData
    { 
        T Get<T>(string clientName, Dictionary<string, string> headers, string urlEndPoint);
        Stream GetStream(string clientName, Dictionary<string, string> headers, string urlEndPoint);
    }
}
