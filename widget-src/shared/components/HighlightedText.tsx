const { widget } = figma;
const { AutoLayout, Text } = widget;

import { tokenizeJson, JsonToken } from "../utils/jsonHighlighter";

type HighlightedTextProps = {
  content: string;
};

const FONT_SIZE = 12;
const FONT_FAMILY = "Fira Code";
const WIDTH = "fill-parent";

export function HighlightedText({ content }: HighlightedTextProps) {
  try {
    const tokens = tokenizeJson(content);

    if (tokens.length === 0) {
      return (
        <Text
          fontSize={FONT_SIZE}
          fill="#333333"
          fontFamily={FONT_FAMILY}
          width={WIDTH}
        >
          {content}
        </Text>
      );
    }

    return (
      <AutoLayout direction="vertical" spacing={0} width="fill-parent">
        {renderTokensAsLines(tokens)}
      </AutoLayout>
    );
  } catch (error) {
    console.error("Error in HighlightedText:", error);
    // Fallback to plain text on error
    return (
      <Text
        fontSize={FONT_SIZE}
        fill="#333333"
        fontFamily={FONT_FAMILY}
        width={WIDTH}
      >
        {content}
      </Text>
    );
  }
}

function renderTokensAsLines(tokens: JsonToken[]) {
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
          fontSize={FONT_SIZE}
          fill={token.color}
          fontFamily={FONT_FAMILY}
        >
          {token.value}
        </Text>
      ))}
    </AutoLayout>
  ));
}
