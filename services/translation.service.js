import translateApi from 'translate-google-api';
import { cacheService } from './cache.service.js';

class TranslationService {
 
  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  
  getCacheKey(text, targetLang) {
    const hash = Buffer.from(text).toString('base64');
    return `translation:${targetLang}:${hash}`;
  }

  
  async translateContent(text, targetLang, isRichText = false) {
    try {
      if (!text || typeof text !== 'string') {
        console.warn('Invalid text provided for translation:', text);
        return text;
      }

      const contentToTranslate = isRichText ? this.stripHtml(text) : text;

      const cacheKey = this.getCacheKey(contentToTranslate, targetLang);
      const cachedTranslation = await cacheService.get(cacheKey);
      
      if (cachedTranslation) {
        console.log(`Cache hit for ${targetLang} translation`);
        return cachedTranslation;
      }

      console.log(`Cache miss for ${targetLang} translation - calling API`);
      const result = await translateApi(contentToTranslate, {
        tld: "com",
        to: targetLang,
      });
      
      const translatedText = result[0];
      
      await cacheService.set(cacheKey, translatedText);
      
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

  
  async clearLanguageCache(lang) {
    try {
      const keys = await cacheService.redis.keys(`translation:${lang}:*`);
      if (keys.length > 0) {
        await cacheService.redis.del(keys);
      }
    } catch (error) {
      console.error(`Error clearing cache for language ${lang}:`, error);
    }
  }

  async clearAllCache() {
    await cacheService.clearAll();
  }
}

export const translationService = new TranslationService();