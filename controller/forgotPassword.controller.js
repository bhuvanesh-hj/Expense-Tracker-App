const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const uuid = require("uuid");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const ForgotPassword = require("../models/forgotPasswordRequests.model");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const id = uuid.v4();

      await ForgotPassword.create({
        id: id,
        userId: user._id,
        isActive: true,
      });

      const client = Sib.ApiClient.instance;

      const apiKey = client.authentications["api-key"];

      apiKey.apiKey = process.env.API_KEY;
      // console.log(process.env.API_KEY)

      const sender = {
        email: "bhuvaneshhj@gmail.com",
      };

      const receiver = [
        {
          email: email,
        },
      ];

      let transactionalEmailApi = new Sib.TransactionalEmailsApi();

      await transactionalEmailApi.sendTransacEmail({
        subject: "Reset your password",
        sender,
        to: receiver,
        textContent: `Reset your password from this link :- `,
        htmlContent: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <html lang="en">
        
          <head></head>
          <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${
            user.username
          } reset your password<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>
        
          <body style="background-color:#f6f9fc;padding:10px 0">
            <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
              <tr style="width:100%">
                <td><img alt="Dropbox" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/dropbox-logo.png" width="40" height="33" style="display:block;outline:none;border:none;text-decoration:none" />
                  <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Hi ${
                            user.username
                          },</p>
                          <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">You recently requested a password change for your Expense Tracker app account. If this was you, you can set a new password here:</p><a href="${process.env.WEBSITE
                          //   .split(
                          //   ":"
                          // )
                          //   .slice(0, 2)
                          //   .join(
                          //     ":"
                          //   )
                          }/password/resetpassword/${id}" target="_blank" style="background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-decoration:none;text-align:center;display:inline-block;width:210px;padding:0px 0px;line-height:100%;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-decoration:none;text-align:center;display:inline-block;width:210px;padding:14px 7px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Reset password</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                          <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">If you don&#x27;t want to change your password or didn&#x27;t request this, just ignore and delete this message.</p>
                          <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">To keep your account secure, please don&#x27;t forward this email to anyone. See our Help Center for <a target="_blank" style="color:#067df7;text-decoration:underline" href="#">more security tips.</a></p>
                          <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Have a nice day!😊</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>
        `,
      });

      res.status(200).json({
        success: true,
        message: "Reset password link is sent to your mail.",
      });
    } else {
      throw new Error("User doesn't exist.");
    }
  } catch (error) {
    console.log("error while forgot password", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const request = await ForgotPassword.findOne({ id: reqId });

    // console.log(request.id,reqId);

    if (request.id == reqId) {
      request.isActive = false;
      await request.save();

      res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Update new password</title>
          <link rel="stylesheet" href="/css/userActions.css">
          <script
            src="https://kit.fontawesome.com/64d58efce2.js"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.2/axios.min.js"
            integrity="sha512-b94Z6431JyXY14iSXwgzeZurHHRNkLt9d6bAHt7BZT38eqV+GyngIi/tVye4jBKPYQ2lBdRs0glww4fmpuLRwA=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
            defer
          ></script>
      </head>
      <body>
          <form action="#" class="sign-in-form">
              <h2 class="title">Update new password</h2>
              <p>Please enter your new password. </p>
              <div class="error-view"></div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Enter your new password" required id="password-sign-in" />
              </div>
              <input type="submit" value="Update" class="btn solid" />
              </div>
            </form>
      </body>
      <script>
          document.querySelector(".btn").onclick = async (e) => {
              e.preventDefault();
              try {
                  const password = document.querySelector("#password-sign-in").value;
      
                  const obj = {
                      password
                  }
      
                  const response = await axios.post("${process.env.WEBSITE
                  //   .split(
                  //   ":"
                  // )
                  //   .slice(0, 2)
                  //   .join(":")
                  }/password/updatepassword/${reqId}",obj)
                  window.location = "/", true;
                   alert(response.data.message)
      
              } catch (error) {
                  console.log(error);
                  const er = document.querySelector(".error-view");
                  er.style.color = "red";
                  er.textContent = error.message
              }
          }
      </script>
      </html>`);
    } else {
      throw new Error(
        "Something went wrong while updating the resetting the password."
      );
    }
  } catch (error) {
    console.log("error in reset password", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const reqId = req.params.id;

    const request = await ForgotPassword.findOne({ id: reqId });

    if (!request) {
      throw new Error("Invalid request id.");
    }

    const user = await User.findOne({ _id: request.userId });

    if (!password) {
      throw new Error("Please fill the password it is mandatory.");
    }

    if (user) {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) throw new Error("Something went wrong!");

        user.password = hash;
        await user.save();

        res.status(201).json({ message: "New password updated successfully." });
      });
    } else {
      res.status(404).json({ success: false, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
