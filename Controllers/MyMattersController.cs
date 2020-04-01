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
    public class MyMattersController : ControllerBase
    {
        private readonly IMyMattersService _mattersService;

        public MyMattersController(IMyMattersService mattersService)
        {
            _mattersService = mattersService;
        }

        [HttpGet("{customerId}/{libraryName}/{userId}/Children")]
        public ActionResult GetMyMattersChildren([FromHeader] string xAuthToken, string customerId, string libraryName, string userId)
        {
            var requestData = new GetMyMattersRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName,
                UserId = userId
            };

            try
            {
                var mattersChildren = _mattersService.GetMyMattersChildren(xAuthToken, requestData);

                if (mattersChildren == null)
                {
                    return NoContent();
                }

                return Ok(mattersChildren.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
