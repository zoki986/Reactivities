using System.Collections.Generic;
using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistance;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        private const string CorsPolicyName = "CorsPolicy";

        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddCors(opts => opts.AddPolicy(CorsPolicyName, p => p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000")));

            services.AddDbContext<DataContext>(opts => opts.UseSqlite(config.GetConnectionString("DefaultConnection")));

            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" }));

            services.AddMediatR(typeof(List.Handler).Assembly);
        }
    }
}