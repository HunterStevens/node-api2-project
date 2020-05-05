const express = require('express');
const db = require('./data/db');

const router = express.Router();

router.get('/', (req,res) =>{
    db.find(req.query)
    .then(article =>{
        res.status(200).json(article);
    })
    .catch(err =>{
        console.log(err);
        res.json(500).json({message:"The posts info could not be retrieved."});
    })
})

router.get('/:id', (req,res) =>{
    
})

router.get('/:id/comments', (req,res) =>{

    
})

router.post('/', (req,res) =>{
    if(req.body.title === null || req.body.title === "" || req.body.contents === null || req.body.contents ===""){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    else{
        db.insert(req.body)
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message:'There was an error while saving the post to the database'
            })
        })
    }
})

router.post('/:id/comments', (req,res) =>{
    
})

router.delete('/:id', (req,res) =>{
    
})

router.put('/:id', (req,res) =>{
    
})
module.exports = router;