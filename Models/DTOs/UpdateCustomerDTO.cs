using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Modles
{
    public class UpdateCustomerDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
    }
}