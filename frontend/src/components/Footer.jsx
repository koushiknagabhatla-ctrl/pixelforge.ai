import { Link } from 'react-router-dom'
import { RiSparklingFill } from 'react-icons/ri'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const footerLinks = {
  Product: [
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'API (Coming Soon)', path: '#' },
  ],
  Company: [
    { name: 'About', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Contact', path: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <RiSparklingFill className="w-7 h-7 text-pink-500" />
              <span className="text-lg font-bold">
                <span className="text-gray-900 dark:text-white">Pixel</span>
                <span className="text-gradient">Forge</span>
                <span className="text-gray-400 text-xs ml-1 font-medium">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Enhance any image with cutting-edge AI models. Upscale, restore, and transform your photos in seconds.
            </p>
            <div className="flex gap-3">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-gray-500 hover:text-pink-500 hover:border-pink-500/30 transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-300 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase tracking-widest">
            © {new Date().getFullYear()} PixelForge AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold tracking-widest uppercase">
            Powered by AI • Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
