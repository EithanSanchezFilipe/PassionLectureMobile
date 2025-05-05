using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReadME.Model
{
    public class BookResponse
    {
        public string Message { get; set; }
        public List<Book> Books { get; set; }
    }

    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonPropertyName("cover")]
        public Cover CoverImage { get; set; }

        public ImageSource Image { get; set; }
    }

    public class Cover
    {
        public string MimeType { get; set; }
        public string Base64 { get; set; }
    }

}
