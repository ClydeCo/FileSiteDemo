using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class WorkspaceShortcut
    {
        [JsonProperty("database")]
        public string Database { get; set; }

        [JsonProperty("default_security")]
        public string DefaultSecurity { get; set; }

        [JsonProperty("edit_date")]
        public DateTimeOffset EditDate { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("owner_description")]
        public string OwnerDescription { get; set; }

        [JsonProperty("parent_id")]
        public string ParentId { get; set; }

        [JsonProperty("target")]
        public Target Target { get; set; }

        [JsonProperty("wstype")]
        public string Wstype { get; set; }
    }
}
