import express from 'express';
import { bookModel } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async(req, res) => {
    try{
        if (!req.body.title || !req.body.author || !req.body.publishyear) {
            return res.status(400).send({
                message: "fill all required fields: title, author, publishyear"
            })
        }

        const book = await bookModel.create({
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear
        })

        return res.status(201).send(book);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

router.get('/', async(req, res) => {
    try{
        const books = await bookModel.find({});
        res.send({
            count: books.length,
            data: books
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.get('/:id', async(req, res) => {
    try{
        const book = await bookModel.findById(req.params.id);
        res.send(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.put('/:id', async(req, res) => {
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
        return res.status(400).send({
            message: "fill all required fields: title, author, publishyear"
        })
    }

    try{
        const result = await bookModel.findByIdAndUpdate(req.params.id, req.body);

        if (!result) {
            return res.status(404).json({message: "Book not found"});
        }
        else
            return res.status(200).send({message: "Book updated successfully"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await bookModel.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({message: "Book not found"});
        }
        else
            return res.status(200).send({message: "Book deleted successfully"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

export default router;