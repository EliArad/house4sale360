using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace generateStreetNames
{
    class Program
    {
        static void Main(string[] args)
        {

            try
            {
                string line;
                char[] delimiterChars = { '\t' };

                string dir = @"C:\GojiLTDTrunk\yad2vr\cities\Streets";
                Directory.CreateDirectory(dir);
               
                StreamReader file = new StreamReader(@"C:\GojiLTDTrunk\yad2vr\cities\streets.txt", System.Text.Encoding.UTF8);
                int i = 0;
                while (file.EndOfStream == false)
                {
                    line = file.ReadLine();
                    if (i == 0)
                    {
                        i++;
                        continue;
                    }
                    i++;
                    string[] words = line.Split(delimiterChars);

                    string fileName = dir + "\\" + words[0] + ".txt";
                    using (StreamWriter writer = new StreamWriter(fileName, true, Encoding.UTF8))
                    {
                        writer.WriteLine(words[2]);
                    }
                    Console.WriteLine(i);
                }
                
                file.Close();

            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
                    
            }

        }
    }
}
