import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log('🔥 API Contact appelée');
  
  try {
    const body = await request.json();
    console.log('📦 Données reçues:', body);
    
    const { firstName, lastName, email, phone, subject, message } = body;

    // Validation des champs requis
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log('❌ Validation échouée - champs manquants');
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires doivent être remplis.' },
        { status: 400 }
      );
    }

    console.log('✅ Validation réussie');

    // Vérification des variables d'environnement
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    
    console.log('=== DEBUG EMAIL CONFIG ===');
    console.log('EMAIL_USER présent:', !!emailUser);
    console.log('EMAIL_PASSWORD présent:', !!emailPassword);
    console.log('SMTP_HOST présent:', !!smtpHost);
    console.log('SMTP_PORT présent:', !!smtpPort);
    console.log('Environment:', process.env.NODE_ENV);

    // Si les variables d'environnement ne sont pas configurées (localhost)
    if (!emailUser || !emailPassword) {
      console.log('📧 Mode simulation - Variables d\'environnement manquantes');
      console.log('Données qui seraient envoyées:', { firstName, lastName, email, phone, subject, message });
      
      // Simulation d'envoi réussi pour le développement
      return NextResponse.json({
        success: true,
        message: 'Message envoyé avec succès ! (Mode simulation en localhost)',
        debug: 'Variables EMAIL_USER et EMAIL_PASSWORD non configurées',
        data: { firstName, lastName, email, phone, subject, message }
      });
    }

    console.log('🚀 Configuration email détectée - Envoi réel');

    // Configuration SMTP pour Hostinger (ou autre hébergeur)
    const transporterConfig = {
      host: smtpHost || 'smtp.hostinger.com', // SMTP Hostinger par défaut
      port: parseInt(smtpPort) || 587, // Port STARTTLS
      secure: false, // true pour port 465, false pour autres ports
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
      tls: {
        rejectUnauthorized: false // Pour éviter les problèmes de certificat en dev
      }
    };

    console.log('📧 Configuration transporteur:', {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      user: emailUser
    });

    const transporter = nodemailer.createTransporter(transporterConfig);

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hello@joelandriantsoa.com',
      subject: `Contact Portfolio - ${subject}`,
      text: `
Nouveau message de contact :

Nom: ${firstName} ${lastName}
Email: ${email}
Téléphone: ${phone || 'Non renseigné'}
Sujet: ${subject}

Message:
${message}

---
Envoyé depuis votre formulaire de contact
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Nouveau Message de Contact</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Depuis votre portfolio</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Informations du contact :</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Nom complet :</strong> ${firstName} ${lastName}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #4facfe;">${email}</a></p>
              <p style="margin: 5px 0; color: #666;"><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Sujet :</strong> ${subject}</p>
            </div>
            
            <div style="border-top: 2px solid #f0f0f0; padding-top: 20px;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Message :</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #4facfe;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 14px;">
                Envoyé le ${new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Envoyer l'email
    console.log('📬 Tentative d\'envoi de l\'email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès !',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('💥 Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        debug: error.message
      },
      { status: 500 }
    );
  }
}
