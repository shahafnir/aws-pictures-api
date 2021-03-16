const express = require('express')
const Picture = require('../models/picture')

const router = new express.Router()

router.post('/pictures', async (req, res) => {
    const picture = new Picture(req.body)

    try {
        await picture.save()

        res.status(201).send(picture)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/pictures', async (req, res) => {
    try {
        const pictures = await Picture.find({})

        res.send(pictures)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/', async (req, res) => {
    res.redirect('pictures')
})
module.exports = router
