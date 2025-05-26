using CommunityToolkit.Mvvm.ComponentModel;
using ReadME.Model;
using ReadME.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadME.ViewModel
{
    public partial class ReadViewModel : ObservableObject
    {
        private int _bookId;

        [ObservableProperty]
        private ObservableCollection<Chapter> _chapters = new ObservableCollection<Chapter>();

        public ReadViewModel(int id) 
        {
            _bookId = id;
            Chapters = await BookServices.GetChapters(_bookId);
        }


    }
}
