const { widget } = figma;
const { AutoLayout, Text } = widget;

interface HighlightedTextProps {
  code: string;
  maxLines?: number; // Maximum number of lines to show before clamping
}

// Simple memoization cache
const cache = new Map<string, string>();

function HighlightedText({ code, maxLines = 15 }: HighlightedTextProps) {
  const formatJSON = (jsonString: string): string => {
    // Check cache first
    const cacheKey = `format_${jsonString.length}_${jsonString.slice(0, 100)}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      cache.set(cacheKey, formatted);
      return formatted;
    } catch (error) {
      console.warn("Failed to parse JSON:", error);
      cache.set(cacheKey, jsonString);
      return jsonString;
    }
  };

  const renderHighlightedCode = () => {
    try {
      // Format JSON (cached)
      const formattedCode = formatJSON(code);

      // Split into lines
      const allLines = formattedCode.split("\n");
      const totalLines = allLines.length;
      const isClamped = totalLines > maxLines;
      const linesToShow = isClamped ? allLines.slice(0, maxLines) : allLines;
      const additionalLines = isClamped ? totalLines - maxLines : 0;

      // Chunk lines together to reduce component count
      const LINES_PER_CHUNK = 30;
      const chunks: string[] = [];

      for (let i = 0; i < linesToShow.length; i += LINES_PER_CHUNK) {
        const chunkLines = linesToShow.slice(i, i + LINES_PER_CHUNK);

        // Add line numbers and combine into single string
        const numberedLines = chunkLines.map((line, idx) => {
          const lineNum = ("   " + (i + idx + 1).toString()).slice(-3);
          return `${lineNum}  ${line}`;
        });

        chunks.push(numberedLines.join("\n"));
      }

      // Create one Text component per chunk
      const chunkComponents = chunks.map((chunkContent, chunkIndex) => (
        <Text
          key={chunkIndex}
          fontSize={11}
          fontFamily="Fira Code"
          fill="#333"
          width="fill-parent"
        >
          {chunkContent}
        </Text>
      ));

      // Add truncation indicator if content is clamped
      if (isClamped && additionalLines > 0) {
        chunkComponents.push(
          <Text
            key="truncated"
            fontSize={11}
            fontFamily="Fira Code"
            fill="#666"
            width="fill-parent"
          >
            {`...${additionalLines} additional lines`}
          </Text>
        );
      }

      return (
        <AutoLayout
          direction="vertical"
          spacing={4}
          width="fill-parent"
          padding={{ horizontal: 8, vertical: 8 }}
        >
          {chunkComponents}
        </AutoLayout>
      );
    } catch (error) {
      console.error("Error rendering JSON:", error);
      return (
        <AutoLayout
          direction="vertical"
          width="fill-parent"
          padding={{ horizontal: 8, vertical: 8 }}
        >
          <Text fontSize={11} fill="#333" fontFamily="Fira Code">
            {code.slice(0, 1000)}
            {code.length > 1000 ? "..." : ""}
          </Text>
        </AutoLayout>
      );
    }
  };

  return renderHighlightedCode();
}

export { HighlightedText };
