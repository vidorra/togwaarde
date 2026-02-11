# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Settings:
- **Template Name**: `Contact Form`
- **Subject**: `{{subject}} - FlesvoedingCalculator.nl`

### Template Content:
```
Nieuwe {{message_type}} van FlesvoedingCalculator.nl

Van: {{from_name}} ({{from_email}})
Onderwerp: {{subject}}
Type: {{message_type}}
Datum: {{timestamp}}

Bericht:
{{message}}

---
Deze email is verzonden via het contactformulier op FlesvoedingCalculator.nl
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to **Account** -> **API Keys**
2. Copy your **Public Key** (e.g., `abc123xyz`)

## Step 5: Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 6: Test the Setup
1. Restart your development server: `npm run dev`
2. Open the website and try the contact form
3. Check your email (info@vidorra.nl) for the test message
4. Check the browser console for any errors

## Template Variables Available
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{message_type}}` - "feedback" or "contact"
- `{{timestamp}}` - When the message was sent
- `{{to_email}}` - Destination email (info@vidorra.nl)
- `{{reply_to}}` - User's email for replies

## Troubleshooting
- Make sure all environment variables are set correctly
- Check that your email service is properly configured
- Verify your template ID matches exactly
- Check browser console for error messages
- Ensure your domain is added to EmailJS allowed origins (for production)

## Rate Limits (Free Plan)
- 200 emails per month
- 50 emails per day
- For higher limits, consider upgrading to a paid plan