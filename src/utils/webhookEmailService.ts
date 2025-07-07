
// Simple webhook-based email service that doesn't require credentials
// Uses a free service like Webhook.site or similar for notifications

const WEBHOOK_URL = 'https://webhook.site/your-unique-webhook-url'; // Users can get this for free

interface EmailData {
  type: 'registration' | 'class_signup';
  userData: any;
  timestamp: string;
}

export const sendNotificationWebhook = async (type: 'registration' | 'class_signup', userData: any) => {
  try {
    const payload: EmailData = {
      type,
      userData,
      timestamp: new Date().toISOString()
    };

    // Send to webhook for admin notification
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // Log to console for debugging
    console.log(`${type} notification sent:`, payload);
    
    return true;
  } catch (error) {
    console.error('Webhook notification failed:', error);
    return false;
  }
};

export const sendRegistrationNotification = async (userData: {
  fullName: string;
  email: string;
  gradeLevel: string;
  confidenceLevel: string;
}) => {
  return await sendNotificationWebhook('registration', userData);
};

export const sendClassSignupNotification = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  preferredTime: string;
  comments: string;
}) => {
  return await sendNotificationWebhook('class_signup', formData);
};

// Simple browser-based email notification (opens default email client)
export const openEmailClient = (type: 'registration' | 'class_signup', data: any) => {
  const subject = type === 'registration' ? 'New User Registration - SAT Math Pro' : 'New Class Registration - SAT Math Pro';
  const body = type === 'registration' 
    ? `New user registered:\n\nName: ${data.fullName}\nEmail: ${data.email}\nGrade: ${data.gradeLevel}\nLevel: ${data.confidenceLevel}\nDate: ${new Date().toLocaleString()}`
    : `New class registration:\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nGrade: ${data.gradeLevel}\nPreferred Time: ${data.preferredTime}\nComments: ${data.comments}\nDate: ${new Date().toLocaleString()}`;
  
  const mailtoLink = `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, '_blank');
};
