import React, { useState, useEffect } from 'react';
import SakarLogo from './components/SakarLogo';
import WhatsAppWidget from './components/WhatsAppWidget';
import './App.css';

// Import assets
import windowSliding from './assets/window_sliding.png';
import windowCasement from './assets/window_casement.png';
import doorFolding from './assets/door_folding.png';
import windowSlimline from './assets/window_slimline.png';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'Sliding Systems',
    message: ''
  });

  // Track window scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll on body when mobile navigation menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your enquiry about "${formData.product}" has been sent successfully. Our team will contact you shortly.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      product: 'Sliding Systems',
      message: ''
    });
  };

  const handleDownloadBrochure = () => {
    alert("Starting download of Sakar Window System Catalogue (PDF)...");
  };

  return (
    <>
      {/* Header / Navbar */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="logo-link">
            <SakarLogo height={56} showText={true} />
          </a>
          
          <nav>
            <ul className="nav-menu">
              <li><a href="#" className="nav-link">Home</a></li>
              <li><a href="#about" className="nav-link">About Us</a></li>
              <li className="dropdown">
                <a href="#products" className="nav-link">
                  Products <span className="dropdown-arrow">▾</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#products">Sliding Systems</a></li>
                  <li className="dropdown-item"><a href="#products">Casement Windows</a></li>
                  <li className="dropdown-item"><a href="#products">Folding Bi-Fold Doors</a></li>
                  <li className="dropdown-item"><a href="#products">Minimalist Slimline</a></li>
                </ul>
              </li>
              <li><a href="#specs" className="nav-link">Specifications</a></li>
              <li><a href="#contact" className="nav-link">Contact Us</a></li>
            </ul>
          </nav>

          <div className="header-ctas">
            <button className="btn-brochure" onClick={handleDownloadBrochure}>
              Brochure
            </button>
            <a href="tel:+919825904504" className="btn-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.753-7.859-4.161-9.102.19-.092.304-.151.304-.151l-3.52-6.793c-.008.002-1.956.967-2.046 1.011-4.994 2.457.652 14.28 6.136 19.349 5.86 5.416 13.914 1.258 13.945 1.226.09-.044.205-.101.303-.148h-.02z"/>
              </svg>
              +91 98259 04504
            </a>
          </div>

          {/* Animated Hamburger Menu Toggle */}
          <button 
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>About Us</a></li>
          <li><a href="#products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Products</a></li>
          <li><a href="#specs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Specifications</a></li>
          <li><a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a></li>
        </ul>
        <div className="mobile-drawer-ctas">
          <button className="btn-brochure" onClick={() => { handleDownloadBrochure(); setIsMobileMenuOpen(false); }}>
            Download Brochure
          </button>
          <a href="tel:+919825904504" className="btn-phone" onClick={() => setIsMobileMenuOpen(false)}>
            +91 98259 04504
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tagline">Architectural Aluminium Systems</span>
            <h1 className="hero-title">
              Aluminium Windows & <span>Door Manufacturer</span> in India
            </h1>
            <p className="hero-desc">
              At Sakar Window System, we prioritize design excellence, high thermal performance, and lasting durability — delivering premium, custom-engineered aluminium window and door solutions for luxury modern living.
            </p>
            <a href="#products" className="hero-btn">
              BROWSE PRODUCTS
            </a>
          </div>

          {/* Diamond Grid Collage */}
          <div className="diamond-grid-container">
            {/* Top Diamond - Casement */}
            <div className="diamond-item diamond-top">
              <img src={windowCasement} alt="Casement Window" />
              <div className="diamond-item-text">
                <h4>Casement Series</h4>
                <p>Classic Swing Windows</p>
              </div>
            </div>

            {/* Left Diamond - Sliding */}
            <div className="diamond-item diamond-left">
              <img src={windowSliding} alt="Sliding Window" />
              <div className="diamond-item-text">
                <h4>Sliding Systems</h4>
                <p>Smooth Glide Tracks</p>
              </div>
            </div>

            {/* Right Diamond - Slimline */}
            <div className="diamond-item diamond-right">
              <img src={windowSlimline} alt="Slimline Window" />
              <div className="diamond-item-text">
                <h4>Minimalist Slimline</h4>
                <p>Floor-to-Ceiling Views</p>
              </div>
            </div>

            {/* Bottom Diamond - Folding */}
            <div className="diamond-item diamond-bottom">
              <img src={doorFolding} alt="Folding Door" />
              <div className="diamond-item-text">
                <h4>Bi-Fold Doors</h4>
                <p>Expand Your Space</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Innovation</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Windows Installed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Custom Engineered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10 Yrs</div>
            <div className="stat-label">Warranty Support</div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Premium Aluminium Systems</h2>
            <p>Explore our high-performance architectural systems custom tailored to elevate luxury residential and commercial architecture.</p>
          </div>

          <div className="products-grid">
            {/* Sliding Systems */}
            <div className="product-card">
              <div className="product-img-container">
                <span className="product-tag">Sliding</span>
                <img src={windowSliding} alt="Premium Sliding Window System" />
              </div>
              <div className="product-info">
                <h3>Thermal Break Sliding Systems</h3>
                <p className="product-desc">Perfectly engineered for wide span openings. Featuring double/triple glazing options, heavy-duty rollers, and multi-point security locking, providing smooth, effortless sliding action with superior sound damping.</p>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-name">Profile Width</span>
                    <span className="spec-val">45mm to 120mm</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Glazing Thickness</span>
                    <span className="spec-val">Up to 32mm DGU</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Acoustic Rating</span>
                    <span className="spec-val">Up to 38 dB</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Water Tightness</span>
                    <span className="spec-val">Class E900 (EN 12208)</span>
                  </div>
                </div>
                <a href="#contact" className="product-action" onClick={() => setFormData(prev => ({ ...prev, product: 'Sliding Systems' }))}>
                  Enquire Now
                </a>
              </div>
            </div>

            {/* Casement Systems */}
            <div className="product-card">
              <div className="product-img-container">
                <span className="product-tag">Casement</span>
                <img src={windowCasement} alt="Premium Casement Window System" />
              </div>
              <div className="product-info">
                <h3>Premium Casement Series</h3>
                <p className="product-desc">High-performance outward/inward opening casement windows, offering 100% opening space and maximum airflow. Double compression seals ensure absolute water tightness and air insulation.</p>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-name">Profile Width</span>
                    <span className="spec-val">50mm to 65mm</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Glazing Thickness</span>
                    <span className="spec-val">Up to 28mm DGU</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Acoustic Rating</span>
                    <span className="spec-val">Up to 40 dB</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Wind Load Class</span>
                    <span className="spec-val">Class C5 (EN 12210)</span>
                  </div>
                </div>
                <a href="#contact" className="product-action" onClick={() => setFormData(prev => ({ ...prev, product: 'Casement Windows' }))}>
                  Enquire Now
                </a>
              </div>
            </div>

            {/* Slimline Minimalist */}
            <div className="product-card">
              <div className="product-img-container">
                <span className="product-tag">Slimline</span>
                <img src={windowSlimline} alt="Minimalist Slimline Window System" />
              </div>
              <div className="product-info">
                <h3>Minimalist Slimline Series</h3>
                <p className="product-desc">Ultra-thin sightlines of just 20mm, maximizing natural light and offering uninterrupted panoramas. Clean flush floor tracks merge indoor spaces with outdoor vistas seamlessly.</p>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-name">Sightline (Interlock)</span>
                    <span className="spec-val">Only 20mm</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Max Panel Height</span>
                    <span className="spec-val">Up to 4.5 Meters</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Thermal insulation</span>
                    <span className="spec-val">Uf down to 1.6 W/m²K</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Glazing Option</span>
                    <span className="spec-val">Double / Triple Glazed</span>
                  </div>
                </div>
                <a href="#contact" className="product-action" onClick={() => setFormData(prev => ({ ...prev, product: 'Minimalist Slimline' }))}>
                  Enquire Now
                </a>
              </div>
            </div>

            {/* Folding Bi-Fold Doors */}
            <div className="product-card">
              <div className="product-img-container">
                <span className="product-tag">Folding</span>
                <img src={doorFolding} alt="Aluminium Bi-Fold Folding Door System" />
              </div>
              <div className="product-info">
                <h3>Heavy Duty Folding Bi-Fold Doors</h3>
                <p className="product-desc">Transform whole walls into open spaces. Engineered to carry large, heavy glass panels with multiple fold configurations (up to 7 panels left or right), sliding smooth on bottom tracks.</p>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-name">Max Panel Weight</span>
                    <span className="spec-val">120 kg per panel</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Door Configuration</span>
                    <span className="spec-val">Up to 14 Panels total</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Locking Mechanism</span>
                    <span className="spec-val">Top & Bottom Security Bolts</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-name">Weather Seals</span>
                    <span className="spec-val">EPDM Gasket Systems</span>
                  </div>
                </div>
                <a href="#contact" className="product-action" onClick={() => setFormData(prev => ({ ...prev, product: 'Folding Bi-Fold Doors' }))}>
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section id="specs" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Engineered For Excellence</h2>
            <p>Our window and door profiles undergo rigorous testing to ensure unmatched durability, insulation, and safety standards.</p>
          </div>

          <div className="features-grid">
            {/* German Quality */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h3>Precision Engineering</h3>
              <p>Designed using strict European structural tolerances. Profile walls range from 1.6mm to 2.2mm thickness, providing unparalleled stability and mechanical strength.</p>
            </div>

            {/* Sound Damping */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <h3>Acoustic Damping</h3>
              <p>Achieve noise reductions of up to 40dB. Integrated EPDM multi-chamber gaskets and specialized acoustic glazed glass panels block street rumble and external noise completely.</p>
            </div>

            {/* Thermal Efficiency */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M8.5 8.5L12 12l3.5-3.5M15.5 15.5L12 12l-3.5 3.5" />
                </svg>
              </div>
              <h3>Thermal Break Tech</h3>
              <p>Polyamide thermal struts break heat transfer paths between outdoor elements and indoor climates, drastically cutting HVAC power bills and preventing frame condensation.</p>
            </div>

            {/* Weather Resistance */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                </svg>
              </div>
              <h3>Cyclone & Storm Proof</h3>
              <p>Designed to withstand extreme wind loads (up to 3.0 kPa). Specially engineered drainage chambers expel torrential rain waters efficiently, keeping your interiors dry.</p>
            </div>

            {/* Premium Coatings */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 2 12 2Z" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <h3>Anodized & Powder Coated</h3>
              <p>Choose from over 150 RAL colors. Finished with world-class Qualicoat powder coatings or anodized treatments, resisting salt corrosion, UV fade, and scratch marks.</p>
            </div>

            {/* Safe & Secure */}
            <div className="feature-card">
              <div className="feature-icon-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Advanced Safe Locking</h3>
              <p>Equipped with burglar-resistant multi-point locking mechanisms. Heavy-duty internal steel gears and interlocking systems keep doors and windows fully secured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info-panel">
            <div className="contact-header">
              <h2>Let's Craft Your Views</h2>
              <p>Get in touch with our design engineers for architectural suggestions, site measurements, and custom estimations tailored for your project.</p>
            </div>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">📞</div>
                <div className="contact-detail-content">
                  <h4>Call Our Hotline</h4>
                  <p><a href="tel:+919825904504">+91 98259 04504</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">✉️</div>
                <div className="contact-detail-content">
                  <h4>Email Enquiries</h4>
                  <p><a href="mailto:info@sakarwindow.com">info@sakarwindow.com</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">📍</div>
                <div className="contact-detail-content">
                  <h4>Corporate Office</h4>
                  <p>Sakar Window System, G-Block, Industrial Development Area, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="contact-detail-item" id="about">
              <div className="contact-detail-content">
                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>About Sakar Window System</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  For over 15 years, Sakar Window System has stood as a pioneer in architectural glazing solutions. We merge high-performance European technology with Indian craftsmanship, designing doors and windows that enhance architectural style, ensure structural stability, and guarantee thermal efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Enquiry Form Card */}
          <div className="contact-form-card">
            <h3>Request a Quote</h3>
            <p>Fill out the form below and our project engineers will get back to you with custom details.</p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="form-control" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="form-control" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  className="form-control" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="product">Interested System</label>
                <select 
                  id="product" 
                  name="product" 
                  className="form-control"
                  value={formData.product}
                  onChange={handleInputChange}
                >
                  <option value="Sliding Systems">Thermal Break Sliding Systems</option>
                  <option value="Casement Windows">Premium Casement Series</option>
                  <option value="Folding Bi-Fold Doors">Folding Bi-Fold Doors</option>
                  <option value="Minimalist Slimline">Minimalist Slimline Series</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Requirements / Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  required 
                  className="form-control" 
                  placeholder="Enter details like site measurements, dimensions, quantity, or specific details..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo-col">
              <SakarLogo height={56} showText={true} light={true} />
              <p>Architectural aluminium window and door systems designed for modern residences, penthouses, and commercial buildings. Engineered for absolute storm proofing, thermal breaks, and long-term durability.</p>
            </div>

            <div className="footer-links-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#products">Product Catalogue</a></li>
                <li><a href="#specs">Technical Specifications</a></li>
                <li><a href="#contact">Contact Us / Quote</a></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4>Direct Contact Details</h4>
              <div className="footer-contacts">
                <div className="footer-contact-item">
                  <span>📍</span>
                  <p>Ahmedabad, Gujarat, India</p>
                </div>
                <div className="footer-contact-item">
                  <span>✉️</span>
                  <p>info@sakarwindow.com</p>
                </div>
                <div className="footer-contact-item">
                  <span>📞</span>
                  <p>+91 98259 04504</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sakar Window System. All rights reserved.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon" aria-label="Facebook">FB</a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">IG</a>
              <a href="#" className="footer-social-icon" aria-label="LinkedIn">LN</a>
              <a href="#" className="footer-social-icon" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat */}
      <WhatsAppWidget />
    </>
  );
}
