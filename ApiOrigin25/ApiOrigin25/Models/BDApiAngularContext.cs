using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ApiOrigin25.Models
{
    public partial class BDApiAngularContext : DbContext
    {
        public BDApiAngularContext()
        {
        }

        public BDApiAngularContext(DbContextOptions<BDApiAngularContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Control> Controls { get; set; }
        public virtual DbSet<Movimiento> Movimientos { get; set; }
        public virtual DbSet<Tarjeta> Tarjeta { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=BDApiAngular;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Control>(entity =>
            {
                entity.ToTable("control");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Idtarjeta)
                    .IsRequired()
                    .HasMaxLength(16)
                    .HasColumnName("idtarjeta")
                    .IsFixedLength(true);

                entity.Property(e => e.Intentos).HasColumnName("intentos");
            });

            modelBuilder.Entity<Movimiento>(entity =>
            {
                entity.HasKey(e => e.IdMov)
                    .HasName("PK__tmp_ms_x__6C8843B89CFA59E1");

                entity.Property(e => e.IdMov).HasColumnName("id_mov");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.Idtarjeta)
                    .IsRequired()
                    .HasMaxLength(16)
                    .HasColumnName("idtarjeta")
                    .IsFixedLength(true);

                entity.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("monto");

                entity.Property(e => e.Balance)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("balance");

                entity.Property(e => e.Noperacion)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("noperacion")
                    .IsFixedLength(true);

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("tipo")
                    .IsFixedLength(true);

            });

            modelBuilder.Entity<Tarjeta>(entity =>
            {
                entity.HasKey(e => e.Idtarjeta)
                    .HasName("PK__Tarjeta__F0A5B8A563DAF69C");

                entity.Property(e => e.Idtarjeta)
                    .HasMaxLength(16)
                    .HasColumnName("idtarjeta");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasMaxLength(1)
                    .HasColumnName("estado")
                    .IsFixedLength(true);

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("monto");

                entity.Property(e => e.Pin)
                    .IsRequired()
                    .HasMaxLength(30)
                    .HasColumnName("pin")
                    .IsFixedLength(true);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
