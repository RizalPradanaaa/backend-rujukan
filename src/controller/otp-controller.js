import { requestOtp, verifyOtp } from "../service/otp-service.js";

export const requestOtpController = async (req, res, next) => {
  try {
    const { phone } = req.body;
    await requestOtp(phone);
    res.status(200).json({ message: "OTP berhasil dikirim ke WhatsApp." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtpController = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    await verifyOtp(phone, otp);
    res.status(200).json({ message: "Verifikasi berhasil. Silakan login." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
