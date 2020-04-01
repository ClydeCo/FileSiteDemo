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
    public class MyFavoritesController : ControllerBase
    {
        private readonly IMyFavoritesService _favoritesService;

        public MyFavoritesController(IMyFavoritesService favoritesService)
        {
            _favoritesService = favoritesService;
        }

        [HttpGet("{customerId}/{libraryName}/Children")]
        public ActionResult GetMyFavoritesChildren([FromHeader] string xAuthToken, string customerId, string libraryName)
        {
            var requestData = new GetMyFavoritesRequestData()
            {
                CustomerId = customerId,
                LibraryName = libraryName
            };

            try
            {
                var favoritesChildren = _favoritesService.GetMyFavoritesChildren(xAuthToken, requestData);

                if (favoritesChildren == null)
                {
                    return NoContent();
                }

                return Ok(favoritesChildren.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
