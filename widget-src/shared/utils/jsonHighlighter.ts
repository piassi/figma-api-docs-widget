export type JsonToken = {
  type: 'string' | 'number' | 'boolean' | 'null' | 'key' | 'punctuation' | 'whitespace';
  value: string;
  color: string;
};

// Pre-defined color constants to avoid repeated object property access
const COLORS = {
  string: '#22863A',     // Green for strings
  number: '#005CC5',     // Blue for numbers
  boolean: '#D73A49',    // Red for booleans
  null: '#6F42C1',       // Purple for null
  key: '#E36209',        // Orange for object keys
  punctuation: '#24292E', // Dark gray for punctuation
  whitespace: '#24292E'   // Dark gray for whitespace
} as const;

// Fallback color in case of any issues
const DEFAULT_COLOR = '#333333';

// Helper function to ensure valid colors
const getValidColor = (colorKey: keyof typeof COLORS): string => {
  const color = COLORS[colorKey];
  // Basic validation - ensure it's a string and starts with #
  if (typeof color === 'string' && color.startsWith('#') && color.length === 7) {
    return color;
  }
  return DEFAULT_COLOR;
};

// Fast character type checking functions using character codes
const isWhitespace = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code === 32 || code === 9 || code === 10 || code === 13; // space, tab, newline, carriage return
};

const isDigit = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 48 && code <= 57; // '0' to '9'
};

const isLowercase = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 97 && code <= 122; // 'a' to 'z'
};

const isNumberChar = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) || // '0' to '9'
         code === 45 || code === 46 || // '-' or '.'
         code === 101 || code === 69 || // 'e' or 'E'
         code === 43; // '+'
};

export function tokenizeJson(jsonString: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  const len = jsonString.length;
  let i = 0;
  
  // Context tracking to optimize key detection
  const contextStack: ('object' | 'array')[] = [];
  let expectingKey = false;

  while (i < len) {
    const char = jsonString[i];
    
    // Handle whitespace using optimized character checking
    if (isWhitespace(char)) {
      const start = i;
      while (i < len && isWhitespace(jsonString[i])) {
        i++;
      }
      tokens.push({ 
        type: 'whitespace' as const, 
        value: jsonString.slice(start, i), 
        color: getValidColor('whitespace') 
      });
      continue;
    }
    
    // Handle strings (and object keys) with optimized parsing
    if (char === '"') {
      const start = i;
      i++; // Skip opening quote
      
      // Fast scan to find closing quote, handling escapes
      while (i < len && jsonString[i] !== '"') {
        if (jsonString[i] === '\\') {
          i += 2; // Skip escape sequence
        } else {
          i++;
        }
      }
      
      if (i < len) {
        i++; // Include closing quote
      }
      
      const str = jsonString.slice(start, i);
      
      // Improved key detection using context
      const inObject = contextStack.length > 0 && contextStack[contextStack.length - 1] === 'object';
      let isKey = false;
      
      if (inObject && expectingKey) {
        // Look ahead for colon after whitespace
        let j = i;
        while (j < len && isWhitespace(jsonString[j])) j++;
        if (j < len && jsonString[j] === ':') {
          isKey = true;
        }
      }
      
      tokens.push({
        type: isKey ? 'key' : 'string',
        value: str,
        color: isKey ? getValidColor('key') : getValidColor('string')
      });
      
      // Update expectation after processing a key
      if (isKey) {
        expectingKey = false;
      }
      
      continue;
    }
    
    // Handle numbers with optimized character checking
    if (isDigit(char) || char === '-') {
      const start = i;
      while (i < len && isNumberChar(jsonString[i])) {
        i++;
      }
      tokens.push({ 
        type: 'number', 
        value: jsonString.slice(start, i), 
        color: getValidColor('number') 
      });
      continue;
    }
    
    // Handle booleans and null with optimized parsing
    if (isLowercase(char)) {
      const start = i;
      while (i < len && isLowercase(jsonString[i])) {
        i++;
      }
      
      const word = jsonString.slice(start, i);
      
      if (word === 'true' || word === 'false') {
        tokens.push({ type: 'boolean', value: word, color: getValidColor('boolean') });
      } else if (word === 'null') {
        tokens.push({ type: 'null', value: word, color: getValidColor('null') });
      } else {
        tokens.push({ type: 'punctuation', value: word, color: getValidColor('punctuation') });
      }
      continue;
    }
    
    // Handle punctuation and update context
    if (char === '{') {
      contextStack.push('object');
      expectingKey = true;
    } else if (char === '}') {
      contextStack.pop();
      expectingKey = false;
    } else if (char === '[') {
      contextStack.push('array');
      expectingKey = false;
    } else if (char === ']') {
      contextStack.pop();
      expectingKey = false;
    } else if (char === ':') {
      expectingKey = false;
    } else if (char === ',') {
      // After a comma, we expect a key if we're in an object
      const inObject = contextStack.length > 0 && contextStack[contextStack.length - 1] === 'object';
      expectingKey = inObject;
    }
    
    tokens.push({ type: 'punctuation', value: char, color: getValidColor('punctuation') });
    i++;
  }
  
  return tokens;
} 