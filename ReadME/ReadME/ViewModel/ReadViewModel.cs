using CommunityToolkit.Mvvm.ComponentModel;
using ReadME.Model;
using ReadME.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadME.ViewModel
{
    public partial class ReadViewModel : ObservableObject
    {
        private int _bookId;

        [ObservableProperty]
        private Chapter _chapters = new Chapter();

        [ObservableProperty]
        private string _page;

        public ReadViewModel(int id) 
        {
            _bookId = id;
            Initialize();

        }

        private void Initialize()
        {
            Page = $"http://localhost:8080/api/book/{_bookId}/chapters";
            Trace.WriteLine(Page);
        }

    }
}
