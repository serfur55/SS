import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Navigation</h4>
          <ul>
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/ueber-uns" className="hover:text-gray-300">
                Über Uns
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-gray-300">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/ambientebeleuchtung" className="hover:text-gray-300">
                Ambientebeleuchtung
              </Link>
            </li>
            <li>
              <Link href="/sternenhimmel" className="hover:text-gray-300">
                Sternenhimmel
              </Link>
            </li>
            <li>
              <Link href="/carplay" className="hover:text-gray-300">
                CarPlay
              </Link>
            </li>
            <li>
              <Link href="/codierungen" className="hover:text-gray-300">
                Codierungen
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Kontakt</h4>
          <p>Email: info@sunds-tuning.com</p>
          <p>Telefon: +49 152 2188 2862</p>
          <p>Adresse: Stadtstraße 3, 72172 Sulz am Neckar</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Social Media</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/s.s.tuning/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@ss.tuning"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              TikTok
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=4915221882862"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>
          &copy; {new Date().getFullYear()} S&S Tuning. Stadtstraße 3, 72172 Sulz am Neckar. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}

export default Footer
