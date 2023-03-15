 <input type="file" onChange={handleFileUpload} />
function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const contents = event.target.result;
    console.log(contents);
  };
  reader.readAsText(file);
}