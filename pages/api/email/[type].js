const { ServerClient: PostmarkClient } = require('postmark')
const postmark = new PostmarkClient(process.env.POSTMARK_API_KEY)

export default (req, res) => {
	
	// TODO - figure out server error handling better when postmark fails
	
	const { query: { type } } = req
	
	console.log('type: ', type)
	console.log('body: ', req.body)
	
	if(!req.body.email) {
		return res.status(500).json({
			success: true,
			message: 'Expected email in body'
		})
	}
	
	postmark.sendEmail({
		"From": "hello@linkslacker.com",
		"To": req.body.email,
		"Subject": "Welcome to Link Slacker",
		"HtmlBody": `Thanks for signing up with email ${req.body.email}.`,
		"TextBody": `Thanks for signing up with email ${req.body.email}.`,
		"MessageStream": "outbound"
	})
	
	res.status(200).json({
		success: true
	})
	
}
