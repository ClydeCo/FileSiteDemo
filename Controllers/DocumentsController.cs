using AutoMapper;
using FileSiteDemo.Entities.Request;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FileSiteDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentsService;

        public DocumentsController(IDocumentService documentsService)
        {
            _documentsService = documentsService;
        }

        [HttpGet("{customerId}/{libraryName}")]
        public ActionResult GetLibraryDocuments([FromHeader] string xAuthToken, string customerId, string libraryName)
        {
            var requestData = new GetLibraryDocumentsRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName
            };

            try
            {
                var foldersResult = _documentsService.GetLibraryDocuments(xAuthToken, requestData);

                if (foldersResult == null)
                {
                    return NoContent();
                }

                return Ok(foldersResult.Data.Results);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{customerId}/{libraryName}/{documentId}/Download")]
        public ActionResult DownloadDocument([FromHeader] string xAuthToken, string customerId, string libraryName, string documentId)
        {
            var requestData = new DownloadDocumentRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName,
                DocumentId = documentId
            };

            try
            {
                var document = _documentsService.DownloadDocument(xAuthToken, requestData);

                if (document == null)
                {
                    return NoContent();
                }

                return Ok(document);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [Route("Search")]
        public ActionResult SearchDocument([FromHeader] string xAuthToken, [FromBody] SearchDocumentsRequestData requestData)
        {
            try
            {
                var documents = _documentsService.SearchDocuments(xAuthToken, requestData);

                if (documents == null)
                {
                    return NoContent();
                }

                return Ok(documents.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
