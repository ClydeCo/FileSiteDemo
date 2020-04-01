using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Utilities.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileSiteDemo.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IHelpWithHttp _httpHelper;

        public DocumentService(IHelpWithHttp httpHelper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
        }

        public GetLibraryDocumentsResponseData GetLibraryDocuments(string xAuthToken, GetLibraryDocumentsRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetLibraryDocumentsResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/documents");
        }

        public Stream DownloadDocument(string xAuthToken, DownloadDocumentRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.GetStream(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/documents/{requestData.DocumentId}/download");
        }

        public DocumentSearchResponse SearchDocuments(string xAuthToken, SearchDocumentsRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Post<SearchDocumentsRequestData, DocumentSearchResponse>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/documents/search",
                requestData);
        }
    }
}