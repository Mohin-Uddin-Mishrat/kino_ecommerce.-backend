const nodemailer = require('nodemailer');

exports.SendEmail=async (options)=>{

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });


      let mailOption={
        from: testAccount.user, // sender address
        to:"mmishrat90@gmail.com",
        // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?"// plain text body
      };



  

     await transporter.sendMail(mailOption);
}