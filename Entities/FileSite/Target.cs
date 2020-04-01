using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class Target
    {
        [JsonProperty("database")]
        public string Database { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("subtype")]
        public string Subtype { get; set; }

        [JsonProperty("wstype")]
        public string Wstype { get; set; }
    }
}
