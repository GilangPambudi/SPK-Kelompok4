// Data alternatif pada kolom paling kiri yang akan ditampilkan di tabel
var alternativeNames = ["A1 Adidas Galaxy 4 #149", "A2 Adidas - Senseboost Go Man #279", "A3 New Balance - Coast V5 #98", "A4 Diadora - Savino #38", "A5 Diadora - Chop #289", "A6 Vans-Ua Comfycush Sk8-Hi Black #232", "A7 Vans - Ua Comfycush Slip=On #167", "A8 Nike - Cortez Basic Shoes #170", "A9 Nike - Zoom Domination TR 2 #239", "A10 Nike - Zoom Domination TR 2 #239", "A11 Converse - Chuck Taylor 70's Ox #54", "A12 Hush Puppies - Campo Slip On #251", "A13 Hush Puppies - Diana Wedges", "A14 Hush Puppies - Uro Traveler Slip #63", "A15 Airwalk - Lamar #128", "A16 Skechers - Sp Ultra Flex 2.0 #196", "A17 Puma - Sportstyle Prime Trim Dix #270", "A18 Superga - 2288 Fabricflowerw #200", "A19 Onitsuka Tiger - Tiger Ally #269", "A20 Onitsuka Tiger - GSM #210"];

var dataMatrix = [
  // Alternatif A1 hingga A20 dengan kriteria C1 hingga C7
  [50, 10, 50, 40, 40, 20, 30],
  [10, 40, 50, 30, 40, 10, 30],
  [30, 30, 50, 50, 40, 20, 30],
  [50, 40, 50, 50, 30, 10, 30],
  [50, 50, 50, 30, 30, 10, 20],
  [20, 40, 20, 60, 50, 20, 30],
  [30, 40, 40, 60, 50, 20, 30],
  [20, 20, 50, 20, 50, 10, 20],
  [20, 40, 20, 40, 30, 20, 20],
  [40, 30, 20, 60, 50, 20, 30],
  [30, 30, 30, 60, 50, 20, 30],
  [50, 40, 40, 70, 50, 20, 30],
  [50, 30, 10, 20, 10, 10, 10],
  [20, 40, 40, 20, 10, 10, 20],
  [50, 30, 30, 70, 50, 20, 30],
  [30, 40, 50, 30, 30, 10, 20],
  [20, 40, 50, 10, 20, 10, 30],
  [30, 40, 40, 70, 50, 10, 10],
  [10, 40, 50, 20, 20, 10, 20],
  [20, 30, 30, 20, 50, 10, 30]
];

// Fungsi untuk mendapatkan data hanya angkanya
function getDataFromMatrix() {
  return dataMatrix;
}

// Panggil fungsi untuk menampilkan data
window.onload = displayDataInTable;

// Array weights untuk setiap kriteria
var weights = [0.2, 0.1, 0.2, 0.1, 0.2, 0.1, 0.1];

function displayDataInTable() {
  var table = document.getElementById('dummy');

  // Iterate melalui data dan menambahkan baris ke dalam tabel
  for (var i = 0; i < alternativeNames.length; i++) {
      var row = table.insertRow(-1);

      // Menambahkan nama alternatif pada kolom pertama
      var cell = row.insertCell(0);
      cell.innerHTML = alternativeNames[i];

      // Menambahkan nilai numerik pada kolom-kolom berikutnya
      for (var j = 0; j < dataMatrix[i].length; j++) {
          cell = row.insertCell(j + 1);
          cell.innerHTML = dataMatrix[i][j];
      }
  }
}

//Fungsi untuk pembagi
function calculateDivisors(matrix) {
  var divisors = [];

  // Iterate melalui setiap kolom
  for (var j = 0; j < matrix[0].length; j++) {
    var sumOfSquares = 0;

    // Hitung jumlah kuadrat nilai dalam kolom
    for (var i = 0; i < matrix.length; i++) {
      sumOfSquares += Math.pow(matrix[i][j], 2);
    }

    // Akar kuadrat dari jumlah kuadrat
    var divisor = Math.sqrt(sumOfSquares);
    
    // Simpan pembagi untuk kolom saat ini
    divisors.push(divisor);
  }

  return divisors;
}

//Fungsi untuk matriks ternormalisasi
var divisors = calculateDivisors(dataMatrix);

function normalizeMatrix(matrix, divisors) {
  var normalizedMatrix = [];

  // Iterate melalui setiap baris
  for (var i = 0; i < matrix.length; i++) {
    var normalizedRow = [];

    // Iterate melalui setiap kolom
    for (var j = 0; j < matrix[i].length; j++) {
      // Bagi nilai dalam matriks dengan pembagi yang sesuai
      var normalizedValue = (matrix[i][j] / divisors[j]).toFixed(3);
      normalizedRow.push(normalizedValue);
    }

    // Tambahkan baris yang sudah dinormalisasi ke matriks hasil
    normalizedMatrix.push(normalizedRow);
  }

  return normalizedMatrix;
}

var divisors = calculateDivisors(dataMatrix);
var normalizedMatrix = normalizeMatrix(dataMatrix, divisors)

//Test matriks ternormalisasi
console.log("Matriks ternormalisasi", normalizedMatrix);


// Fungsi untuk membuat matriks ternormalisasi terweights (Y)
function calculateWeightedNormalizedMatrix(normalizedMatrix, weights) {
  var weightedMatrix = [];

  // Iterasi melalui baris matriks ternormalisasi
  for (var i = 0; i < normalizedMatrix.length; i++) {
    var weightedRow = [];

    // Iterasi melalui kolom matriks ternormalisasi
    for (var j = 0; j < normalizedMatrix[i].length; j++) {
      // Mengalikan nilai matriks ternormalisasi dengan weightsnya
      var weightedValue = (normalizedMatrix[i][j] * weights[j]).toFixed(3);
      weightedRow.push(weightedValue);
    }

    weightedMatrix.push(weightedRow);
  }

  return weightedMatrix;
}

var weightedMatrix = calculateWeightedNormalizedMatrix(normalizedMatrix, weights);

//Test matriks ternormalisasi terbobot
console.log("Weighted Normalized Matrix (Y):", weightedMatrix);

var benefitCriteria = ['cost', 'benefit', 'benefit', 'benefit', 'benefit', 'cost', 'benefit'];

// Fungsi untuk menentukan solusi ideal positif (A+)
function calculatePositiveIdealSolution(weightedMatrix, benefitCriteria) {
  var positiveIdealSolution = [];

  // Iterasi melalui kolom matriks ternormalisasi terbobot
  for (var j = 0; j < weightedMatrix[0].length; j++) {
    var extremum = benefitCriteria[j] === 'benefit' ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

    // Iterasi melalui baris matriks ternormalisasi terbobot
    for (var i = 0; i < weightedMatrix.length; i++) {
      if (benefitCriteria[j] === 'benefit') {
        // Jika kriteria adalah benefit, cari nilai maksimum
        extremum = Math.max(extremum, weightedMatrix[i][j]);
      } else {
        // Jika kriteria adalah cost, cari nilai minimum
        extremum = Math.min(extremum, weightedMatrix[i][j]);
      }
    }

    positiveIdealSolution.push(extremum);
  }

  return positiveIdealSolution;
}

// Fungsi untuk menentukan solusi ideal negatif (A-)
function calculateNegativeIdealSolution(weightedMatrix, benefitCriteria) {
  var negativeIdealSolution = [];

  // Iterasi melalui kolom matriks ternormalisasi terbobot
  for (var j = 0; j < weightedMatrix[0].length; j++) {
    var extremum = benefitCriteria[j] === 'cost' ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

    // Iterasi melalui baris matriks ternormalisasi terbobot
    for (var i = 0; i < weightedMatrix.length; i++) {
      if (benefitCriteria[j] === 'cost') {
        // Jika kriteria adalah cost, cari nilai maksimum
        extremum = Math.max(extremum, weightedMatrix[i][j]);
      } else {
        // Jika kriteria adalah benefit, cari nilai minimum
        extremum = Math.min(extremum, weightedMatrix[i][j]);
      }
    }

    negativeIdealSolution.push(extremum);
  }

  return negativeIdealSolution;
}

// Contoh penggunaan fungsi
var positiveIdealSolution = calculatePositiveIdealSolution(weightedMatrix, benefitCriteria);
var negativeIdealSolution = calculateNegativeIdealSolution(weightedMatrix, benefitCriteria);

//Test solusi ideal 
console.log("Positive Ideal Solution (A+):", positiveIdealSolution);
console.log("Negative Ideal Solution (A-):", negativeIdealSolution);

// Fungsi untuk menghitung jarak terhadap solusi ideal positif (D+) dan negatif (D-)
function calculateDistances(weightedMatrix, positiveIdealSolution, negativeIdealSolution) {
  var distances = {
    positive: [],
    negative: []
  };

  // Iterasi melalui baris matriks ternormalisasi terbobot
  for (var i = 0; i < weightedMatrix.length; i++) {
    var distancePositive = 0;
    var distanceNegative = 0;

    // Iterasi melalui kolom matriks ternormalisasi terbobot
    for (var j = 0; j < weightedMatrix[i].length; j++) {
      distancePositive += Math.pow(weightedMatrix[i][j] - positiveIdealSolution[j], 2);
      distanceNegative += Math.pow(weightedMatrix[i][j] - negativeIdealSolution[j], 2);
    }

    // Akar kuadrat dari jumlah seluruh kuadrat
    distancePositive = Math.sqrt(distancePositive);
    distanceNegative = Math.sqrt(distanceNegative);

    distances.positive.push(distancePositive.toFixed(3)); // Bulatkan ke 3 angka di belakang koma
    distances.negative.push(distanceNegative.toFixed(3)); // Bulatkan ke 3 angka di belakang koma
  }

  return distances;
}

var allDistances = calculateDistances(weightedMatrix, positiveIdealSolution, negativeIdealSolution);

// Test jarak terhadap solusi ideal
console.log("Positive Ideal Distances (D+):", allDistances.positive);
console.log("Negative Ideal Distances (D-):", allDistances.negative);

function calculatePreferences(distances) {
  var preferences = [];

  // Iterasi melalui array jarak
  for (var i = 0; i < distances.positive.length; i++) {
    var denominator = parseFloat(distances.positive[i]) + parseFloat(distances.negative[i]);

    // Pengecekan agar tidak terjadi pembagian oleh nol
    var preference = 0;
    if (denominator !== 0) {
      preference = parseFloat(distances.negative[i]) / denominator;
    }

    preferences.push({
      code: alternativeNames[i],
      alternative: "A" + (i + 1),
      preference: preference.toFixed(3)
    });
  }

  return preferences;
}

// Hitung jarak terhadap solusi ideal positif (D+) dan negatif (D-)
var allDistances = calculateDistances(weightedMatrix, positiveIdealSolution, negativeIdealSolution);

// Hitung nilai preferensi
var preferences = calculatePreferences(allDistances);

// Tampilkan hasil nilai preferensi ke konsol
console.log("Preferences:", preferences);

function calculatePreferencesAndRank(distances) {
  var preferences = [];

  // Iterasi melalui array jarak
  for (var i = 0; i < distances.positive.length; i++) {
    var denominator = parseFloat(distances.positive[i]) + parseFloat(distances.negative[i]);

    // Pengecekan agar tidak terjadi pembagian oleh nol
    var preference = 0;
    if (denominator !== 0) {
      preference = parseFloat(distances.negative[i]) / denominator;
    }

    preferences.push({
      code: "A" + (i + 1),
      alternative: alternativeNames[i],
      preference: preference.toFixed(3)
    });
  }

  // Urutkan preferences berdasarkan nilai preferensi dari yang tertinggi ke terendah
  preferences.sort((a, b) => b.preference - a.preference);

  // Tambahkan rank ke dalam objek preferences
  preferences.forEach((preference, index) => {
    preference.rank = index + 1;
  });

  return preferences;
}

// Fungsi untuk menampilkan hasil ke dalam tabel HTML
function displayResults() {
  var preferencesAndRank = calculatePreferencesAndRank(allDistances);

  var resultTable = document.getElementById('resultTable');
  resultTable.innerHTML = ''; // Menghapus konten sebelumnya

  // Membuat tabel hasil
  var table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  // Menambahkan judul tabel
  var caption = document.createElement('caption');
  caption.textContent = 'Hasil Perbandingan';
  table.appendChild(caption);

  // Menambahkan header tabel
  var headerRow = table.insertRow();
  headerRow.appendChild(document.createElement('th')).textContent = 'Kode';
  headerRow.appendChild(document.createElement('th')).textContent = 'Alternatif';
  headerRow.appendChild(document.createElement('th')).textContent = 'Nilai Preferensi';
  headerRow.appendChild(document.createElement('th')).textContent = 'Rank';

  // Menambahkan data tabel
  preferencesAndRank.forEach((preference) => {
    var row = table.insertRow();
    row.insertCell(0).textContent = preference.code;
    row.insertCell(1).textContent = preference.alternative;
    row.insertCell(2).textContent = preference.preference;
    row.insertCell(3).textContent = preference.rank;
  });

  // Menampilkan tabel ke dalam elemen resultTable
  resultTable.appendChild(table);
}