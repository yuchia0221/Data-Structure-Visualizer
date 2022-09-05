const router = require("express").Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Set up for GMAIL Service
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            type: process.env.AUTH_TYPE,
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        },
    });

    return transporter;
};

const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
};

// Routes
// test route
router.get("/", (req, res) => {
    res.send("You are in server : )");
});

// sign in
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({ Login: false, user: user.name, ID: user.id });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.json({ Login: true, user: user.name, ID: user.id });
            });
        }
    })(req, res, next);
});

// sign up
router.post("/register", (req, res) => {
    User.findOne({ name: req.body.username }, async (err, user) => {
        if (err) throw err;
        if (user) {
            console.log("User Already Exists");
            res.json({ SignUp: true, user: user.name, ID: user.id });
        }
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                name: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            await newUser.save();
            res.json({ SignUp: true, user: newUser.name, ID: newUser.id });
        }
    });
});

router.post("/api/subscribe", async (req, res) => {
    let { email } = req.body;

    const emailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Welcome to Ultimate Visualizer Subscription",
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <title>
        
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if lte mso 11]>
                <style type="text/css">
                  .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
        
        
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                    }
                }
            </style>
        
        
            <style type="text/css">
            </style>
        
        </head>
        
        <body style="background-color:#f9f9f9;">
        
        
            <div style="background-color:#f9f9f9;">
        
        
                <!--[if mso | IE]>
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:64px;">
        
                                                                    <img height="auto" src="https://i.imgur.com/KO1vcE9.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                        Welcome to Ultimate Visualizer
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                        Hello there!<br></br>
                                                        Thank you for signing up for Ultimate Visualizer. We're really happy to have you! Click the link to visit our website:
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
        
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                        <tr>
                                                            <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                                <a href="https://blue-cliff-09a573400.azurestaticapps.net/" style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                                    Ultimate Visualizer
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                        Best regards,<br><br> Aaron Chen<br>Ultimate Visualizer, Developer<br>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;padding:0;">
        
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                            <tr>
                                                                <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                        <a href="https://blue-cliff-09a573400.azurestaticapps.net/#/unsubscribe" style="color:#575757">Unsubscribe</a> from our emails
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
        
        
            </div>
        
        </body>
        
        </html>
    `,
    };

    sendEmail(emailOptions);

    res.sendStatus(200);
});

router.post("/api/unsubscribe", async (req, res) => {
    let { email } = req.body;

    const emailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "We’re sorry to see you go",
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>
        
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if lte mso 11]>
                <style type="text/css">
                  .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
        
        
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                    }
                }
            </style>
        
        
            <style type="text/css">
            </style>
        
        </head>
        
        <body style="background-color:#f9f9f9;">
        
        
            <div style="background-color:#f9f9f9;">
        
        
                <!--[if mso | IE]>
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:64px;">
        
                                                                    <img height="auto" src="https://i.imgur.com/KO1vcE9.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                        We’re sorry to see you go, but come back any time
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                        You recently canceled your Ultimate Visualizer subscription and I'm sorry to see you go. Thank you for being with us.
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                        Best regards,<br><br> Aaron Chen<br>Ultimate Visualizer, Developer<br>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;padding:0;">
        
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                        </table>
        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
        
        
            </div>
        
        </body>
        
        </html>`,
    };

    sendEmail(emailOptions);

    res.sendStatus(200);
});

module.exports = router;
