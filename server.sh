#!/bin/bash
me=`dirname $0`
action=$1

if [[ $action == 'start' ]]; then
	$me/node_modules/.bin/forever -s -l $me/logs/forever.log -o $me/logs/out.log -e $me/logs/err.log $me/app.js &
	echo 'started'
elif [[ $action == 'stop' ]]; then
	$me/node_modules/.bin/forever stop app.js
	echo 'stopped'
elif [[ $action == 'list' ]]; then
	$me/node_modules/.bin/forever list
else
	echo 'Please supply a command.'
	echo 'start - starts app.js'
	echo 'stop  - stops app.js'
	echo 'list  - lists running daemons'
fi

exit;