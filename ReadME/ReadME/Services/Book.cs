using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text.Json;
using ReadME.Model;

namespace ReadME.Services
{
    public class BookServices
    {
        public static string BaseAddress =
    DeviceInfo.Platform == DevicePlatform.Android ? "http://10.0.2.2:8080" : "http://localhost:8080";
        static HttpClient client = new HttpClient();
        public static ImageSource DecodeBase64ToImage(string base64String)
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(base64String);

                MemoryStream stream = new MemoryStream(imageBytes);

                return ImageSource.FromStream(() => stream);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static async Task<ObservableCollection<Model.Book>> GetBooks()
        {
            ObservableCollection<Model.Book> books = new ObservableCollection<Model.Book>();
            try
            {
                HttpResponseMessage response = await client.GetAsync($"{BaseAddress}/api/book");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,  // Ignore les différences de casse
                    AllowTrailingCommas = true           // Ignore les virgules en trop
                };
                var bookResponse = JsonSerializer.Deserialize<BookResponse>(responseBody, options);

                if (bookResponse.Books != null)
                {
                    foreach (Model.Book book in bookResponse.Books)
                    {
                        book.Image = DecodeBase64ToImage(book.CoverImage.Base64);
                        books.Add(book);
                    }
                }
                return books;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static async Task<ObservableCollection<Model.Chapter>> GetChapters(int bookId)
        {
            try
            {
                ObservableCollection<Chapter> chapters = new ObservableCollection<Chapter>();
                HttpResponseMessage response = await client.GetAsync($"{BaseAddress}/api/book/{bookId}/chapters");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,  // Ignore les différences de casse
                    AllowTrailingCommas = true           // Ignore les virgules en trop
                };
                var chaptersResponse = JsonSerializer.Deserialize<List<Chapter>>(responseBody, options);
                if (chaptersResponse != null)
                {
                    foreach (Chapter chapt in chaptersResponse)
                    {
                        chapters.Add(chapt);
                    }
                }
                    return chapters;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
