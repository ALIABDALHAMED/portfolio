import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: 'GitHub', icon: '🔗', url: 'https://github.com/ALIABDALHAMED', color: '#ea4335' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/ali-abd-al-hamed-690439217/', color: '#0077b5' },
    { name: 'Twitter', icon: '🐦', url: 'https://x.com/Ali_ElKarDosy?t=Elk3sgkebIlxVM61GLOxGA&s=09', color: '#1da1f2' },
    { name: 'Email', icon: '📧', url: 'mailto:alifooght@gmail.com', color: '#ea4335' },
    { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/01100123640', color: '#25d366' },
    { name: 'Telegram', icon: '✈️', url: 'https://t.me/AliElkarDosy', color: '#0088cc' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    
    if (!section || !form) return;

    // Animate form on scroll
    gsap.fromTo(form,
      {
        y: 100,
        opacity: 0,
        rotationX: 15,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate social links
    gsap.fromTo('.social-link',
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form field focus animations
    const formFields = form.querySelectorAll('.form-field input, .form-field textarea');
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        gsap.to(field.parentElement, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      field.addEventListener('blur', () => {
        gsap.to(field.parentElement, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      formFields.forEach(field => {
        field.removeEventListener('focus', () => {});
        field.removeEventListener('blur', () => {});
      });
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);

    // Success animation
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">
            <span className="title-text">Get In</span>
            <span className="title-text highlight">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Let's create something amazing together
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">🌍</div>
              <h3>Location</h3>
              <p><a href="https://maps.app.goo.gl/QKF6xPqisVTt7imu7" target="_blank" rel="noopener noreferrer">Tima, Egypt</a></p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <p>01100123640</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Availability</h3>
              <p>24/7 Remote Work</p>
            </div>

            <div className="social-links">
              <h3>Connect With Me</h3>
              <div className="social-grid">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': link.color }}
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                />
                <label>Your Name</label>
                <div className="field-border"></div>
              </div>
              
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                />
                <label>Email Address</label>
                <div className="field-border"></div>
              </div>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder=" "
              />
              <label>Subject</label>
              <div className="field-border"></div>
            </div>

            <div className="form-field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder=" "
              ></textarea>
              <label>Your Message</label>
              <div className="field-border"></div>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              <span className="btn-text">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              <span className="btn-icon">🚀</span>
              <div className="btn-particles"></div>
            </button>
          </form>
        </div>

        <div className="contact-footer">
          <div className="footer-text">
            <p>© 2025 Ali Abd Al HaMeD. All rights reserved.</p>
            <p>Built with ❤️ using React & GSAP</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
