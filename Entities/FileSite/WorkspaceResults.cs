using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class WorkspaceResults
    {
        [JsonProperty("results")]
        public List<Workspace> Workspaces { get; set; }
    }
}
