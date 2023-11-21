import express from 'express'
import router from './router.js'

const app = new express()
const port = process.env.PORT || 3000

// 应用级别中间件
// 回调函数 req res next 三个参数
// next 方法将流程交由下个中间件处理函数
app.use((req, res, next) => {
    next()
})

// 限定路由方法的应用级别中间件
// 可以写多个回调函数，通过 next 方法连通
app.get('/index', (req, res, next) => {
    console.log(req.url)
    next()
}, (req, res) => {
    res.send('index')
})

// 路由中间件
// 允许指定前缀匹配
app.use('/router', router)

// all 方法不区分路由请求方法，只要路由路径匹配就能够触发
app.all('/xx', (req, res) => {
    res.send('xx')
})

// 路径匹配字符中支持正则表达式
app.get('/us?er', (req, res) => {
    res.send(`${req.method}--${req.url}`)
})

// get 方法通过 url 向后台传递参数
// 在后端使用 req.params 获取参数信息
app.get('/article/:id/author/:name', (req, res) => {
    console.log(req.params);
    res.send(`${req.method}--${req.url}`)
})


// 路由的链式调用写法，看起来简洁一点，功能一致
app
    .get('/page1', (req, res) => {
        res.send('page1')
    })
    .get('/page2', (req, res) => {
        res.send('page2')
    })
    .post('/page3', (req, res) => {
        res.send('page3')
    })

// res 对象有多个响应返回方法，并且也支持链式调用
app.get('/data', (req, res) => {
    // res.send()
    // res.json()
    // res.status()
    // res.download()
    // res.redirect()
    // res.render()
    res.status(404).send('404 Not Found.')
})

// 错误处理中间件
// 回调函数有四个参数，第一个是抛错信息
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('500 service Error')
})

app.listen(port, () => {
    console.log(`Run http://localhost:${port}`)
})