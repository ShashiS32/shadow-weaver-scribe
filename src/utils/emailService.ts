
import emailjs from '@emailjs/browser';

// EmailJS configuration - users will need to set these up
const EMAILJS_SERVICE_ID = 'service_sat_math_pro';
const EMAILJS_TEMPLATE_ID_REGISTRATION = 'template_registration';
const EMAILJS_TEMPLATE_ID_CLASS_SIGNUP = 'template_class_signup';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';

export const sendRegistrationEmail = async (userData: {
  fullName: string;
  email: string;
  gradeLevel: string;
  confidenceLevel: string;
}) => {
  try {
    // Send email to user
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_REGISTRATION,
      {
        to_email: userData.email,
        to_name: userData.fullName,
        grade_level: userData.gradeLevel,
        confidence_level: userData.confidenceLevel,
        admin_email: 'shashwats17@gmail.com'
      },
      EMAILJS_PUBLIC_KEY
    );

    // Send notification to admin
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_admin_notification',
      {
        to_email: 'shashwats17@gmail.com',
        notification_type: 'New User Registration',
        user_name: userData.fullName,
        user_email: userData.email,
        user_grade: userData.gradeLevel,
        user_confidence: userData.confidenceLevel
      },
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

export const sendClassSignupEmail = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  preferredTime: string;
  comments: string;
}) => {
  try {
    // Send confirmation email to user
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CLASS_SIGNUP,
      {
        to_email: formData.email,
        to_name: formData.fullName,
        grade_level: formData.gradeLevel,
        preferred_time: formData.preferredTime,
        admin_email: 'shashwats17@gmail.com'
      },
      EMAILJS_PUBLIC_KEY
    );

    // Send notification to admin
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_admin_notification',
      {
        to_email: 'shashwats17@gmail.com',
        notification_type: 'Class Registration',
        user_name: formData.fullName,
        user_email: formData.email,
        user_phone: formData.phone,
        user_grade: formData.gradeLevel,
        preferred_time: formData.preferredTime,
        comments: formData.comments
      },
      EMAILJS_PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
