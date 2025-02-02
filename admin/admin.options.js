import { AdminJS } from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { FAQ } from '../models/faq.model.js';
import { translationService } from '../services/translation.service.js';

AdminJS.registerAdapter(AdminJSMongoose);

export const adminOptions = {
  resources: [{
    resource: FAQ,
    options: {
      properties: {
        answer: {
          type: 'richtext',
          custom: {
            ckeditor: true
          }
        }
      },
      actions: {
        new: {
          after: async (response) => {
            const { record } = response;
            
            try {
              if (!record.errors || Object.keys(record.errors).length === 0) {
                const supportedLanguages = ['hi', 'bn'];
                const translations = {};

                for (const lang of supportedLanguages) {
                  
                  const [translatedQuestion, translatedAnswer] = await translationService.batchTranslate(
                    [record.params.question, record.params.answer],
                    lang,
                    [false, true] 
                  );

                  translations[lang] = {
                    question: translatedQuestion,
                    answer: translatedAnswer 
                  };
                }

               
                await FAQ.findByIdAndUpdate(record.params._id, {
                  $set: { translations }
                });
              }
            } catch (error) {
              console.error('Error in translation process:', error);
              
            }
            
            return response;
          }
        }
      }
    }
  }]
};