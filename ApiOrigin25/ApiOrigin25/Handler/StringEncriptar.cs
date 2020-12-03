using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiOrigin25.Models
{
	public static class StringEncriptar
	{
		public static string Encriptar(string cadena)
		{
			string resultado = string.Empty;
			byte[] encryted = System.Text.Encoding.Unicode.GetBytes(cadena);
			resultado = Convert.ToBase64String(encryted);
			return resultado;
		}

		public static string DesEncriptar(this string cadena)
		{
			string resultado = string.Empty;
			byte[] decryted = Convert.FromBase64String(cadena);
			resultado = System.Text.Encoding.Unicode.GetString(decryted);
			return resultado;
		}

	}
}
