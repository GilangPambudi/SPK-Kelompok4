document.addEventListener('DOMContentLoaded', function() {
    window.comparePhones = function() {
      var rows = document.getElementById("phoneTable").rows;
      var selectedPhones = [];
  
      for (var i = 1; i < rows.length; i++) {
        var phoneData = {
          'No': rows[i].cells[0].innerText,
          'Alternatif': rows[i].cells[1].innerText,
          'Memori': rows[i].cells[2].innerText,
          'Penyimpanan': rows[i].cells[3].innerText,
          'Kamera': rows[i].cells[4].innerText,
          'Baterai': rows[i].cells[5].innerText,
          'Harga': rows[i].cells[6].innerText,
          'Bobot': rows[i].cells[7].innerText,
          'Pengisian Daya': rows[i].cells[8].innerText
        };
  
        selectedPhones.push(phoneData);
      }
  
      // Mengurutkan array berdasarkan harga (asumsi harga sebagai angka, hilangkan tanda Rp dan koma)
      selectedPhones.sort(function(a, b) {
        return parseInt(b.Harga.replace(/[^0-9]/g, '')) - parseInt(a.Harga.replace(/[^0-9]/g, ''));
      });
  
      // Menambahkan kolom Ranking
      for (var i = 0; i < selectedPhones.length; i++) {
        selectedPhones[i].Ranking = i + 1;
      }
  
      // Membuat tabel hasil
      var resultTable = "<h3>Selected Phones (sorted by price):</h3><table class='table table-bordered'>";
      resultTable += "<tr><td>Ranking</td><td>No</td><td>Alternatif</td><td>Memori</td><td>Penyimpanan</td><td>Kamera</td><td>Baterai</td><td>Harga</td><td>Bobot</td><td>Pengisian Daya</td></tr>";
  
      selectedPhones.forEach(function(phone) {
        resultTable += "<tr>";
        resultTable += "<td>" + phone.Ranking + "</td>";
        resultTable += "<td>" + phone.No + "</td>";
        resultTable += "<td>" + phone['Alternatif'] + "</td>";
        resultTable += "<td>" + phone.Memori + "</td>";
        resultTable += "<td>" + phone.Penyimpanan + "</td>";
        resultTable += "<td>" + phone.Kamera + "</td>";
        resultTable += "<td>" + phone.Baterai + "</td>";
        resultTable += "<td>" + phone.Harga + "</td>";
        resultTable += "<td>" + phone.Bobot + "</td>";
        resultTable += "<td>" + phone['Pengisian Daya'] + "</td>";
        resultTable += "</tr>";
      });
  
      resultTable += "</table>";
  
      // Menampilkan tabel hasil di dalam elemen dengan id 'resultTable'
      document.getElementById('resultTable').innerHTML = resultTable;
    };
  });
  