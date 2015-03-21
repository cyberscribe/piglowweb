#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep
from piglow import PiGlow
import urlparse

PORT_NUMBER = 80

#This class will handles any incoming request from
#the browser 
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		parts = urlparse.urlparse(self.path)
		if parts.path=="/":
			self.path="/index.html"
		
		piglow = PiGlow()

		if parts.query != "":
			qs = urlparse.parse_qs( parts.query )
			
			if "r" in qs:
				r = int( qs['r'][0] )
				piglow.red( r )

			if "o" in qs:
				o = int( qs['o'][0] )
				piglow.orange( o )

			if "y" in qs:
				y = int( qs['y'][0] )
				piglow.yellow( y )

			if "g" in qs:
				g = int( qs['g'][0] )
				piglow.green( g )

			if "b" in qs:
				b = int( qs['b'][0] )
				piglow.blue( b )

			if "w" in qs:
				w = int( qs['w'][0] )
				piglow.white( w )

			self.send_response(200)
			self.send_header('Content-type',"application/json")
			self.end_headers()
			self.wfile.write('"true"')
			return
		
		try:
			#Check the file extension required and
			#set the right mime type

			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".png"):
				mimetype='image/png'
				sendReply = True
			if self.path.endswith(".woff"):
				mimetype='application/x-font-woff'
				sendReply = True
			if self.path.endswith(".woff2"):
				mimetype='application/font-woff2'
				sendReply = True
			if self.path.endswith(".ttf"):
				mimetype='application/octet-stream'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True

			if sendReply == True:
				#Open the static file requested and send it
				f = open(curdir + sep + self.path) 
				self.send_response(200)
				self.send_header('Content-type',mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()
			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started piglowweb server on port ' , PORT_NUMBER
	
	#Wait forever for incoming http requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
