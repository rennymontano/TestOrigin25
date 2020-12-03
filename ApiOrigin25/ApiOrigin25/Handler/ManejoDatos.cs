using ApiOrigin25.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiOrigin25.Handler
{
	public static class ManejoDatos
	{

		public static string verificarIntentos(Tarjeta tarj)
		{
			var mensaje = "";
			using (var context = new BDApiAngularContext())
			{
				Tarjeta tarjeta = context.Tarjeta.Where(x => x.Idtarjeta == tarj.Idtarjeta).FirstOrDefault();
				Control control = context.Controls.Where(x => x.Idtarjeta == tarj.Idtarjeta).FirstOrDefault();

				var intentos = control.Intentos + 1;
				if (intentos == 4 || tarj.Estado.Equals("B"))
				{
					tarjeta.Estado = "B";
					control.Intentos = 0;
					mensaje = "TD_BLOQUEADA";
				}
				else
				{
					control.Intentos = intentos;
					mensaje = "PIN_INCORRECTO";
				}

				context.SaveChanges();
			}

			return mensaje;
		}

		public static Movimiento retiroEfectivo(RetiroModels retirar)
		{
			using (var context = new BDApiAngularContext())
			{
				Tarjeta tarjeta = context.Tarjeta.Where(x => x.Idtarjeta == retirar.nTarjeta).FirstOrDefault();
				Movimiento movimiento = context.Movimientos.OrderByDescending(x => x.Idtarjeta == retirar.nTarjeta).FirstOrDefault();

				Movimiento mov = new Movimiento();
				mov.Idtarjeta = retirar.nTarjeta;
				mov.Noperacion = (Convert.ToInt32(movimiento.Noperacion) + 1).ToString();
				mov.Tipo = "Retiro";
				mov.Fecha = DateTime.Now;
				var balance = tarjeta.Monto - Convert.ToDecimal(retirar.monto);
				mov.Monto = Convert.ToDecimal(retirar.monto);
				mov.Balance = balance;
				context.Movimientos.Add(mov);

				tarjeta.Monto = balance;

				context.SaveChanges();

				return mov;
			}
		}
	}
}