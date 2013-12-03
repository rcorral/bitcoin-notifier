var https = require('https'),
	in_development = true,
	threshold = 1000,
	transport = require('./mailtransport'),
	mail_transport = transport.get(),
	mail_stuff = transport.get_mail_stuff()
	;

function _debug() {
	if ( in_development ) {
		console.log.apply(undefined, arguments);
	}
}

function check_price() {
	https.get('https://www.bitstamp.net/api/ticker/', function(res) {
		var body = '';
		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			var data = JSON.parse(body);

			if (data.last <= threshold) {
				send_text(data.last);
			}
		});
	}).on('error', function(e) {
		console.log("error: " + e.message);
	});
}

function send_text(current_price) {
	// send mail with defined transport object
	mail_transport.sendMail({
	    from: mail_stuff.from, // sender address
	    to: mail_stuff.to, // list of receivers
	    subject: 'Sell noowwww', // Subject line
	    text: 'Current price: ' + current_price, // plaintext body
	}, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
}

check_price();
global.setInterval(function(){
	check_price();
}, 1000 * 60 * 5); // Every 5 minutes
