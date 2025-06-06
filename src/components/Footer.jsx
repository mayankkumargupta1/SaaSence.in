import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa6';

const Footer = () => {
  return (
    // Main footer container with dark background and text color
    <footer className="bg-neutral-950 text-gray-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Logo, Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 mb-8 border-b border-gray-700">

          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-1 lg:col-span-1">
            <h1 className="text-white text-3xl font-bold mb-2">SaaSence.in</h1>
            <p className="text-sm text-neutral-500 max-w-[200px]">Empowering Businesses with Agentic AI Solutions</p>
          </div>

          {/* Column 2: Solutions */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/solutions/customer-service" className="hover:text-white transition-colors">Customer Service AI</a></li>
              <li><a href="/solutions/marketing" className="hover:text-white transition-colors">Marketing Automation AI</a></li>
              <li><a href="/solutions/hr" className="hover:text-white transition-colors">HR & Recruitment AI</a></li>
              <li><a href="/solutions/industry-specific" className="hover:text-white transition-colors">Industry-Specific AI</a></li>
              <li><a href="/solutions/custom-enterprise" className="hover:text-white transition-colors">Custom Enterprise Solutions</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Sales</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login / Signup</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/resources/whitepapers" className="hover:text-white transition-colors">Whitepapers & Reports</a></li>
              <li><a href="/resources/webinars" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Help & Support</a></li>
            </ul>
          </div>

          {/* Column 5: Legal & Social */}
          <div className="md:col-span-2 lg:col-span-1"> {/* This column spans 2 on MD for better alignment */}
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="/legal/terms" className="hover:text-white transition-colors">Website Terms</a></li>
              <li><a href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/legal/agreements" className="hover:text-white transition-colors">Legal Agreements</a></li>
              <li><a href="/legal/security" className="hover:text-white transition-colors">Security & Compliance</a></li>
            </ul>

            {/* Social Icons */}
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/saasence" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white text-lg transition-colors"><FaFacebookF /></a>
              <a href="https://www.instagram.com/saasence" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white text-lg transition-colors"><FaInstagram /></a>
              <a href="https://twitter.com/saasence" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-gray-400 hover:text-white text-lg transition-colors"><FaXTwitter /></a>
              <a href="https://www.linkedin.com/company/saasence" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white text-lg transition-colors"><FaLinkedinIn /></a>
              <a href="https://www.tiktok.com/@saasence" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-white text-lg transition-colors"><FaTiktok /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and General Disclaimer */}
        <div className="text-sm leading-relaxed mt-4">
          <p className="mb-4">© SaaSence.in 2024. All rights reserved.</p>

          <p className="mb-4">
            SaaSence.in is the parent brand providing a suite of AI-powered Software-as-a-Service (SaaS) products. Our solutions leverage Agentic AI (autonomous, goal-driven AI systems) to transform business operations across customer service, marketing, HR, and more.
          </p>

          <p>
            For more detailed information regarding our products, privacy practices, or support options, please refer to our <a href="/help" className="text-gray-300 hover:underline hover:text-white transition-colors">Help Center</a> and <a href="/legal/privacy" className="text-gray-300 hover:underline hover:text-white transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;