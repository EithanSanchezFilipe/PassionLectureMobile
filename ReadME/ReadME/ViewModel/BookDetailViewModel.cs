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
    public partial class BookDetailViewModel : ObservableObject
    {
        [ObservableProperty]
        private Model.Book _book;
        public BookDetailViewModel()
        {
        }
        public void DecodeImage()
        {
            Book.Image = BookServices.DecodeBase64ToImage(Book.CoverImage.Base64);
        }
        [RelayCommand]
        public void Read(int id)
        {
            Shell.Current.Navigation.PushAsync(new Read(id));
        }
    }
}
