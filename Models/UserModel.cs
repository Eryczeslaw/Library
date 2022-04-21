using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    [Table("User")]
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }

        [DisplayName("First Name")]
        [Required(ErrorMessage = "The First Name field is required")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [DisplayName("Last Name")]
        [Required(ErrorMessage = "The Last Name field is required")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [DisplayName("Birth Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The Birth Date field is required")]
        public DateTime BirthDate { get; set; }

        [DisplayName("Email")]
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "The Email field is required")]
        public string Email { get; set; }

        [DisplayName("Phone")]
        public string Phone { get; set; }

        [DisplayName("Add Date")]
        [DataType(DataType.Date)]
        public DateTime AddDate { get; set; }

        [DisplayName("Modified")]
        [DataType(DataType.Date)]
        public DateTime ModifiedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
