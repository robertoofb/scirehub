"use client";
export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0A0A0A",
        color: "#fff",
        padding: "40px 20px",
        width: "100%",
        borderTop: "5px solid #FFD700", // Línea amarilla superior
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Redes Sociales */}
        <div style={{ flex: 1, minWidth: "250px", marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Síguenos en nuestras redes sociales</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <a href="https://www.facebook.com/upqroo" target="_blank" rel="noopener noreferrer">
              <img src="./facebook-white.svg" alt="Facebook" style={{ width: "30px", height: "30px" }} />
            </a>
            <a href="https://twitter.com/UPQROO" target="_blank" rel="noopener noreferrer">
              <img src="./x-white.svg" alt="Twitter" style={{ width: "30px", height: "30px" }} />
            </a>
            <a href="https://www.instagram.com/up_qroo/" target="_blank" rel="noopener noreferrer">
              <img src="./instagram-whitee.svg" alt="Instagram" style={{ width: "30px", height: "30px" }} />
            </a>
            <a href="https://www.tiktok.com/@upqroo?lang=en" target="_blank" rel="noopener noreferrer">
              <img src="./tiktok-white.svg" alt="TikTok" style={{ width: "30px", height: "30px" }} />
            </a>
            <a href="https://www.youtube.com/channel/UCTQ6vM_-1DQAVwjvei0ns0Q" target="_blank" rel="noopener noreferrer">
              <img src="./youtube-white.svg" alt="YouTube" style={{ width: "30px", height: "30px" }} />
            </a>
          </div>
        </div>

        {/* Enlaces útiles */}
        <div style={{ flex: 1, minWidth: "250px", marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Enlaces útiles</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a
                href="/"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="https://upqroo.edu.mx/sobre-nosotros/"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="https://upqroo.edu.mx/servicios-escolares/oferta-academica/"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                Oferta Educativa
              </a>
            </li>
            <li>
              <a
                href="https://upqroo.edu.mx/cultura-y-deporte/"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                Vinculación
              </a>
            </li>
          </ul>
        </div>

        {/* Horario de Atención */}
        <div style={{ flex: 1, minWidth: "250px", marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Horario de Atención</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Lun - Vier: 09:00 hrs - 17:00 hrs</li>
            <li>Sáb - Dom: Cerrado</li>
          </ul>
        </div>

        {/* Contacto */}
        <div style={{ flex: 1, minWidth: "250px", marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Contáctanos</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a
                href="https://www.google.com/maps?q=Smza.+255,+Mza.+11,+Lote+1119-33,+77500+Cancún,+México"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                Smza. 255, Mza. 11, Lote 1119-33, 77500 Cancún, México
              </a>
            </li>
            <li>
              <a
                href="tel:+529982831859"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                998 283 1859
              </a>
            </li>
            <li>
              <a
                href="mailto:prensaydifusion@upqroo.edu.mx"
                style={{ color: "#fff", textDecoration: "none" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
              >
                prensaydifusion@upqroo.edu.mx
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
