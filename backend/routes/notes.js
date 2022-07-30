const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');




// GET ALL NOTES
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
}
})

//add a new Note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })


    // update the note
    router.put('/updatenote/:id', fetchuser,async (req, res) => {
        const {title, description, tag} = req.body;

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note =await Note.findById(req.params.id)
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json({note})
        })


        // Delete Note
        router.delete('/deletenote/:id', fetchuser,async (req, res) => {
            try {
                // Find the note to be delete and delete it
                let note = await Note.findById(req.params.id);
                if (!note) { return res.status(404).send("Not Found") }
        
                // Allow deletion only if user owns this Note
                if (note.user.toString() !== req.user.id) {
                    return res.status(401).send("Not Allowed");
                }
        
                note = await Note.findByIdAndDelete(req.params.id)
                res.json({ "Success": "Note has been deleted", note: note });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
        })
        
module.exports = router