using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadME.Services
{
     public class BookServices
    {
        public static ImageSource DecodeBase64ToImage(string base64String)
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(base64String);

                MemoryStream stream = new MemoryStream(imageBytes);

                return ImageSource.FromStream(() => stream);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
