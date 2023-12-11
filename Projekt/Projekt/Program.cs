
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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(CorsEnabled,
                policy =>
                {
                    policy.WithOrigins("http://172.30.48.1:3000",
                                        "http://localhost:3000")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(CorsEnabled);

            app.MapControllers();

            app.Run();
        }
    }
}