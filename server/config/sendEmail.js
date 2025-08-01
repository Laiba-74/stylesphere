// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, html) => {
//   try {
//     console.log("Preparing to send email to:", to); // ✅ Log
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response); // ✅ Log result
//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//     throw error;
//   }
// };

// module.exports = sendEmail;
// sendEmail("laibaejaz760@gmail.com", "Test Email", "<p>Hello Laiba</p>");
