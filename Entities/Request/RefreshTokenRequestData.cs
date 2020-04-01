using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Request
{
    public class RefreshTokenRequestData : IGenerateKeyValuePairs
    {
        public string grant_type = "refresh_token";
        public string refresh_token;
        public string client_id = "web";
        public string client_secret = "ignore";

        public Dictionary<string, string> GetKeyValuePairs()
        {
            var keyValuePairs = new Dictionary<string, string> {
                { "grant_type", grant_type },
                { "refresh_token", refresh_token },
                { "client_id", client_id },
                { "client_secret", client_secret },
            };

            return keyValuePairs;
        }
    }
}
