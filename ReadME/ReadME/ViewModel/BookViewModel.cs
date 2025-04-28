using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Net.Http;
using System;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ReadME.ViewModel
{
    public partial class BookViewModel: ObservableObject
    {
        static HttpClient client = new HttpClient();

        static async void GetBook() {
            client.GetAsync();
        }
    }
}
