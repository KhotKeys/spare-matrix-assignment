const fs = require('fs');
const path = require('path'); 
const quickSort = require('./class');
function readFileAndProcess(Location_of_the_folder) {
  const Array_Size = 2047;
  const New_Unique_array = new Array(Array_Size).fill(false);
  const File_Handeler = fs.createReadStream(Location_of_the_folder, { encoding: 'utf8' });
  let Lines_From_File = '';

  console.time('Time taken');
  File_Handeler.on('data', (New_data_from_file_handel) => {
    Lines_From_File += New_data_from_file_handel;
    const lines = Lines_From_File.split('\n');
    Lines_From_File = lines.pop();

    lines.forEach((line) => {
      if (!/\S/.test(line)) return;
      if (/\s/.test(line.trim()) || /[^\d\s-]/.test(line.trim())) return;

      const num = parseInt(line.trim(), 10);
      if (!isNaN(num) && num >= -1023 && num <= 1023) {
        New_Unique_array[num + 1023] = true;
      }
    });
  });
  File_Handeler.on('end', () => {
    const result = [];
    for (let i = 0; i < Array_Size; i++) {
      if (New_Unique_array[i]) {
        result.push(i - 1023);
      }
    }

    const sortedResult = quickSort(result);
    console.timeEnd('Time taken');
    console.log(JSON.stringify(sortedResult));
    console.log("\nTotal", sortedResult.length);
});
  File_Handeler.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}

module.exports = readFileAndProcess;
