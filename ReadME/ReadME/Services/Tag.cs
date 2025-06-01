using ReadME.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace ReadME.Services
{
    public class TagServices
    {
        public static string BaseAddress =
DeviceInfo.Platform == DevicePlatform.Android ? "http://10.0.2.2:8080/api/tag" : "http://localhost:8080/api/tag";
        static HttpClient client = new HttpClient();
        public static async Task<ObservableCollection<Tag>> GetTagsAsync()
        {
            ObservableCollection<Tag> tags = new ObservableCollection<Tag>();
            var response = await client.GetAsync($"{BaseAddress}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var option = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    AllowTrailingCommas = true
                };
                TagResponse tagResponse = JsonSerializer.Deserialize<TagResponse>(json, option);
                if (tagResponse.Data != null)
                {
                    foreach (Tag book in tagResponse.Data)
                    {
                        tags.Add(book);
                    }
                    return tags;
                }
            }

            return new ObservableCollection<Tag>();
        }

        public static async Task<ObservableCollection<Model.Book>> GetBooks(int tagId)
        {
            ObservableCollection<Model.Book> books = new ObservableCollection<Model.Book>();

            var response = await client.GetAsync($"{BaseAddress}/{tagId}");

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    AllowTrailingCommas = true
                };

                TagBooksResponse tagBooksResponse = JsonSerializer.Deserialize<TagBooksResponse>(json, options);
                if (tagBooksResponse.Data != null)
                {
                    foreach (Model.Book book in tagBooksResponse.Data.Books)
                    { 
                        books.Add(book);
                    }
                    return books;
                }
            }

            return new ObservableCollection<Model.Book>();
        }

    }
}
