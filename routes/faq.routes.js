import express from 'express';
import { FAQ } from '../models/faq.model.js';
import { translationService } from '../services/translation.service.js';

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
        
        const translation = faq.translations?.[lang] || {
          question: faq.question,
          answer: faq.answer
        };
        
        return {
          id: faq._id,
          question: translation.question,
          answer: translation.answer
        };
      });
      
      res.json(transformedFaqs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;