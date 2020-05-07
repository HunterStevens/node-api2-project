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
    db.findById(req.params.id)
    .then(article =>{
        if(article.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{res.status(200).json(article);}
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
})

router.get('/:id/comments', (req,res) =>{
    db.findPostComments(req.params.id)
    .then(article =>{
        if(article.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{res.status(200).json(article);}
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: "The comments information could not be retrieved." });
    })
})

router.post('/', (req,res) =>{
    if(req.body.title === null || req.body.title === "" || req.body.contents === null || req.body.contents ===""){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    else{
        db.insert(req.body)
        .then(newArticle =>{
            db.findById(newArticle.id)
    .then(article =>{
        if(article.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{res.status(200).json(article);}
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
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
    if(req.body.text === null || req.body.text === ""){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    else{
        db.findById(req.params.id)
        .then(article =>{
            if(article.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else{
                const commentText = req.body;
                commentText.post_id = req.params.id;
                    db.insertComment(commentText)
                    .then(article =>{
                        console.log(article);
                        db.findCommentById(article.id)
                        .then(article =>{
                            res.status(200).json(article)
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({ error: "The comments information could not be retrieved." });
                        })
                    })
                    .catch(err =>{
                        console.log("post request error: ", err);
                        res.status(500).json({ error: "The post information could not be retrieved." })
                
                    })
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({ error: "The post information could not be retrieved." });
            })

    }
})

router.delete('/:id', (req,res) =>{
    db.remove(req.params.id)
    .then(article =>{
        if(article === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{res.status(200).json(article);}
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message:'There was an error while saving the comment to the database'
        })
    })
})

router.put('/:id', (req,res) =>{
    if(req.body.title === null || req.body.title === "" || req.body.contents === null || req.body.contents ===""){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
    else{
        db.update(req.params.id, req.body)
        .then(article =>{
            if(article === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else{res.status(200).json(article);}
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message:'There was an error while saving the post to the database'
            })
        })
    }
})
module.exports = router;