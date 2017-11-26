var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

http.createServer(function (request, response) {

	var pathObj = url.parse(request.url, true)
	console.log(pathObj)

	switch (pathObj.pathname) {
		case '/loadMore':

			var index = pathObj.query.index
			var length = pathObj.query.length
			var data = []

			for (var i = 0; i < length; i++) {
				data.push('新闻' + (parseInt(index) + i))
			}
			response.end(JSON.stringify(data))

			break;

		default:
			fs.readFile(path.join(__dirname, pathObj.pathname), function (err, data) {
				if (err) {
					response.statusCode = 404
					response.end('Not found')
				} else {
					response.end(data)
				}
			})

	}
}).listen(8080)