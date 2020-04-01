using AutoMapper;
using FileSiteDemo.Entities;
using FileSiteDemo.Entities.FileSite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileSiteDemo
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            //CreateMap<Document, Folder>().ReverseMap();z
        }
    }
}
