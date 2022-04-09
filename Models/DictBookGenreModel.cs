using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    [Table("DictBookGenre")]
    public class DictBookGenreModel
    {
        [Key]
        public int BookGenreId { get; set; }

        [DisplayName("Name")]
        [Required(ErrorMessage = "The Name field is required")]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
