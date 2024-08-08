export const handleExport = (data) => {
  // Convert array of objects to CSV string
  const headers = Object.keys(data[0]).join(","); // Get the headers from the first object
  const rows = data.map((row) => Object.values(row).join(",")).join("\n"); // Convert each object to a CSV row
  const csvData = `${headers}\n${rows}`; // Combine headers and rows

  // Create a Blob from the CSV string
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element and trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv"; // Specify the file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the object URL after the download
  URL.revokeObjectURL(url);
};
