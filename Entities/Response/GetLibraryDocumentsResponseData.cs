using FileSiteDemo.Entities.FileSite;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Response
{
    public class GetLibraryDocumentsResponseData
    {
        [JsonProperty("data")]
        public DocumentsResults Data { get; set; }
    }

    public class DocumentsResults
    {
        [JsonProperty("results")]
        public List<Document> Results { get; set; }
    }
}
