const http = require('http')
const fs = require('fs/promises')
const url = require('url')

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname

    if (pathname === '/favicon.icon') {
      res.end()
      return
    }

    let filename
    if (pathname === '/') {
      filename = './index.html'
    } else if (pathname === '/about') {
      filename = './about.html'
    } else if (pathname === '/contact-me') {
      filename = './contact-me.html'
    } else {
      filename = './404.html'
    }

    const webPage = await fs.readFile(filename, 'utf-8')
    res.write(webPage)
    res.end()
  } catch (error) {
    console.log(error)
  }
})

server.listen(8080)
