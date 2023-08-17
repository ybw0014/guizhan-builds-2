export function useNewWinDownload(url: URL, filename?: string) {
  const aLink = document.createElement("a");
  aLink.href = url.toString();
  aLink.target = "_blank";
  aLink.rel = "noopener noreferrer";
  if (filename) {
    aLink.setAttribute("download", filename);
  }
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}
