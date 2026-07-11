import { useState, useEffect } from 'react';
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
    window.open('https://wa.me/919586995244?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20Sakar%20Window%20Systems.', '_blank');
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
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#ffffff' }}>Sakar Window System</h4>
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
              <svg width="20" height="20" viewBox="0 0 16 16" style={{ marginRight: '4px' }}>
                <path fill="#ffffff" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z"/>
                <path fill="#25d366" fillRule="evenodd" d="M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
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
          if (!isOpen) e.currentTarget.style.transform = 'scale(1.08) rotate(15deg)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.transform = 'scale(1) rotate(0)';
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '28px', fontWeight: 'light' }}>&times;</span>
        ) : (
          <svg width="36" height="36" viewBox="0 0 16 16">
            <path fill="#ffffff" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z"/>
            <path fill="#25d366" fillRule="evenodd" d="M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
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
