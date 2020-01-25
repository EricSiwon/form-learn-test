import React, { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function DisplayCode() {
  const codeString = "(num) => num + 1";
  return (
    <SyntaxHighlighter language="javascript" style={docco} showLineNumbers>
      {codeString}
    </SyntaxHighlighter>
  );
}
