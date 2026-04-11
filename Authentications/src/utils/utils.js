export function generateOtp(){
    return Math.floor(100000 +Math.random() * 900000).toString()
}

//send otp to user 
export function getOtpHtml(otp) {
  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f4f6f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        text-align: center;
        width: 320px;
      }

      h2 {
        color: #333;
        margin-bottom: 10px;
      }

      p {
        color: #666;
        font-size: 14px;
      }

      .otp-box {
        margin-top: 20px;
        font-size: 28px;
        letter-spacing: 8px;
        font-weight: bold;
        color: #2d89ff;
        background: #eef4ff;
        padding: 15px;
        border-radius: 8px;
      }

      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2>OTP Verification</h2>
      <p>Your One Time Password is:</p>

      <div class="otp-box">${otp}</div>

      <div class="footer">
        This OTP is valid for a short time only.
      </div>
    </div>
  </body>
  </html>
  `;
}