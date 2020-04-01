using AutoMapper;
using FileSiteDemo.Entities.Request;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkspacesController : ControllerBase
    {
        private readonly IWorkspacesService _workspacesService;

        public WorkspacesController(IWorkspacesService workspacesService)
        {
            _workspacesService = workspacesService;
        }

        [HttpGet("{customerId}/{libraryName}")]
        public ActionResult GetLibraryWorkspaces([FromHeader] string xAuthToken, string customerId, string libraryName)
        {
            var requestData = new GetLibraryWorkspacesRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName
            };

            try
            {
                var workspacesResult = _workspacesService.GetLibraryWorkspaces(xAuthToken, requestData);

                if (workspacesResult == null)
                {
                    return NoContent();
                }

                return Ok(workspacesResult.Data.Workspaces);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{customerId}/{libraryName}/{workspaceId}/Children")]
        public ActionResult GetWorkspaceChildren([FromHeader] string xAuthToken, string customerId, string libraryName, string workspaceId)
        {
            var requestData = new GetWorkspaceChildrenRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName,
                WorkspaceId = workspaceId
            };

            try
            {
                var workspacesResult = _workspacesService.GetWorkspaceChildren(xAuthToken, requestData);

                if (workspacesResult == null)
                {
                    return NoContent();
                }

                return Ok(workspacesResult.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
