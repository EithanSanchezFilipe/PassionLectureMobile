namespace ReadME;

public partial class Read : ContentPage
{
	public Read(int id)
	{
		InitializeComponent();

		var vm = new ViewModel.ReadViewModel(id);
		BindingContext = vm;
    }
}