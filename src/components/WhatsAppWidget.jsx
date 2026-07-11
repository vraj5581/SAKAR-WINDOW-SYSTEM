import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open the widget after 3 seconds for engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/919825904504?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20Sakar%20Window%20Systems.', '_blank');
  };

  return (
    <div className="whatsapp-widget-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, fontFamily: "'Inter', sans-serif" }}>
      {/* Chat window popup */}
      {isOpen && (
        <div className="whatsapp-chat-box" style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          marginBottom: '15px',
          border: '1px solid #eef1f4',
          animation: 'slideUp 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#0F3F6B', // Matches Sakar Blue
            padding: '20px',
            color: '#ffffff',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Status dot */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={logoImg} 
                  alt="Sakar Logo Icon" 
                  style={{ 
                    height: '142%', // Scale up to hide text
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block'
                  }} 
                />
              </div>
              <span style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                border: '2px solid #0F3F6B',
                position: 'absolute',
                bottom: '0',
                right: '0'
              }} />
            </div>
            
            <div>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Sakar Window System</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#c3d3e2' }}>Online | Typically replies instantly</p>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                color: '#ffffff',
                opacity: 0.7,
                fontSize: '18px',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>

          {/* Body message */}
          <div style={{ padding: '20px', backgroundColor: '#f5f7fa' }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '12px 16px',
              borderRadius: '0 12px 12px 12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              fontSize: '14px',
              color: '#334155',
              lineHeight: '1.4'
            }}>
              Hi there! 👋 How can we help you choose the perfect aluminium window or door system for your space?
            </div>
          </div>

          {/* Action button */}
          <div style={{ padding: '15px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={handleWhatsAppRedirect}
              style={{
                backgroundColor: '#25d366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                padding: '12px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(37,211,102,0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.11-2.884-6.978C16.59 1.895 14.12 .868 11.5 0c-5.44 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.418 1.328 4.908L1.87 20.894l6.236-1.637zM17.848 14.54c-.322-.162-1.91-.944-2.207-1.052-.298-.108-.515-.162-.73.162-.217.324-.838 1.052-1.027 1.268-.19.215-.38.243-.702.08-.323-.162-1.36-.5-2.593-1.6-1.01-.902-1.625-2.187-1.823-2.527-.198-.34-.02-.524.14-.686.145-.145.32-.377.48-.566.16-.188.213-.323.32-.538.107-.215.053-.404-.027-.566-.08-.162-.73-1.758-1.002-2.404-.265-.637-.53-.55-.73-.56-.19-.009-.407-.01-.624-.01-.217 0-.57.08-.868.404-.298.324-1.14 1.114-1.14 2.718 0 1.604 1.167 3.153 1.328 3.37.163.215 2.298 3.51 5.568 4.92 1.353.585 2.057.674 2.82.56.837-.124 2.207-.902 2.518-1.776.31-.873.31-1.62.217-1.776-.092-.158-.31-.243-.632-.405z"/>
              </svg>
              Chat on WhatsApp
            </button>
            <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
              Online | <a href="/privacy" onClick={(e) => { e.preventDefault(); alert("Sakar Window System respects your privacy and secures all communications."); }} style={{ textDecoration: 'underline', color: '#64748b' }}>Privacy policy</a>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          float: 'right'
        }}
        onMouseEnter={(e) => {
          if(!isOpen) e.currentTarget.style.transform = 'scale(1.08) rotate(15deg)';
        }}
        onMouseLeave={(e) => {
          if(!isOpen) e.currentTarget.style.transform = 'scale(1) rotate(0)';
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '28px', fontWeight: 'light' }}>&times;</span>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.11-2.884-6.978C16.59 1.895 14.12 .868 11.5 0c-5.44 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.418 1.328 4.908L1.87 20.894l6.236-1.637zM17.848 14.54c-.322-.162-1.91-.944-2.207-1.052-.298-.108-.515-.162-.73.162-.217.324-.838 1.052-1.027 1.268-.19.215-.38.243-.702.08-.323-.162-1.36-.5-2.593-1.6-1.01-.902-1.625-2.187-1.823-2.527-.198-.34-.02-.524.14-.686.145-.145.32-.377.48-.566.16-.188.213-.323.32-.538.107-.215.053-.404-.027-.566-.08-.162-.73-1.758-1.002-2.404-.265-.637-.53-.55-.73-.56-.19-.009-.407-.01-.624-.01-.217 0-.57.08-.868.404-.298.324-1.14 1.114-1.14 2.718 0 1.604 1.167 3.153 1.328 3.37.163.215 2.298 3.51 5.568 4.92 1.353.585 2.057.674 2.82.56.837-.124 2.207-.902 2.518-1.776.31-.873.31-1.62.217-1.776-.092-.158-.31-.243-.632-.405z"/>
          </svg>
        )}
      </button>

      {/* Styled animation inside widget container */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
