using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    [Table("Borrow")]
    public class BorrowModel
    {
        [Key]
        public int BorrowId { get; set; }

        [ForeignKey("User")]
        [DisplayName("User Id")]
        [Required(ErrorMessage = "The User Id field is required")]
        public int UserId { get; set; }

        [ForeignKey("Book")]
        [DisplayName("Book Id")]
        [Required(ErrorMessage = "The Book Id field is required")]
        public int BookId { get; set; }

        [DisplayName("From Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The From Date field is required")]
        public DateTime FromDate { get; set; }

        [DisplayName("To Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The To Date field is required")]
        public DateTime ToDate { get; set; }
        public bool IsReturned { get; set; }
    }
}
