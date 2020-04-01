using System.Collections.Generic;

namespace FileSiteDemo.Entities.Request
{
    public class OAuth2RequestData : IGenerateKeyValuePairs
    {
        public string username;
        public string password;
        public string grant_type = "password";
        public string client_id = "web";
        public string client_secret = "ignore";

        public Dictionary<string, string> GetKeyValuePairs()
        {
            var keyValuePairs = new Dictionary<string, string> {
                { "username", username },
                { "password", password },
                { "grant_type", grant_type },
                { "client_id", client_id },
                { "client_secret", client_secret },
            };

            return keyValuePairs;
        }
    }
}
