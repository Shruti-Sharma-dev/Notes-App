import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/middleware.js';
const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        const note = new Note({ title, description, userId: req.user.id });

        await note.save();

        return res.status(201).json({ success: true, message: 'Note added successfully' });
    } catch (error) {
       
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        // console.log(req.user);
        console.log("User verified:", req.user); // Add this
        const notes = await Note.find({userId:req.user.id});
        res.status(200).json({ success: true, notes });
    } catch (error) {
       
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});



router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      // Check if the note belongs to the user
      const note = await Note.findOneAndUpdate(
        { _id: id, userId: req.user.id }, // only update if it belongs to the user
        { title, description },
        { new: true }
      );
  
      if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found or unauthorized' });
      }
  
      res.status(200).json({ success: true, note });
    } catch (error) {
      console.error('❌ Update Note Error:', error);
      res.status(500).json({ success: false, message: 'Cannot update note' });
    }
  });

  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
  
      const note = await Note.findOneAndDelete({
        _id: id,
        userId: req.user.id // ✅ ensure only user's own note can be deleted
      });
  
      if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found or unauthorized' });
      }
  
      res.status(200).json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
      console.error('❌ Delete Note Error:', error);
      res.status(500).json({ success: false, message: 'Cannot delete note' });
    }
  });
  


export default router;