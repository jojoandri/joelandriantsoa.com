# 📧 Configuration Email pour le Formulaire de Contact

## 🔧 Configuration pour Hostinger (et autres hébergeurs)

Pour que l'envoi d'emails fonctionne avec votre email Hostinger `hello@joelandriantsoa.com` :

### 1. Récupérer les informations SMTP Hostinger

1. **Connectez-vous à votre panneau Hostinger**
2. **Allez dans Email → Comptes Email**
3. **Trouvez les paramètres SMTP** (généralement) :
   - **Serveur SMTP** : `smtp.hostinger.com`
   - **Port** : `587` (STARTTLS) ou `465` (SSL)
   - **Sécurité** : STARTTLS ou SSL/TLS
   - **Authentification** : Votre email complet et mot de passe

### 2. Configurer les variables d'environnement

Dans votre fichier `.env.local` (et en production), ajoutez :

```bash
# Configuration Email Hostinger
EMAIL_USER=hello@joelandriantsoa.com
EMAIL_PASSWORD=votre-mot-de-passe-email-hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
```

**⚠️ Important :** Utilisez le **mot de passe de votre email Hostinger**, pas un mot de passe d'application.

### 3. Configuration de déploiement

**Pour Vercel/Netlify/etc :**
1. Ajoutez ces variables dans les paramètres d'environnement de votre plateforme
2. Ne commitez JAMAIS ces informations dans Git

## 🧪 Mode Développement (Localhost)

En localhost, sans configuration email :
- ✅ Le formulaire fonctionne normalement
- ✅ Redirection vers la page de succès
- ✅ Messages dans la console pour debugging
- ❌ Aucun email réellement envoyé (simulation)

## 🚀 Mode Production

Avec configuration email complète :
- ✅ Emails réellement envoyés à `hello@joelandriantsoa.com`
- ✅ Format HTML professionnel
- ✅ Réponse automatique possible
- ✅ Logs de debugging

## 🐛 Debugging

Les logs dans la console vous indiqueront :
- Si les variables d'environnement sont présentes
- Le mode utilisé (simulation vs real)
- Les erreurs éventuelles

## 📱 Test en Local

1. Remplissez le formulaire sur `http://localhost:3001/contact`
2. Cliquez sur "Send Message"
3. Vérifiez la console pour les logs de debug
4. La page de succès devrait s'afficher

## ⚠️ Important

- Utilisez TOUJOURS un mot de passe d'application, jamais votre mot de passe Gmail principal
- Les variables d'environnement doivent être identiques en local et en production
- Testez d'abord en local, puis déployez
