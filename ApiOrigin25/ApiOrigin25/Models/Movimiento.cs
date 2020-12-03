using System;
using System.Collections.Generic;

#nullable disable

namespace ApiOrigin25.Models
{
    public partial class Movimiento
    {
        public int IdMov { get; set; }
        public string Noperacion { get; set; }
        public string Tipo { get; set; }
        public DateTime Fecha { get; set; }
        public string Idtarjeta { get; set; }
        public decimal Monto { get; set; }
        public decimal Balance { get; set; }
    }
}
