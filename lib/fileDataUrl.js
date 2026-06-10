export async function fileToDataUrl(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  const mimeType = file.type || "application/octet-stream";
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
}
