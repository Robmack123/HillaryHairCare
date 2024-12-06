using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models
{
    public class CreateServiceDTO
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}