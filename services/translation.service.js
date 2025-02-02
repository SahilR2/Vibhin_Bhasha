// translation.service.js
import translateApi from 'translate-google-api';

class TranslationService {
  constructor() {
    this.translationCache = new Map();
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  
  getCacheKey(text, targetLang) {
    return `${text}_${targetLang}`;
  }

 
  async translateContent(text, targetLang, isRichText = false) {
    try {
      
      if (!text || typeof text !== 'string') {
        console.warn('Invalid text provided for translation:', text);
        return text;
      }

     
      const contentToTranslate = isRichText ? this.stripHtml(text) : text;

    
      const cacheKey = this.getCacheKey(contentToTranslate, targetLang);
      if (this.translationCache.has(cacheKey)) {
        return this.translationCache.get(cacheKey);
      }

     
      const result = await translateApi(contentToTranslate, {
        tld: "com",
        to: targetLang,
      });
      
      const translatedText = result[0];
      
      
      this.translationCache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error(`Translation error for language ${targetLang}:`, error);
      
      return text;
    }
  }


  async batchTranslate(texts, targetLang, isRichText = false) {
    const translations = await Promise.all(
      texts.map(text => this.translateContent(text, targetLang, isRichText))
    );
    return translations;
  }
}

export const translationService = new TranslationService();