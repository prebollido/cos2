import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export function generate2FASecret(username) {
  const secret = speakeasy.generateSecret({
    name: `COS (${username})`
  });

  return secret;
}

export async function generateQRCode(otpauth_url) {
  return await QRCode.toDataURL(otpauth_url);
}

export function verify2FACode(secret, token) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1
  });
}