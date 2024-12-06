using System.ComponentModel.DataAnnotations;

namespace HillaryHairCare.Models
{
    public class DeactivateStylistDTO
    {
        [Required]
        public bool IsActive { get; set; }
    }
}
