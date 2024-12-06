using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models
{
    public class CreateCustomerDTO
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
