using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Response
{
    public class DocumentSearchResponse
    {
        [JsonProperty("data")]
        public List<DocumentSearchResponseData> Data { get; set; }
    }

    public class DocumentSearchResponseData
    {
        [JsonProperty("has_attachment")]
        public bool HasAttachment { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("iwl")]
        public string Iwl { get; set; }

        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("wstype")]
        public string Wstype { get; set; }
    }
}
