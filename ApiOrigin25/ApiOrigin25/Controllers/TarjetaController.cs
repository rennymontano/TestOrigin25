using System;
using System.Linq;
using ApiOrigin25.Handler;
using ApiOrigin25.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiOrigin25.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TarjetaController : ControllerBase
	{
		[HttpPost("buscartarjeta")]
		public ActionResult BuscarTarjeta([FromBody] TarjetaBuscarModels dataTrajeta)
		{
			using (var context = new BDApiAngularContext())
			{
				var tarjeta = context.Tarjeta.Where(x => x.Idtarjeta == dataTrajeta.nTarjeta).ToList();
				var existe = (tarjeta).Any();
				var mensaje = "";
				if(existe)
				{
					if (tarjeta[0].Estado.Trim() == "A")
					{
						mensaje = "TD_EXISTE";
					}
					else
					{
						mensaje = "TD_BLOQUEADA" ;
					}
				} else
				{
					mensaje = "ERROR";
				}

				return Ok(new { estado = mensaje });

			}
		}

		[HttpPost("verificarpin")]
		public ActionResult verificarPIN([FromBody] AutentificarModels dataAutent)
		{
			var encriptar = StringEncriptar.Encriptar(dataAutent.pin);
			using (var context = new BDApiAngularContext())
			{
				Tarjeta tarjeta = context.Tarjeta.Where(prod => prod.Idtarjeta == dataAutent.nTarjeta).FirstOrDefault();
				var mensaje = "";

				if (tarjeta.Pin.Trim().Equals(encriptar))
				{
					mensaje = "PIN_CORRECTO";
					Control control = context.Controls.Where(x => x.Idtarjeta == tarjeta.Idtarjeta).FirstOrDefault();
					control.Intentos = 0;
					context.SaveChanges();
				} else 
				{
					mensaje = ManejoDatos.verificarIntentos(tarjeta);
				}

				return Ok(new { estado = mensaje });

			}
		}

		[HttpPost("obtenerBalance")]
		public ActionResult obtenerBalance([FromBody] TarjetaBuscarModels dataTrajeta)
		{
			using (var context = new BDApiAngularContext())
			{
				var tarjeta = context.Tarjeta.Where(x => x.Idtarjeta == dataTrajeta.nTarjeta).ToList();
				var existe = (tarjeta).Any();
				var mensaje = "";
				if (existe)
				{
					mensaje = "0";
					return Ok(new { estado = mensaje, data = tarjeta });
				}
				else
				{
					mensaje = "ERROR";
					return Ok(new { estado = mensaje});
				}

				
			}
		}

		[HttpPost("obtenerMovimiento")]
		public ActionResult obtenerMovimiento([FromBody] TarjetaBuscarModels dataTrajeta)
		{
			using (var context = new BDApiAngularContext())
			{
				var movimiento = context.Movimientos.Where(x => x.Idtarjeta == dataTrajeta.nTarjeta).ToList();
				var existe = (movimiento).Any();
				var mensaje = "";
				if (existe)
				{
					mensaje = "0";
					return Ok(new { estado = mensaje, data = movimiento });
				}
				else
				{
					mensaje = "ERROR";
					return Ok(new { estado = mensaje });
				}


			}
		}

		[HttpPost("realizarRetiro")]
		public ActionResult realizarRetiro([FromBody] RetiroModels dataRetiro)
		{
			using (var context = new BDApiAngularContext())
			{
				Tarjeta tarjeta = context.Tarjeta.Where(x => x.Idtarjeta == dataRetiro.nTarjeta).FirstOrDefault();
				var mensaje = "";
				if (tarjeta.Monto > Convert.ToDecimal(dataRetiro.monto))
				{
					mensaje = "0";
					var mov = ManejoDatos.retiroEfectivo(dataRetiro);
					return Ok(new { estado = mensaje, data = mov });
				}
				else
				{
					mensaje = "ERROR";
					return Ok(new { estado = mensaje });
				}


			}
		}


	}
}
