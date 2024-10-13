import * as fs from 'fs';
import * as path from 'path';

export const generateOtp = (): string => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return random.toString();
}

export const getTemplateContent = (templateName: string): string => {
    try {
      
      const baseDir = process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '..', 'templates')
        : path.join(__dirname, '..', 'src', 'templates');
      
      const templatePath = path.join(baseDir, `${templateName}`);
  
      // Đọc nội dung tệp
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      
      return templateContent;
    } catch (error) {
      console.error('Error reading template file:', error);
      throw new Error('Template not found');
    }
  }

export const replaceContent = (content: string, params: Record<string, any>): string => {
    if (!content) {
      return content;
    }
  
    for (const [key, value] of Object.entries(params)) {
      content = content.replace(new RegExp(`##${key}##`, 'g'), value.toString());
    }
  
    return content;
  }
  