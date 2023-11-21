import express from 'express'

const router = express.Router()

router
    .get('/1', (req, res) => {
        res.send('router1')
    })
    .post('/2', (req, res) => {
        res.send('router2')
    })

export default router