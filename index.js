var nodemailer = require('nodemailer');

const handler = function (event, context, callback) {
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: 'dhilip1211@gmail.com',
			clientId: '**************',
			clientSecret: '**************',
			refreshToken: '**************',
			accessToken: '**************',
			expires: 3599
		}
	});

	const { message = '', email = ''} = event;
	var text = message + ',' + email;

	var mailOptions = {
		from: 'dhilip1211@gmail.com',
		to: 'dhilip1211@gmail.com',
		bcc: '',
		subject: 'Test subject',
		text: text,
		html: `<p>Html text message here </p>`
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			const response = {
				statusCode: 500,
				body: JSON.stringify({
					error: error.message,
				}),
			};
			callback(null, response);
			return;
		}
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: `Email processed succesfully!`
			}),
		};
		callback(null, response);
	});
}

handler({}, {}, (err, res) => {
	console.log(err, res);
});

// http://blog.bessam.engineer/How-to-use-nodemailer-with-GMail-and-OAuth

// dont include “.apps.googleusercontent.com” in clientId
// copy ‘accessToken’ from whre you received refresh token


// increase expiry timeout