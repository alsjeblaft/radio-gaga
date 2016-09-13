const open = require('open')
const serve = require('koa-static')
const koa = require('koa')
const app = koa()
const port = process.env.PORT || 8080
app.use(serve('./www'))
console.log(`preview server listening on port ${port}`)
app.listen(port)
if (process.argv.indexOf('--open') > -1) {
  open(`http://localhost:${port}/`)
}
