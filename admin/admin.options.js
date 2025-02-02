import { AdminJS } from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { FAQ } from '../models/faq.model.js';

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
        
            return response;
          }
        }
      }
    }
  }]
};