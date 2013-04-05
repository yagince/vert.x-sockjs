require "vertx"
include Vertx

server = HttpServer.new

# Serve the index page
server.request_handler { |req| req.response.send_file("index.html") if req.uri == "/"}

sjs_server = SockJSServer.new(server)

# The handler for the SockJS app - we just echo data back
sjs_server.install_app({"prefix" => "/testapp"}) { |sock|
  puts "connected."
  sock.data_handler{ |buff|
    puts buff
    sock.write_buffer(buff)
  }
  sock.end_handler{ puts "connection closed." }
}

server.listen(8080)
