﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReadME.Model
{
    public class BookResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("books")]
        public List<Book> Books { get; set; }
    }

    public class Book
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("cover")]
        public Cover CoverImage { get; set; }

        public ImageSource Image { get; set; }
    }

    public class Cover
    {
        [JsonPropertyName("mimeType")]
        public string MimeType { get; set; }

        [JsonPropertyName("base64")]
        public string Base64 { get; set; }
    }

    public class Chapter
    {
        [JsonPropertyName("content")]
        public string Content { get; set; }

    }
}
