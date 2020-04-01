using FileSiteDemo.Entities.FileSite;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Response
{
    public class GetWorkspaceChildrenResponseData
    {
        [JsonProperty("data")]
        public List<Folder> Data { get; set; }
    }
}
