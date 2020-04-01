using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace FileSiteDemo.Interfaces.Services
{
    public interface IDocumentService
    {
        GetLibraryDocumentsResponseData GetLibraryDocuments(string xAuthToken, GetLibraryDocumentsRequestData requestData);
        Stream DownloadDocument(string xAuthToken, DownloadDocumentRequestData requestData);
        DocumentSearchResponse SearchDocuments(string xAuthToken, SearchDocumentsRequestData requestData);
    }
}