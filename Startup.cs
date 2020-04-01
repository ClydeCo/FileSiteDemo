using AutoMapper;
using FileSiteDemo.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using System.IO;
using FileSiteDemo.Utilities.Http;
using FileSiteDemo.Interfaces.Utilities.Http;
using FileSiteDemo.Interfaces.Services;
using Microsoft.AspNetCore.Hosting;
using FileSiteDemo.Entities.Request;

namespace FileSiteDemo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Clyde & Co Relay API for iManage Filesite Consumption",
                    Description = "A .NET Core 2.2 webApi for acting as a middle man between Clyde's client apps and filesite.",
                    Contact = new OpenApiContact
                    {
                        Name = "Sean Steuber",
                        Email = "Sean.Steuber@clydeco.us"
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            services.AddSingleton(mappingConfig.CreateMapper());

            services.AddAutoMapper(typeof(Startup));

            services.AddHttpClient("filesite", fs =>
            {
                fs.BaseAddress = new Uri("https://uat.dms.clydeco.com");
                fs.DefaultRequestHeaders.Add("User-Agent", "FileSite-Demo");
                fs.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            });

            services.AddTransient(typeof(IGetData), typeof(DataGetter));
            services.AddTransient(typeof(IPostData), typeof(DataPoster));
            services.AddTransient(typeof(IHelpWithHttp), typeof(HttpHelper));

            services.AddTransient(typeof(IAuthenticationService), typeof(AuthenticationService));
            services.AddTransient(typeof(IMyMattersService), typeof(MyMattersService));
            services.AddTransient(typeof(IMyFavoritesService), typeof(MyFavoritesService));
            services.AddTransient(typeof(IWorkspacesService), typeof(WorkspacesService));
            services.AddTransient(typeof(IFoldersService), typeof(FoldersService));
            services.AddTransient(typeof(IDocumentService), typeof(DocumentService));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseHttpsRedirection();
            app.UseRouting();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
