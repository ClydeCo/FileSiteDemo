using System.Collections.Generic;

namespace FileSiteDemo.Entities.Request
{
    public interface IGenerateKeyValuePairs
    {
        Dictionary<string, string> GetKeyValuePairs();
    }
}