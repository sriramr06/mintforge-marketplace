import nodemailer from 'nodemailer';
import { env } from '@/config/env';
import { AppError } from './AppError';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
  }>
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Verify transporter configuration on startup
transporter.verify((error, _success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

export const sendEmail = async ({ to, subject, html, attachments }: EmailOptions) => {
  try{
    const info = await transporter.sendMail({
      from: `"MintForge" <${env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      attachments,
      headers: {
        'X-Entity-Ref-ID': Date.now().toString()
      }
    });
  
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.log('Error sending email:', error);
    throw new AppError(`Failed to send email: ${error instanceof AppError ? error.message : String(error)}`, 500);
  }  
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${env.CLIENT_URL}/verify-email?token=${token}`;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email - MintForge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to MintForge!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}"
          style="display: inline-block; padding: 12px 24px; background: #4f46e5; 
          color: white; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all;">${verificationLink}</p>
        <p>This link will expire in 24 hours.</p>
        <hr />
        <p style="color: #666; font-size: 14px;">If you didn't create an account with MintForge, please ignore this email.</p>
      </div>
    `
  });
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const resetLink = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - MintForge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all;">${resetLink}</p>
        <p>This link will expire in 1 hour.</p>
        <hr />
        <p style="color: #666; font-size: 14px;">If you didn't request a password reset, please ignore this email and secure your account.</p>
      </div>
    `
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  return sendEmail({
    to: email,
    subject: 'Welcome to MintForge! 🎉. You are successfully verified.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to MintForge, ${name}!</h2>
        <p>We're excited to have you on board. Here's what you can do next:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with other users</li>
        </ul>
        <p>If you have any questions, feel free to contact us.</p>
        <p style="color: #666; font-size: 14px;">The MintForge Team</p>
      </div>
    `
  });
};