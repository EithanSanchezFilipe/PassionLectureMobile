using System.Collections.ObjectModel;

namespace ReadME;

public partial class BookDetail : ContentPage
{
    public BookDetail(Model.Book book)
    {
        InitializeComponent();
        var vm = new ViewModel.BookDetailViewModel { Book = book };
        vm.DecodeImage();
        BindingContext = vm;
    }
}