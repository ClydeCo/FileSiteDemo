using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class Work
    {
        [JsonProperty("libraries")]
        public Library[] Libraries { get; set; }

        [JsonProperty("preferred_library")]
        public string PreferredLibrary { get; set; }
    }
}
