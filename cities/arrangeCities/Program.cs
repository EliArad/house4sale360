using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace arrangeCities
{
    class Program
    {
        static Dictionary<int, Tuple<string, string, string, string>> m_dic = 
        new Dictionary<int, Tuple<string, string, string, string>>();
        static KeyValuePair<int, Tuple<string, string,string,string>> searchCity(string line)
        {
            try
            {
                foreach (KeyValuePair<int, Tuple<string, string,string,string>> entry in m_dic)
                {
                    var t1 = line.Replace(" ", "");
                    if (t1.Contains("תלאביב"))
                    {
                        Console.WriteLine("r");
                    }
                    if (entry.Value.Item3.Contains(t1) || entry.Value.Item3 == line)
                    {
                        return entry;
                    }
                }
                throw (new SystemException("not found"));
            }
            catch (Exception err)
            {
                throw (new SystemException("not found"));
            }            
        }
        static void Main(string[] args)
        {
            char[] delimiterChars = { '\t' };
            string line;
            try
            {
                StreamReader file = new StreamReader(@"C:\GojiLTDTrunk\yad2vr\cities\allcities.txt", Encoding.UTF8);
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
                    var t1 = words[1].Replace(" ", "");
                    var t2 = words[3].Replace(" ", "");
                    Tuple <string, string, string, string> t = new Tuple<string,string,string,string>(words[1],words[3], t1 , t2);
                    m_dic.Add(int.Parse(words[0]), t);
                }
                // now  we need to add this info to the new 7 files
                file.Close();
                string[] fileNames = { "telaviv.txt", "ezormerkaz.txt", "haifa.txt", "jerusalem.txt", "darom.txt", "zafon.txt" };
                string[] fileNames1 = { "_telaviv.txt", "_ezormerkaz.txt", "_haifa.txt", "_jerusalem.txt", "_darom.txt", "_zafon.txt" };
                int found = 0;
                int notfound = 0;
                int total = 0;
                for (i = 0; i < fileNames.Length; i++)
                {
                    StreamReader file1 = new StreamReader(@"C:\GojiLTDTrunk\yad2vr\cities\" + fileNames[i], Encoding.UTF8);
                    FileStream fs = new FileStream(@"C:\GojiLTDTrunk\yad2vr\cities\" + fileNames1[i], FileMode.Create);
                    using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8, 512))
                    {
                        while (file1.EndOfStream == false)
                        {
                            line = file1.ReadLine();
                            total++;
                            try
                            {
                                KeyValuePair<int, Tuple<string, string,string,string>> entry = searchCity(line);
                                writer.WriteLine(line + "\t" + entry.Key + "\t" + entry.Value.Item2);
                                found++;
                            }
                            catch (Exception err)
                            {
                                Console.WriteLine(line + " not found");
                                writer.WriteLine(line);
                                notfound++;
                            }
                        }
                    }
                    file1.Close();
                    Console.WriteLine("Total: " + total + " found: " + found + "  notfound:" + notfound);
                }                
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
            }

        }
    }
}
