import express from 'express';
import { 
 getPostings,
 getPostingsById,
 savePostings,
 updatePostings,
 deletePostings
 } from '../Controllers/Posting.Controller';

const router = express.Router();

router.get('/postings', getPostings);
router.get('/postings/:id', getPostingsById);
router.post('/postings', savePostings);
router.patch('/postings/:id', updatePostings);
router.delete('/postings/:id', deletePostings);

export default router;