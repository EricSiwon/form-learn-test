import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import virtualizedRenderer from "react-syntax-highlighter-virtualized-renderer";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import QRCode from "qrcode.react";

const downloadQR = () => {
  const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "123456.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default function DisplayCodePrism() {
  const codeString = "(num) => num + 1";

  return (
    <>
      <SyntaxHighlighter language="javascript" style={atomDark} showLineNumbers>
        {codeString}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language="jsx"
        style={atomDark}
        // showLineNumbers
        wrapLines={true}
        // renderer={virtualizedRenderer()}
      >
        {`
      <div>
        <MyCheckbox
          name="isAccepted"
          value={values.isAccepted}
          color="primary"
          label="Accepter Les Conditions Generales"
          labelPlacement="end"
        />
        {!values.isAccepted && touched.isAccepted ? (
          <span>Merci d'accepter Les Conditions Generales</span>
        ) : null}
      </div>
        `}
      </SyntaxHighlighter>
      {/* <Paper elevation={15}> */}
      <div>
        <QRCode
          id="123456"
          value="https://github.com/EricSiwon"
          size={290}
          //   renderAs="svg"
          level={"M"}
          includeMargin={true}
        />
        <a onClick={downloadQR}> Download QR </a>
      </div>
      {/* </Paper> */}
    </>
  );
}
