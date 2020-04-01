using Newtonsoft.Json;
using System.Collections.Generic;

namespace FileSiteDemo.Entities.Request
{
    public class SearchDocumentsRequestData
    {
        public string CustomerId;
        public string? LibraryName;

        [JsonProperty("filters")]
        FilterRequestData Filters;
    }
}
