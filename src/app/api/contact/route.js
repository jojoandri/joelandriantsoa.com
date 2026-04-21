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

    // En local, on garde un mode simulation pour faciliter les tests.
    // En production, on doit renvoyer une erreur explicite pour éviter un faux succès.
    if (!emailUser || !emailPassword) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Mode simulation - Variables d\'environnement manquantes');
        console.log('Données qui seraient envoyées:', { firstName, lastName, email, phone, subject, message });

        return NextResponse.json({
          success: true,
          message: 'Message simulé en local (SMTP non configuré).',
          debug: 'Configure EMAIL_USER et EMAIL_PASSWORD pour un envoi réel.'
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Configuration email manquante sur le serveur (EMAIL_USER/EMAIL_PASSWORD).'
        },
        { status: 500 }
      );
    }

    console.log('🚀 Configuration email détectée - Envoi réel');

    const parsedPort = Number.parseInt(smtpPort || '587', 10);

    // Configuration SMTP pour Hostinger (ou autre hébergeur)
    const transporterConfig = {
      host: smtpHost || 'smtp.hostinger.com',
      port: Number.isNaN(parsedPort) ? 587 : parsedPort,
      secure: parsedPort === 465,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    };

    console.log('📧 Configuration transporteur:', {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      user: emailUser
    });

    const transporter = nodemailer.createTransport(transporterConfig);

    // Vérifier la connexion SMTP avant l'envoi pour une erreur plus claire
    await transporter.verify();

    // Options de l'email
    const mailOptions = {
      from: emailUser,
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

    let userMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
    if (error?.code === 'EAUTH') {
      userMessage = 'Identifiants SMTP invalides. Vérifiez EMAIL_USER et EMAIL_PASSWORD sur Vercel.';
    } else if (error?.code === 'ESOCKET' || error?.code === 'ETIMEDOUT') {
      userMessage = 'Serveur SMTP injoignable ou timeout. Vérifiez SMTP_HOST/SMTP_PORT.';
    }

    return NextResponse.json(
      {
        success: false,
        error: userMessage,
        debug: error?.message
      },
      { status: 500 }
    );
  }
}
