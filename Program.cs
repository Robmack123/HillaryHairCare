using HillaryHairCare.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillaryHairCareDbContext>(builder.Configuration["HillaryHairCareConnectionString"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Endpoint to get all appointments
app.MapGet("/api/appointments", async (HillaryHairCareDbContext db) =>
{
    var appointments = await db.Appointments
        .Include(a => a.Customer)
        .Include(a => a.Stylist)
        .Include(a => a.AppointmentServices)
        .Select(a => new
        {
            a.Id,
            CustomerName = a.Customer.Name,
            StylistName = a.Stylist.Name,
            a.AppointmentTime,
            a.Status,
            Services = a.AppointmentServices.Select(asv => new 
            {
                asv.ServiceId,
                asv.Service.Name,
                asv.Service.Price
            }).ToList()
        })
        .ToListAsync();
    return Results.Ok(appointments);
});

// Endpoint to get all customers
app.MapGet("/api/customers", async (HillaryHairCareDbContext db) =>
{
    var customers = await db.Customers.ToListAsync();
    
    return Results.Ok(customers);
});

// Endpoint to get all stylists
app.MapGet("/api/stylists", async (HillaryHairCareDbContext db) =>
{
    var stylists = await db.Stylists
        .Select(s => new
        {
            s.Id,
            s.Name,
            s.Specialization,
            IsActive = s.Is_Active
        })
        .ToListAsync();
    
    return Results.Ok(stylists);
});

app.Run();

