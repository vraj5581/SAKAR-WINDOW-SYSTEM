import { useState, useEffect } from 'react';
import SakarLogo from './SakarLogo';

export default function AdminDashboard({ onBackToWebsite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    tag: 'Sliding',
    description: '',
    profile_width: '',
    glazing_thickness: '',
    acoustic_rating: '',
    water_tightness: '',
    imageFile: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Resize listener for mobile responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Check Authentication Status on Mount
  useEffect(() => {
    fetch('/api/auth.php?action=check', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchProducts();
        }
      })
      .catch(() => setErrorMsg('Failed to connect to authentication server.'));
  }, []);

  // 2. Fetch Products from Database
  function fetchProducts() {
    setLoading(true);
    fetch('/api/get_products.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setErrorMsg('Failed to parse products list.');
        }
      })
      .catch(() => setErrorMsg('Failed to load products.'))
      .finally(() => setLoading(false));
  }

  // 3. Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    fetch('/api/auth.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true);
          fetchProducts();
        } else {
          setErrorMsg(data.error || 'Invalid credentials');
        }
      })
      .catch(() => setErrorMsg('Login server error.'))
      .finally(() => setLoading(false));
  };

  // 4. Handle Logout
  const handleLogout = () => {
    fetch('/api/auth.php?action=logout', { method: 'POST', credentials: 'include' })
      .then(() => {
        setIsAuthenticated(false);
        setProducts([]);
      });
  };

  // 5. Open Form for Create / Edit
  const openForm = (product = null) => {
    setErrorMsg('');
    setSuccessMsg('');
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        tagline: product.tagline,
        tag: product.tag,
        description: product.description,
        profile_width: product.profile_width,
        glazing_thickness: product.glazing_thickness,
        acoustic_rating: product.acoustic_rating,
        water_tightness: product.water_tightness,
        imageFile: null
      });
      setImagePreview(product.image_url);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        tagline: '',
        tag: 'Sliding',
        description: '',
        profile_width: '',
        glazing_thickness: '',
        acoustic_rating: '',
        water_tightness: '',
        imageFile: null
      });
      setImagePreview(null);
    }
    setIsFormOpen(true);
  };

  // 6. Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      // Set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 7. Handle Create & Update Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const form = new FormData();
    form.append('name', formData.name);
    form.append('tagline', formData.tagline);
    form.append('tag', formData.tag);
    form.append('description', formData.description);
    form.append('profile_width', formData.profile_width);
    form.append('glazing_thickness', formData.glazing_thickness);
    form.append('acoustic_rating', formData.acoustic_rating);
    form.append('water_tightness', formData.water_tightness);
    if (formData.imageFile) {
      form.append('image', formData.imageFile);
    }
    if (editingProduct) {
      form.append('id', editingProduct.id);
    }

    const actionUrl = editingProduct 
      ? '/api/manage_product.php?action=update' 
      : '/api/manage_product.php?action=create';

    fetch(actionUrl, {
      method: 'POST',
      body: form,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg(data.message);
          setIsFormOpen(false);
          fetchProducts();
        } else {
          setErrorMsg(data.error || 'Action failed.');
        }
      })
      .catch(() => setErrorMsg('Failed to transmit product data.'))
      .finally(() => setLoading(false));
  };

  // 8. Delete Product
  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      
      fetch('/api/manage_product.php?action=delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSuccessMsg(data.message);
            fetchProducts();
          } else {
            setErrorMsg(data.error || 'Failed to delete product.');
          }
        })
        .catch(() => setErrorMsg('Delete request failed.'))
        .finally(() => setLoading(false));
    }
  };

  // Authentication View
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #11161B 0%, #0E3F6B 100%)',
        fontFamily: "'Inter', sans-serif",
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          padding: '40px 30px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <SakarLogo height={48} showText={true} />
            <h2 style={{ marginTop: '15px', fontSize: '1.5rem', color: '#11161B', fontWeight: '700' }}>Admin Login Portal</h2>
            <p style={{ fontSize: '0.875rem', color: '#4E5862', marginTop: '4px' }}>Access your catalogue manager panel</p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#b91c1c',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px', letterSpacing: '0.05em' }}>Username</label>
              <input 
                type="text" 
                required 
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div style={{ textAlign: 'left', marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px', letterSpacing: '0.05em' }}>Password</label>
              <input 
                type="password" 
                required 
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#0E3F6B',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <button 
            onClick={onBackToWebsite}
            style={{
              background: 'none',
              border: 'none',
              color: '#165D95',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginTop: '25px',
              cursor: 'pointer'
            }}
          >
            ← Back to Website
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Management View
  return (
    <div className="admin-dashboard-wrapper" style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: "'Inter', sans-serif",
      color: '#11161B'
    }}>
      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E2E8F0',
        padding: isMobile ? '12px 15px' : '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '20px' }}>
          <SakarLogo height={isMobile ? 32 : 42} showText={true} />
          {!isMobile && (
            <span style={{
              backgroundColor: '#F1F5F9',
              color: '#0E3F6B',
              padding: '4px 12px',
              borderRadius: '15px',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>CATALOGUE MANAGER</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '8px' : '15px' }}>
          <button 
            onClick={onBackToWebsite}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {isMobile ? 'Website' : 'View Website'}
          </button>
          <button 
            onClick={handleLogout}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              borderRadius: '6px',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '600',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: isMobile ? '20px auto' : '40px auto', padding: isMobile ? '0 15px' : '0 30px' }}>
        
        {/* Alerts */}
        {errorMsg && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '16px', borderRadius: '8px', marginBottom: '25px' }}>
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '16px', borderRadius: '8px', marginBottom: '25px' }}>
            ✅ {successMsg}
          </div>
        )}

        {/* Dashboard Header Summary */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? '16px' : '0',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '1.4rem' : '1.75rem', fontWeight: '700', color: '#11161B', margin: 0 }}>Product Catalogue</h1>
            <p style={{ color: '#4E5862', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>Manage all the architectural window and door profiles</p>
          </div>
          <button 
            onClick={() => openForm()}
            style={{
              backgroundColor: '#0E3F6B',
              color: '#ffffff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(14, 63, 107, 0.2)'
            }}
          >
            <span>+</span> Add New Product
          </button>
        </div>

        {/* Products List / Grid container */}
        <div style={{
          backgroundColor: isMobile ? 'transparent' : '#ffffff',
          borderRadius: '8px',
          border: isMobile ? 'none' : '1px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          {loading && products.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#4E5862' }}>Loading dynamic systems catalogue...</div>
          ) : products.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#4E5862' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>No products found</p>
              <p style={{ fontSize: '0.85rem', color: '#A3ABB2', marginTop: '4px' }}>Click the button above to add your first product system.</p>
            </div>
          ) : isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '15px' }}>
              {products.map(p => (
                <div key={p.id} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  {/* Image and Header */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                    <div style={{
                      width: '70px',
                      height: '50px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      flexShrink: 0
                    }}>
                      <img 
                        src={p.image_url} 
                        alt={p.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/src/assets/window_sliding.png'; }}
                      />
                    </div>
                    <div style={{ minWidth: 0, flexGrow: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#11161B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                      <div style={{ color: '#165D95', fontSize: '0.75rem', fontWeight: '500', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.tagline}</div>
                    </div>
                    <span style={{
                      backgroundColor: '#E0F2FE',
                      color: '#0369A1',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>{p.tag}</span>
                  </div>

                  <p style={{ margin: '0 0 12px 0', color: '#4E5862', fontSize: '0.8rem', lineHeight: '1.4' }}>{p.description}</p>

                  {/* Specs */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    marginBottom: '15px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px 12px',
                    fontSize: '0.75rem'
                  }}>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.02em' }}>Profile Width</div>
                      <div style={{ color: '#0E3F6B', fontWeight: '600', marginTop: '2px' }}>{p.profile_width || '-'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.02em' }}>Glazing</div>
                      <div style={{ color: '#0E3F6B', fontWeight: '600', marginTop: '2px' }}>{p.glazing_thickness || '-'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.02em' }}>Acoustic</div>
                      <div style={{ color: '#0E3F6B', fontWeight: '600', marginTop: '2px' }}>{p.acoustic_rating || '-'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '500', letterSpacing: '0.02em' }}>Weather</div>
                      <div style={{ color: '#0E3F6B', fontWeight: '600', marginTop: '2px' }}>{p.water_tightness || '-'}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => openForm(p)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '16px 20px', fontWeight: '600', color: '#11161B' }}>Image</th>
                    <th style={{ padding: '16px 20px', fontWeight: '600', color: '#11161B' }}>Product Details</th>
                    <th style={{ padding: '16px 20px', fontWeight: '600', color: '#11161B' }}>Tag / Series</th>
                    <th style={{ padding: '16px 20px', fontWeight: '600', color: '#11161B' }}>Technical Specs</th>
                    <th style={{ padding: '16px 20px', fontWeight: '600', color: '#11161B', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background 0.15s' }}>
                      <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                        <div style={{
                          width: '70px',
                          height: '50px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0'
                        }}>
                          <img 
                            src={p.image_url} 
                            alt={p.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/src/assets/window_sliding.png'; }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top', maxWidth: '300px' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#11161B' }}>{p.name}</div>
                        <div style={{ color: '#165D95', fontSize: '0.8rem', fontWeight: '500', marginTop: '2px' }}>{p.tagline}</div>
                        <p style={{ color: '#4E5862', fontSize: '0.8rem', marginTop: '6px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                        <span style={{
                          backgroundColor: '#E0F2FE',
                          color: '#0369A1',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>{p.tag}</span>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 10px', fontSize: '0.78rem' }}>
                          <span style={{ color: '#4E5862', fontWeight: '500' }}>Profile:</span>
                          <span style={{ color: '#11161B', fontWeight: '600' }}>{p.profile_width}</span>
                          <span style={{ color: '#4E5862', fontWeight: '500' }}>Glazing:</span>
                          <span style={{ color: '#11161B', fontWeight: '600' }}>{p.glazing_thickness}</span>
                          <span style={{ color: '#4E5862', fontWeight: '500' }}>Acoustic:</span>
                          <span style={{ color: '#11161B', fontWeight: '600' }}>{p.acoustic_rating}</span>
                          <span style={{ color: '#4E5862', fontWeight: '500' }}>Weather:</span>
                          <span style={{ color: '#11161B', fontWeight: '600' }}>{p.water_tightness}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <button 
                            onClick={() => openForm(p)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#F1F5F9',
                              border: '1px solid #E2E8F0',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#FEE2E2',
                              color: '#991B1B',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Form Dialog Modal Drawer */}
      {isFormOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(17, 22, 27, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 100
        }}>
          <div style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : '550px',
            height: '100%',
            backgroundColor: '#ffffff',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideLeft 0.3s ease'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#11161B', margin: 0 }}>
                {editingProduct ? 'Edit Product Profile' : 'Add New Product Profile'}
              </h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#A3ABB2', padding: 0, display: 'flex', alignItems: 'center' }}
              >&times;</button>
            </div>

            {/* Modal Form Scroll Area */}
            <form onSubmit={handleFormSubmit} style={{ flexGrow: 1, overflowY: 'auto', padding: isMobile ? '20px' : '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px' }}>System Name</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. Thermal Break Sliding Systems"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px' }}>Tagline / Short Desc</label>
                <input 
                  type="text" 
                  name="tagline"
                  required 
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  placeholder="e.g. Smooth Glide Tracks"
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px' }}>Category Tag</label>
                <select 
                  name="tag"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  value={formData.tag}
                  onChange={handleInputChange}
                >
                  <option value="Sliding">Sliding Systems</option>
                  <option value="Casement">Casement Series</option>
                  <option value="Slimline">Minimalist Slimline</option>
                  <option value="Folding">Bi-Fold Doors</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px' }}>Product Image</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  {imagePreview && (
                    <div style={{ width: '100px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E2E8F0', flexShrink: 0 }}>
                      <img src={imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '6px' }}>Description</label>
                <textarea 
                  name="description"
                  required 
                  rows="4"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  placeholder="Provide details about structural frames, durability, mechanisms..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: '#4E5862', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '16px' }}>Technical Specifications</h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '4px' }}>Profile Width</label>
                  <input 
                    type="text" 
                    name="profile_width"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    placeholder="e.g. 45mm to 120mm"
                    value={formData.profile_width}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '4px' }}>Glazing Thickness</label>
                  <input 
                    type="text" 
                    name="glazing_thickness"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    placeholder="e.g. Up to 32mm DGU"
                    value={formData.glazing_thickness}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '4px' }}>Acoustic Rating</label>
                  <input 
                    type="text" 
                    name="acoustic_rating"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    placeholder="e.g. Up to 38 dB"
                    value={formData.acoustic_rating}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', color: '#11161B', marginBottom: '4px' }}>Water/Wind Tightness</label>
                  <input 
                    type="text" 
                    name="water_tightness"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    placeholder="e.g. Class E900 (EN 12208)"
                    value={formData.water_tightness}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Modal Footer Submit Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                borderTop: '1px solid #E2E8F0',
                paddingTop: '20px'
              }}>
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    backgroundColor: '#0E3F6B',
                    color: '#ffffff',
                    cursor: 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Processing...' : editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide Animation Styling */}
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
