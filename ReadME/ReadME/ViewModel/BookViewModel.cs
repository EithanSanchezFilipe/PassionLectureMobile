using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using ReadME.Model;
using ReadME.Services;

namespace ReadME.ViewModel
{
    public partial class BookViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<Model.Book> _books = new ObservableCollection<Model.Book>();

        [ObservableProperty]
        private Model.Book _selectedBook;

        static HttpClient client = new HttpClient();

        public BookViewModel()
        {
            GetBooks();
        }

        private async void GetBooks()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://localhost:8080/api/book");
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
                        book.Image = BookServices.DecodeBase64ToImage(book.CoverImage.Base64);
                        Books.Add( book );
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }

        partial void OnSelectedBookChanged(Model.Book value)
        {
            if (value != null)
            {
                Shell.Current.Navigation.PushAsync(new BookDetail(SelectedBook));
            }
        }
    }
}
