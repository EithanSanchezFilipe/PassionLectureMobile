using System.Diagnostics;

namespace ReadME;

public partial class Book : ContentPage
{
    public Book()
    {
        InitializeComponent();
    }

    private void CollectionView_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (e.CurrentSelection.FirstOrDefault() is Model.Book selectedBook)
        {
            Shell.Current.Navigation.PushAsync(new BookDetail(selectedBook));
        }
    }
}