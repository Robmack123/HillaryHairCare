using System.ComponentModel.DataAnnotations;
namespace HillaryHairCare.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        [Required]
        public int StylistId { get; set; }
        public Stylist Stylist { get; set; }
        [Required]
        public DateTime AppointmentTime { get; set; }
        [Required]
        public string Status { get; set; }
        public ICollection<AppointmentService> AppointmentServices { get; set; }
    }
}