using AutoMapper;
using FileSiteDemo.Entities.FileSite;
using FileSiteDemo.Entities.Request;
using FileSiteDemo.Entities.Response;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Utilities.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileSiteDemo.Services
{
    public class FoldersService : IFoldersService
    {
        private readonly IHelpWithHttp _httpHelper;
        private readonly IMapper _mapper;

        public FoldersService(IHelpWithHttp httpHelper, IMapper mapper)
        {
            _httpHelper = httpHelper.SetClientName("filesite");
            _mapper = mapper;
        }

        public GetLibraryFoldersResponseData GetLibraryFolders(string xAuthToken, GetLibraryFoldersRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetLibraryFoldersResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/folders");
        }

        public GetFolderChildrenResponseData GetFolderChildren(string xAuthToken, GetFolderChildrenRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            var returnData = _httpHelper.Get<GetFolderChildrenResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/folders/{requestData.FolderId}/children");

            //file site returns documents and folders in same container.... must separate out
            returnData.Documents ??= new List<Document>();
            returnData.Folders = new List<Folder>();
            var deleteTheseIndeces = new List<int>();
            for (int i = 0; i < returnData.Documents.Count; i++)
            {
                if (returnData.Documents[i].Wstype == "folder")
                {
                    deleteTheseIndeces.Add(i);
                    var folder = _mapper.Map<Document, Folder>(returnData.Documents[i]);
                    returnData.Folders.Add(folder);
                }
            }

            deleteTheseIndeces.Reverse();

            foreach (int i in deleteTheseIndeces)
            {
                returnData.Documents.RemoveAt(i);
            }

            returnData.Documents.ForEach(doc => doc.ParentId = requestData.FolderId);
            returnData.Folders.ForEach(fol => fol.ParentId = requestData.FolderId);

            return returnData;
        }

        public GetFolderDocumentsResponseData GetFolderDocuments(string xAuthToken, GetFolderDocumentsRequestData requestData)
        {
            _httpHelper.AddHeader("X-Auth-Token", xAuthToken);
            return _httpHelper.Get<GetFolderDocumentsResponseData>(
                $"api/v2/customers/{requestData.CustomerId}/libraries/{requestData.LibraryName}/folders/{requestData.FolderId}/documents");
        }
    }
}
