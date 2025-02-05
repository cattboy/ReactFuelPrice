export function downloadJSONFile(data, filename = 'fuelData.json') {
  // Convert the data to a JSON string with nice formatting.
  const jsonStr = JSON.stringify(data, null, 2);
  // Create a blob of the data
  const blob = new Blob([jsonStr], { type: 'application/json' });
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  // Append link to body, trigger click, then clean up.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
} 