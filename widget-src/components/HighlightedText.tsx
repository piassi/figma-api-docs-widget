const { widget } = figma;
const { AutoLayout, Text } = widget;

import { tokenizeJson, JsonToken } from "../utils/jsonHighlighter";

type HighlightedTextProps = {
  content: string;
  fontSize?: number;
  fontFamily?: string;
  width?: "fill-parent" | number;
};

export function HighlightedText({
  content,
  fontSize = 12,
  fontFamily = "Monaco",
  width = "fill-parent",
}: HighlightedTextProps) {
  try {
    const tokens = tokenizeJson(content);

    if (tokens.length === 0) {
      // Fallback to plain text if no tokens
      return (
        <Text
          fontSize={fontSize}
          fill="#333333"
          fontFamily={fontFamily}
          width={width}
        >
          {content}
        </Text>
      );
    }

    return (
      <AutoLayout direction="vertical" spacing={0} width={width}>
        {renderTokensAsLines(tokens, fontSize, fontFamily)}
      </AutoLayout>
    );
  } catch (error) {
    console.error("Error in HighlightedText:", error);
    // Fallback to plain text on error
    return (
      <Text
        fontSize={fontSize}
        fill="#333333"
        fontFamily={fontFamily}
        width={width}
      >
        {content}
      </Text>
    );
  }
}

function renderTokensAsLines(
  tokens: JsonToken[],
  fontSize: number,
  fontFamily: string
) {
  const lines: JsonToken[][] = [];
  let currentLine: JsonToken[] = [];

  for (const token of tokens) {
    if (token.value.includes("\n")) {
      const parts = token.value.split("\n");
      for (let i = 0; i < parts.length; i++) {
        if (parts[i]) {
          currentLine.push({ ...token, value: parts[i] });
        }
        if (i < parts.length - 1) {
          lines.push(currentLine);
          currentLine = [];
        }
      }
    } else {
      currentLine.push(token);
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.map((lineTokens, lineIndex) => (
    <AutoLayout
      key={lineIndex}
      direction="horizontal"
      spacing={0}
      width="fill-parent"
    >
      {lineTokens.map((token, tokenIndex) => (
        <Text
          key={`${lineIndex}-${tokenIndex}`}
          fontSize={fontSize}
          fill={token.color}
          fontFamily={fontFamily}
        >
          {token.value}
        </Text>
      ))}
    </AutoLayout>
  ));
}
