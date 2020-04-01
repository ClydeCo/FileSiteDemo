using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class Folder
    {
        [JsonProperty("database")]
        public string Database { get; set; }

        [JsonProperty("default_security")]
        public string DefaultSecurity { get; set; }

        [JsonProperty("edit_date")]
        public DateTimeOffset EditDate { get; set; }

        [JsonProperty("folder_type")]
        public string FolderType { get; set; }

        [JsonProperty("has_documents")]
        public bool HasDocuments { get; set; }

        [JsonProperty("has_subfolders")]
        public bool HasSubfolders { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("is_container_saved_search")]
        public bool IsContainerSavedSearch { get; set; }

        [JsonProperty("is_content_saved_search")]
        public bool IsContentSavedSearch { get; set; }

        [JsonProperty("is_external_as_normal")]
        public bool IsExternalAsNormal { get; set; }

        [JsonProperty("is_hidden")]
        public bool IsHidden { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("parent_id")]
        public string ParentId { get; set; }

        [JsonProperty("view_type")]
        public string ViewType { get; set; }

        [JsonProperty("workspace_id")]
        public string WorkspaceId { get; set; }

        [JsonProperty("workspace_name")]
        public string WorkspaceName { get; set; }

        [JsonProperty("wstype")]
        public string Wstype { get; set; }
    }
}
