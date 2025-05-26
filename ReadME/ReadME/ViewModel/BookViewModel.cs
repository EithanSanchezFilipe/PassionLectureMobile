using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
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



        public BookViewModel()
        {
            GetBooks();
        }

        private async void GetBooks()
        {
           Books = await BookServices.GetBooks();
        }

    }
}
