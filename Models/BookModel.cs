using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    [Table("Book")]
    public class BookModel
    {
        [Key]
        public int BookId { get; set; }

        [DisplayName("Author")]
        [Required(ErrorMessage = "The Author field is required")]
        [MaxLength(50)]
        public string Author { get; set; }

        [DisplayName("Title")]
        [Required(ErrorMessage = "The Title field is required")]
        [MaxLength(50)]
        public string Title { get; set; }

        [DisplayName("Release Date")]
        public DateTime ReleaseDate { get; set; }

        [DisplayName("ISBN")]
        [Required(ErrorMessage = "The ISBN field is required")]
        [MaxLength(50)]
        public string ISBN { get; set; }

        [DisplayName("Book Genre Id")]
        [Required(ErrorMessage = "The Book Genre Id field is required")]
        public int BookGenreId { get; set; }

        [DisplayName("Count")]
        [Required(ErrorMessage = "The Count field is required")]
        public int Count { get; set; }

        [DisplayName("Add Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The AddDate field is required")]
        public DateTime AddDate { get; set; }

        [DisplayName("Modified Date")]
        public DateTime ModifiedDate { get; set; }
    }
}
