using System;
using System.Collections.Generic;

#nullable disable

namespace ApiOrigin25.Models
{
    public partial class Tarjeta
    {
        public string Idtarjeta { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Monto { get; set; }
        public string Estado { get; set; }
        public string Pin { get; set; }
    }
}
