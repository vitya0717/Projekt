
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Projekt.Utils;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Projekt
{
    public class Program
    {
        private static string CorsEnabled = "Enable all cors";

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //builder.Services.AddAuthentication().AddJwtBearer();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(CorsEnabled,
                policy =>
                {
                    policy.WithOrigins("*")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod().AllowAnyOrigin();
                });
            });
            builder.Services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                    .RequireAuthenticatedUser().Build());
            });

            builder.Services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
            .AddIdentityServerAuthentication(x =>
            {
                x.Authority = "http://localhost:3000"; //idp address
                x.RequireHttpsMetadata = false;
                x.ApiName = "Projekt"; //api name
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors(CorsEnabled);

            app.MapControllers();

            app.Run();
        }
    }
}