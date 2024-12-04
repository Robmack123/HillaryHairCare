using Microsoft.EntityFrameworkCore;
using HillaryHairCare.Models;

public class HillaryHairCareDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillaryHairCareDbContext(DbContextOptions<HillaryHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<AppointmentService>()
            .HasKey(asr => new { asr.AppointmentId, asr.ServiceId }); // Composite Key

        modelBuilder.Entity<AppointmentService>()
            .HasOne(asr => asr.Appointment)
            .WithMany(a => a.AppointmentServices)
            .HasForeignKey(asr => asr.AppointmentId);

        modelBuilder.Entity<AppointmentService>()
            .HasOne(asr => asr.Service)
            .WithMany(s => s.AppointmentServices)
            .HasForeignKey(asr => asr.ServiceId);

        // Seed data (optional, for testing purposes)
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService { AppointmentId = 1, ServiceId = 1 },
            new AppointmentService { AppointmentId = 1, ServiceId = 2 },
            new AppointmentService { AppointmentId = 2, ServiceId = 3 },
            new AppointmentService { AppointmentId = 3, ServiceId = 4 },
            new AppointmentService { AppointmentId = 4, ServiceId = 5 }
        });
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, Name = "John Doe", Email = "example@example.com"},
            new Customer {Id = 2, Name = "Jane Doe", Email = "example@gmail.com"},
            new Customer {Id = 3, Name = "John Smith", Email = "smith@example.com"},
            new Customer {Id = 4, Name = "Jane Smith", Email = "jane@example.com"},
            new Customer {Id = 5, Name = "John Johnson", Email = "hojodojo@hotmail.com"}
        });

        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, Name = "Hillary", Specialization = "Hair Stylist", Is_Active = true},
            new Stylist {Id = 2, Name = "John", Specialization = "Hair Stylist", Is_Active = true},
            new Stylist {Id = 3, Name = "Jane", Specialization = "Hair Stylist", Is_Active = true},
            new Stylist {Id = 4, Name = "Smith", Specialization = "Hair Stylist", Is_Active = true},
            new Stylist {Id = 5, Name = "Johnson", Specialization = "Hair Stylist", Is_Active = true}
        });

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Haircut", Description = "A simple haircut", Price = 30.00m},
            new Service {Id = 2, Name = "Color", Description = "Getting hair dyed", Price = 60.00m},
            new Service {Id = 3, Name = "Beard trim", Description = "Get your facial hair trimmed", Price = 10.00m},
            new Service {Id = 4, Name = "Eyebrow Waxing", Description = "A haircut, style, color, and highlights", Price = 10.00m},
            new Service {Id = 5, Name = "Perm", Description = "A perm", Price = 50.00m}
        });

        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, CustomerId = 1, StylistId = 1, AppointmentTime = new DateTime(2021, 1, 1, 9, 0, 0), Status = "Scheduled"},
            new Appointment {Id = 2, CustomerId = 2, StylistId = 2, AppointmentTime = new DateTime(2021, 1, 1, 10, 0, 0), Status = "Scheduled"},
            new Appointment {Id = 3, CustomerId = 3, StylistId = 3, AppointmentTime = new DateTime(2021, 1, 1, 11, 0, 0), Status = "Scheduled"},
            new Appointment {Id = 4, CustomerId = 4, StylistId = 4, AppointmentTime = new DateTime(2021, 1, 1, 12, 0, 0), Status = "Scheduled"},
            new Appointment {Id = 5, CustomerId = 5, StylistId = 5, AppointmentTime = new DateTime(2021, 1, 1, 13, 0, 0), Status = "Scheduled"}
        });
    }
}