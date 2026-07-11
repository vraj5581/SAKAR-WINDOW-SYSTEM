import { useState, useEffect } from 'react';
import SakarLogo from './components/SakarLogo';
import WhatsAppWidget from './components/WhatsAppWidget';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Import assets
import windowSliding from './assets/window_sliding.png';
import windowCasement from './assets/window_casement.png';
import doorFolding from './assets/door_folding.png';
import windowSlimline from './assets/window_slimline.png';

export default function App() {
  const [currentView, setCurrentView] = useState('website'); // 'website' | 'admin'
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      name: 'Thermal Break Sliding Systems',
      tagline: 'Smooth Glide Tracks',
      tag: 'Sliding',
      description: 'Perfectly engineered for wide span openings. Featuring double/triple glazing options, heavy-duty rollers, and multi-point security locking, providing smooth, effortless sliding action with superior sound damping.',
      profile_width: '45mm to 120mm',
      glazing_thickness: 'Up to 32mm DGU',
      acoustic_rating: 'Up to 38 dB',
      water_tightness: 'Class E900 (EN 12208)',
      image_url: windowSliding
    },
    {
      id: 2,
      name: 'Premium Casement Series',
      tagline: 'Classic Swing Windows',
      tag: 'Casement',
      description: 'High-performance outward/inward opening casement windows, offering 100% opening space and maximum airflow. Double compression seals ensure absolute water tightness and air insulation.',
      profile_width: '50mm to 65mm',
      glazing_thickness: 'Up to 28mm DGU',
      acoustic_rating: 'Up to 40 dB',
      water_tightness: 'Class C5 (EN 12210)',
      image_url: windowCasement
    },
    {
      id: 3,
      name: 'Minimalist Slimline Series',
      tagline: 'Floor-to-Ceiling Views',
      tag: 'Slimline',
      description: 'Ultra-thin sightlines of just 20mm, maximizing natural light and offering uninterrupted panoramas. Clean flush floor tracks merge indoor spaces with outdoor vistas seamlessly.',
      profile_width: 'Only 20mm (Interlock)',
      glazing_thickness: 'Double / Triple Glazed',
      acoustic_rating: 'Uf down to 1.6 W/m²K',
      water_tightness: 'Up to 4.5 Meters Height',
      image_url: windowSlimline
    },
    {
      id: 4,
      name: 'Heavy Duty Folding Bi-Fold Doors',
      tagline: 'Expand Your Space',
      tag: 'Folding',
      description: 'Transform whole walls into open spaces. Engineered to carry large, heavy glass panels with multiple fold configurations (up to 7 panels left or right), sliding smooth on bottom tracks.',
      profile_width: '120 kg per panel',
      glazing_thickness: 'Up to 14 Panels total',
      acoustic_rating: 'Top & Bottom Security Bolts',
      water_tightness: 'EPDM Gasket Systems',
      image_url: doorFolding
    }
  ]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'Sliding Systems',
    message: ''
  });

  // Handle Hash-based Routing (#admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('website');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch Products from Database or Fallback
  useEffect(() => {
    if (currentView === 'website') {
      fetch('/api/get_products.php')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setProductsList(data);
          }
        })
        .catch(() => {
          console.log('API offline. Using built-in catalogue fallback.');
        });
    }
  }, [currentView]);

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

  if (currentView === 'admin') {
    return <AdminDashboard onBackToWebsite={() => { window.location.hash = ''; }} />;
  }

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
            <a href="tel:+919586995244" className="btn-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H3C2.2 2.5 1.5 3.2 1.5 4c0 10.2 8.3 18.5 18.5 18.5.8 0 1.5-.7 1.5-1.5v-4c0-.8-.7-1.5-1.5-1.5z"/>
              </svg>
              +91 95869 95244
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

      {/* Mobile Nav Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <SakarLogo height={36} showText={true} light={false} />
          <button 
            className="mobile-drawer-close" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-links">
            <li>
              <a href="#" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">🏠</span>
                <div className="mobile-link-text">
                  <span className="mobile-link-title">Home</span>
                  <span className="mobile-link-desc">Back to start</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">🏢</span>
                <div className="mobile-link-text">
                  <span className="mobile-link-title">About Us</span>
                  <span className="mobile-link-desc">Our legacy & vision</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">🪟</span>
                <div className="mobile-link-text">
                  <span className="mobile-link-title">Products</span>
                  <span className="mobile-link-desc">Premium systems</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#specs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">⚙️</span>
                <div className="mobile-link-text">
                  <span className="mobile-link-title">Specifications</span>
                  <span className="mobile-link-desc">Technical details</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">📞</span>
                <div className="mobile-link-text">
                  <span className="mobile-link-title">Contact Us</span>
                  <span className="mobile-link-desc">Get a custom quote</span>
                </div>
              </a>
            </li>
          </ul>
        </nav>

        <div className="mobile-drawer-ctas">
          <button className="btn-brochure" onClick={() => { handleDownloadBrochure(); setIsMobileMenuOpen(false); }}>
            Download Brochure
          </button>
          <a href="tel:+919586995244" className="btn-phone" onClick={() => setIsMobileMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H3C2.2 2.5 1.5 3.2 1.5 4c0 10.2 8.3 18.5 18.5 18.5.8 0 1.5-.7 1.5-1.5v-4c0-.8-.7-1.5-1.5-1.5z"/>
            </svg>
            +91 95869 95244
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
            {productsList.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-img-container">
                  <span className="product-tag">{product.tag}</span>
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    onError={(e) => {
                      // Fallback in case dynamic upload fails to load
                      if (product.tag === 'Sliding') e.target.src = windowSliding;
                      else if (product.tag === 'Casement') e.target.src = windowCasement;
                      else if (product.tag === 'Slimline') e.target.src = windowSlimline;
                      else if (product.tag === 'Folding') e.target.src = doorFolding;
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-specs">
                    <div className="spec-item">
                      <span className="spec-name">Profile Width</span>
                      <span className="spec-val">{product.profile_width}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-name">Glazing Thickness</span>
                      <span className="spec-val">{product.glazing_thickness}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-name">Acoustic Rating</span>
                      <span className="spec-val">{product.acoustic_rating}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-name">Water/Wind Proof</span>
                      <span className="spec-val">{product.water_tightness}</span>
                    </div>
                  </div>
                  <a 
                    href="#contact" 
                    className="product-action" 
                    onClick={() => setFormData(prev => ({ ...prev, product: product.name }))}
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
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
                  <p><a href="tel:+919586995244">+91 95869 95244</a></p>
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
                 <li><a href="#admin" style={{ opacity: 0.65 }}>Admin Panel</a></li>
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
                  <p>+91 95869 95244</p>
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
