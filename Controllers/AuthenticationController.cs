using AutoMapper;
using FileSiteDemo.Entities;
using FileSiteDemo.Entities.Request;
using FileSiteDemo.Interfaces.Services;
using FileSiteDemo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.IO;

namespace FileSiteDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Attempts to authenticate a user. 
        /// </summary>
        /// <remarks>
        /// grant_type, client_id, client_secret are all set server side.
        /// 
        /// Sample request:
        ///
        ///     POST
        ///     {
        ///        "username": "myUsername",
        ///        "password": "myPassword",
        ///     }
        ///
        /// </remarks>
        /// <param name="authData">a paramrerer</param>
        /// <returns>The authorization token and refresh token.</returns>
        /// <response code="200">Returns the authorization token and refresh token.</response>
        /// <response code="204">If the result is null.</response>            
        /// <response code="500">Internal server error.</response>            
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(500)]
        public ActionResult Authenticate([FromBody] OAuth2RequestData authData)
        {
            try
            {
                var result = _authenticationService.AuthenticateUser(authData);

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

        [HttpPost]
        [Route("RefreshToken")]
        public ActionResult RefreshToken([FromBody] RefreshTokenRequestData refreshData)
        {
            try
            {
                var result = _authenticationService.RefreshToken(refreshData);

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

        [HttpGet]
        [Route("Discover")]
        public ActionResult Discover([FromHeader] string xAuthToken)
        {
            try
            {
                var result = _authenticationService.GetDiscovery(xAuthToken);

                if (result == null)
                {
                    return NoContent();
                }

                return Ok(result.Data);
            }
            catch (Exception exc)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
