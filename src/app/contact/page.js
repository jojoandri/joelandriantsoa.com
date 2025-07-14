'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Contact from '../../components/Contact';
import Rounded from '../../common/RoundedButton';

const slideUp = {
  initial: {
    y: 300
  },
  enter: {
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  }
};

const fadeIn = {
  initial: {
    opacity: 0,
    y: 50
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }
  }
};

const stagger = {
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function ContactPage() {
  const router = useRouter();
  
  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fonction pour gérer les changements dans les champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Soumission du formulaire démarrée');
    console.log('📄 Données du formulaire:', formData);
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('📡 Envoi de la requête à /api/contact...');
      
      // Envoyer les données à l'API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📨 Réponse reçue:', response.status, response.statusText);
      
      const result = await response.json();
      console.log('📋 Contenu de la réponse:', result);

      if (result.success) {
        console.log('✅ Succès - Redirection vers /contact/success');
        // Rediriger vers la page de succès
        router.push('/contact/success');
      } else {
        console.error('❌ Erreur du serveur:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('💥 Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      console.log('🏁 Fin du processus d\'envoi');
      setIsSubmitting(false);
    }
  };
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.contact}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div variants={fadeIn} className={styles.hero}>
          <h1>Contact Me</h1>
          <p className={styles.subtitle}>Let&#39;s talk about your next project</p>
        </motion.div>

        {/* Contact Form */}
        <motion.section variants={stagger} initial="initial" animate="enter" className={styles.contactForm}>
          <motion.div variants={fadeIn} className={styles.formContainer}>
            <h2>Send Me a Message</h2>
            
            {/* Messages de statut */}
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                ❌ Erreur lors de l'envoi du message. Veuillez réessayer.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <label htmlFor="email">Email</label>
              </div>
              
              <div className={styles.inputGroup}>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <label htmlFor="phone">Phone (optional)</label>
              </div>
              
              <div className={styles.inputGroup}>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose a subject</option>
                  <option value="project">New Project</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="job">Job Opportunity</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="subject">Subject</label>
              </div>
              
              <div className={styles.inputGroup}>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <label htmlFor="message">Message</label>
              </div>
              
              <Rounded type="submit" disabled={isSubmitting}>
                <p>{isSubmitting ? 'Sending...' : 'Send Message'}</p>
              </Rounded>
            </form>
          </motion.div>

          {/* Google Maps Location */}
          <motion.div variants={fadeIn} className={styles.locationInfo}>
            <h2>Find Me on the Map</h2>
            
            <div className={styles.mapContainer}>
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=joel%20andriantsoa%20antananarivo%20madagascar+(Joel%20Andriantsoa)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Joel Andriantsoa Location - Antananarivo, Madagascar"
              ></iframe>
              
              <div className={styles.mapOverlay}>
                <div className={styles.locationCard}>
                  <div className={styles.locationIcon}>📍</div>
                  <div className={styles.locationDetails}>
                    <h3>Joel Andriantsoa</h3>
                    <p>Antananarivo, Madagascar</p>
                    <motion.a 
                      href="https://www.google.com/maps/search/joel+andriantsoa+antananarivo+madagascar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View on Google Maps
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            
          </motion.div>
        </motion.section>

        {/* Quick FAQ Section */}
        <motion.section variants={fadeIn} className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>What kind of digital ads do you specialize in?</h3>
              <p>I specialize in Meta (Facebook & Instagram) Ads and Google Ads, focusing on performance-driven campaigns such as conversion, traffic, and lead generation. My approach combines strategic targeting, A/B testing, and retargeting.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>How do you measure the success of an advertising campaign?</h3>
              <p>I rely on key performance indicators (KPIs) such as ROAS (Return on Ad Spend), CTR (Click-Through Rate), CPA (Cost per Acquisition), and conversion rate. These metrics help evaluate the impact of each campaign and guide strategic adjustments.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What budget do I need to run effective ads?</h3>
              <p>Effective results can start with a modest budget, depending on your goals. For example, even a $100 campaign can generate significant ROI with the right audience targeting and optimization strategy.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you work remotely?</h3>
              <p>Absolutely! I mainly work remotely but can travel for important meetings abroad.</p>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Section Contact - Composant réutilisable */}
      <Contact />
    </motion.main>
  );
}
