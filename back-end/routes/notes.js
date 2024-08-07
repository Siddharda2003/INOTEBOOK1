const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middlewares/fetchuser')
const {body,validationResult} = require('express-validator');

//Route1:Get all notes using :/route/notes/fetchAllNotes.Login required
router.get('/fetchNotes',fetchuser,async (req,res)=>{
    try{
        const notes = await Notes.find({user:req.user.id})
        res.json({notes})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})
//Route2:Add a note using :POST /route/notes/addNote.Login required
router.post('/addNotes',[
    body('title',"Title must be atleast 3 letters").isLength({min:3}),
    body('description',"Description must be atleast 5 characters").isLength({min:5}),
],fetchuser,async (req,res)=>{
    try{
        //if there are errors return the bad request and the errors
        const {title,description,tag} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const notes = new Notes({
            title,
            description,
            tag,
            user:req.user.id
        })
        const savedNotes = await notes.save()
        res.json({savedNotes})
        
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})

//Route3:upate a note using put :/route/notes/updateNote/:id.Login required
router.put('/updateNote/:id',fetchuser,async (req,res) => {
    try{
        const {title,description,tag} = req.body 
        const newnote = {}
        if(title){
            newnote.title = title
        }
        if(description) {
            newnote.description = description
        }
        if(tag){
            newnote.tag = tag
        }
        let note =await Notes.findById(req.params.id)
        if(!note){
           return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id){
           return res.status(404).send("Unauthorized access");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})

//Route4:delete a note using delte :/route/notes/deleteNote/:id.Login required
router.delete('/deleteNote/:id',fetchuser,async (req,res) => {
    //find the note to be delete by id, if not found returning not found
    try{
        let note =await Notes.findById(req.params.id)
        if(!note){
          return res.status(404).send("Not Found")
        }
        //checking the note found belong to the authorized user
        if(note.user.toString() !== req.user.id){
           return res.status(404).send("Unauthorized access");
        }
        await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been successfully deleted"})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some unkown error occured!!")
    }
})
module.exports =  router
