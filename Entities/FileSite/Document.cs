using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Entities.FileSite
{
    public class Document
    {
        [JsonProperty("author")]
        public string Author { get; set; }

        [JsonProperty("author_description")]
        public string AuthorDescription { get; set; }

        [JsonProperty("class")]
        public string Class { get; set; }

        [JsonProperty("class_description")]
        public string ClassDescription { get; set; }

        [JsonProperty("content_type")]
        public string ContentType { get; set; }

        [JsonProperty("create_date")]
        public DateTimeOffset CreateDate { get; set; }

        [JsonProperty("custom1")]
        public string Custom1 { get; set; }

        [JsonProperty("custom13")]
        public string Custom13 { get; set; }

        [JsonProperty("custom14")]
        public string Custom14 { get; set; }

        [JsonProperty("custom1_description")]
        public string Custom1Description { get; set; }

        [JsonProperty("custom2")]
        public string Custom2 { get; set; }

        [JsonProperty("custom21")]
        public DateTimeOffset Custom21 { get; set; }

        [JsonProperty("custom22")]
        public DateTimeOffset Custom22 { get; set; }

        [JsonProperty("custom25")]
        public bool Custom25 { get; set; }

        [JsonProperty("custom2_description")]
        public string Custom2Description { get; set; }

        [JsonProperty("database")]
        public string Database { get; set; }

        [JsonProperty("declared")]
        public bool Declared { get; set; }

        [JsonProperty("default_security")]
        public string DefaultSecurity { get; set; }

        [JsonProperty("document_number")]
        public long DocumentNumber { get; set; }

        [JsonProperty("edit_date")]
        public DateTimeOffset EditDate { get; set; }

        [JsonProperty("edit_profile_date")]
        public DateTimeOffset EditProfileDate { get; set; }

        [JsonProperty("extension")]
        public string Extension { get; set; }

        [JsonProperty("file_create_date")]
        public DateTimeOffset FileCreateDate { get; set; }

        [JsonProperty("file_edit_date")]
        public DateTimeOffset FileEditDate { get; set; }

        [JsonProperty("from")]
        public string From { get; set; }

        [JsonProperty("has_attachment")]
        public bool HasAttachment { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("in_use")]
        public bool InUse { get; set; }

        [JsonProperty("indexable")]
        public bool Indexable { get; set; }

        [JsonProperty("is_checked_out")]
        public bool IsCheckedOut { get; set; }

        [JsonProperty("is_declared")]
        public bool IsDeclared { get; set; }

        [JsonProperty("is_external")]
        public bool IsExternal { get; set; }

        [JsonProperty("is_external_as_normal")]
        public bool IsExternalAsNormal { get; set; }

        [JsonProperty("is_hipaa")]
        public bool IsHipaa { get; set; }

        [JsonProperty("is_in_use")]
        public bool IsInUse { get; set; }

        [JsonProperty("is_related")]
        public bool IsRelated { get; set; }

        [JsonProperty("is_restorable")]
        public bool IsRestorable { get; set; }

        [JsonProperty("iwl")]
        public string Iwl { get; set; }

        [JsonProperty("last_user")]
        public string LastUser { get; set; }

        [JsonProperty("last_user_description")]
        public string LastUserDescription { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("operator")]
        public string Operator { get; set; }

        [JsonProperty("operator_description")]
        public string OperatorDescription { get; set; }

        [JsonProperty("received_date")]
        public DateTimeOffset ReceivedDate { get; set; }

        [JsonProperty("retain_days")]
        public long RetainDays { get; set; }

        [JsonProperty("sent_date")]
        public DateTimeOffset SentDate { get; set; }

        [JsonProperty("size")]
        public long Size { get; set; }

        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("to")]
        public string To { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("type_description")]
        public string TypeDescription { get; set; }

        [JsonProperty("version")]
        public long Version { get; set; }

        [JsonProperty("wstype")]
        public string Wstype { get; set; }

        [JsonProperty("parent_id")]
        public string ParentId { get; set; }




        //Because get folder children also returns folders with everything else
        [JsonProperty("folder_type")]
        public string FolderType { get; set; }

        [JsonProperty("has_documents")]
        public bool HasDocuments { get; set; }

        [JsonProperty("has_subfolders")]
        public bool HasSubfolders { get; set; }

        [JsonProperty("is_container_saved_search")]
        public bool IsContainerSavedSearch { get; set; }

        [JsonProperty("is_content_saved_search")]
        public bool IsContentSavedSearch { get; set; }

        [JsonProperty("is_hidden")]
        public bool IsHidden { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("owner_description")]
        public string OwnerDescription { get; set; }

        [JsonProperty("view_type")]
        public string ViewType { get; set; }

        [JsonProperty("workspace_id")]
        public string WorkspaceId { get; set; }

        [JsonProperty("workspace_name")]
        public string WorkspaceName { get; set; }

    }
}
