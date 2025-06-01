using Microsoft.Maui.Controls;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReadME.Model
{
    public class Tag
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class TagResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("data")]
        public List<Tag> Data { get; set; }
    }
    public class TagBooks
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("t_books")]
        public List<Book> Books { get; set; }
    }

    public class TagBooksResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("data")]
        public TagBooks Data { get; set; }
    }
}
