using FileSiteDemo.Entities.FileSite;
using Newtonsoft.Json;
namespace FileSiteDemo.Entities.Response
{
    public class DiscoveryResponseData
    {
        [JsonProperty("data")]
        public Data Data { get; set; }
    }

    public class Data
    {
        [JsonProperty("auth_status")]
        public string AuthStatus { get; set; }

        [JsonProperty("dms_version")]
        public string DmsVersion { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("versions")]
        public Version[] Versions { get; set; }

        [JsonProperty("work")]
        public Work Work { get; set; }
    }
}
