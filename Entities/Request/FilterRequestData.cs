using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Request
{
    public class FilterRequestData
    {
        [JsonProperty("name")]
        string? Name;

        [JsonProperty("type")]
        string? Type;

        [JsonProperty("id")]
        string? Id;

        [JsonProperty("personalized")]
        bool? Personalized;

        [JsonProperty("exclude_emails")]
        bool? ExcludeEmails;

        //unsure what all we can search by, documentation never specifies all.
    }
}
