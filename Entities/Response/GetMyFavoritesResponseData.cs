﻿using FileSiteDemo.Entities.FileSite;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.Response
{
    public class GetMyFavoritesResponseData
    {
        [JsonProperty("data")]
        public List<WorkspaceShortcut> Data { get; set; }
    }
}
