export type JsonToken = {
  type: 'string' | 'number' | 'boolean' | 'null' | 'key' | 'punctuation' | 'whitespace';
  value: string;
  color: string;
};

export function tokenizeJson(jsonString: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  let i = 0;
  
  const colors = {
    string: '#22863A',     // Green for strings
    number: '#005CC5',     // Blue for numbers
    boolean: '#D73A49',    // Red for booleans
    null: '#6F42C1',       // Purple for null
    key: '#E36209',        // Orange for object keys
    punctuation: '#24292E', // Dark gray for punctuation
    whitespace: '#24292E'   // Dark gray for whitespace
  };

  while (i < jsonString.length) {
    const char = jsonString[i];
    
    // Handle whitespace
    if (/\s/.test(char)) {
      let whitespace = '';
      while (i < jsonString.length && /\s/.test(jsonString[i])) {
        whitespace += jsonString[i];
        i++;
      }
      tokens.push({ type: 'whitespace', value: whitespace, color: colors.whitespace });
      continue;
    }
    
    // Handle strings (and object keys)
    if (char === '"') {
      let str = '"';
      i++; // Skip opening quote
      
      while (i < jsonString.length && jsonString[i] !== '"') {
        if (jsonString[i] === '\\') {
          str += jsonString[i] + (jsonString[i + 1] || '');
          i += 2;
        } else {
          str += jsonString[i];
          i++;
        }
      }
      
      if (i < jsonString.length) {
        str += '"'; // Add closing quote
        i++;
      }
      
      // Check if this is a key (followed by colon after whitespace)
      let isKey = false;
      let j = i;
      while (j < jsonString.length && /\s/.test(jsonString[j])) j++;
      if (j < jsonString.length && jsonString[j] === ':') {
        isKey = true;
      }
      
      tokens.push({
        type: isKey ? 'key' : 'string',
        value: str,
        color: isKey ? colors.key : colors.string
      });
      continue;
    }
    
    // Handle numbers
    if (/[-\d]/.test(char)) {
      let num = '';
      while (i < jsonString.length && /[-\d.eE+]/.test(jsonString[i])) {
        num += jsonString[i];
        i++;
      }
      tokens.push({ type: 'number', value: num, color: colors.number });
      continue;
    }
    
    // Handle booleans and null
    if (/[a-z]/.test(char)) {
      let word = '';
      while (i < jsonString.length && /[a-z]/.test(jsonString[i])) {
        word += jsonString[i];
        i++;
      }
      
      if (word === 'true' || word === 'false') {
        tokens.push({ type: 'boolean', value: word, color: colors.boolean });
      } else if (word === 'null') {
        tokens.push({ type: 'null', value: word, color: colors.null });
      } else {
        tokens.push({ type: 'punctuation', value: word, color: colors.punctuation });
      }
      continue;
    }
    
    // Handle punctuation
    tokens.push({ type: 'punctuation', value: char, color: colors.punctuation });
    i++;
  }
  
  return tokens;
} 