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
    public class FoldersController : ControllerBase
    {
        private readonly IFoldersService _foldersService;

        public FoldersController(IFoldersService foldersService)
        {
            _foldersService = foldersService;
        }

        [HttpGet("{customerId}/{libraryName}")]
        public ActionResult GetLibraryFolders([FromHeader] string xAuthToken, string customerId, string libraryName)
        {
            var requestData = new GetLibraryFoldersRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName
            };

            try
            {
                var foldersResult = _foldersService.GetLibraryFolders(xAuthToken, requestData);

                if (foldersResult == null)
                {
                    return NoContent();
                }

                return Ok(foldersResult.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{customerId}/{libraryName}/{folderId}/Children")]
        public ActionResult GetFolderChildren([FromHeader] string xAuthToken, string customerId, string libraryName, string folderId)
        {
            var requestData = new GetFolderChildrenRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName,
                FolderId = folderId
            };

            try
            {
                var result = _foldersService.GetFolderChildren(xAuthToken, requestData);

                if (result == null)
                {
                    return NoContent();
                }

                return Ok(result);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{customerId}/{libraryName}/{folderId}/Documents")]
        public ActionResult GetFolderDocuments([FromHeader] string xAuthToken, string customerId, string libraryName, string folderId)
        {
            var requestData = new GetFolderDocumentsRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName,
                FolderId = folderId
            };

            try
            {
                var result = _foldersService.GetFolderDocuments(xAuthToken, requestData);

                if (result == null)
                {
                    return NoContent();
                }

                result.Data.ForEach(doc => doc.ParentId = folderId);
                return Ok(result.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
