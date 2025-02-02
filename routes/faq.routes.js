import express from 'express';
import { FAQ } from '../models/faq.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    const faqs = await FAQ.find();
    
    const transformedFaqs = faqs.map(faq => {
      if (lang === 'en') {
        return {
          id: faq._id,
          question: faq.question,
          answer: faq.answer
        };
      }
      
    });
    
    res.json(transformedFaqs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;