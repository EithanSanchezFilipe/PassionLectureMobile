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
        private ObservableCollection<Tag> _tags = new ObservableCollection<Model.Tag>();

        [ObservableProperty]
        private Tag _selectedTag;


        [ObservableProperty]
        private Model.Book _selectedBook;

        public BookViewModel()
        {
            GetBooks();
            GetTags();
        }

        private async void GetBooks()
        {
            Books.Clear();
            Books = await BookServices.GetBooks();
        }

        private async void GetTags()
        {
            Tags = await TagServices.GetTagsAsync();
            Tags.Insert(0, new Tag { Id = 0, Name = "All" });
        }

        partial void OnSelectedTagChanged(Tag value)
        {
            if (value == null || value.Id == 0)
            {
                GetBooks();
                return;
            }
            Books.Clear();
            GetBooks(value.Id);
        }
        private async void GetBooks(int tagId)
        {
            Books = await TagServices.GetBooks(tagId);
        }
    }
}
