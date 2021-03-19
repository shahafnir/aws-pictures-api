const express = require('express')
const Picture = require('../models/picture')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()

const upload = multer({
    limits: {
        fileSize: 3000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(
                new Error('Only jpg, jpeg and png files are allowed')
            )
        }

        callback(undefined, true)
    },
})

router.post('/pictures', upload.single('file'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer)
            .resize({ width: 200, height: 360 })
            .png()
            .toBuffer()

        const picture = new Picture({
            description: req.body.description,
            data: buffer,
        })

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

router.delete('/pictures/:id', async (req, res) => {
    pictureId = req.params.id

    try {
        const picture = await Picture.findByIdAndDelete(pictureId)

        if (!picture) {
            return res.status(404).send()
        }

        res.send(picture)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router
