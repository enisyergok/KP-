document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form8D = document.getElementById('form8D');
    const problemBasligiInput = document.getElementById('txt8dProblemBasligi');

    // D0
    const d0BelirtilerInput = document.getElementById('txtD0Belirtiler');
    // D1
    const d1EkipLideriInput = document.getElementById('txtD1EkipLideri');
    const d1EkipUyeleriInput = document.getElementById('txtD1EkipUyeleri');
    // D2
    const d2ProblemTanimiInput = document.getElementById('txtD2ProblemTanimi');
    const d2KimInput = document.getElementById('txtD2Kim');
    const d2NeInput = document.getElementById('txtD2Ne');
    const d2NeredeInput = document.getElementById('txtD2Nerede');
    const d2NeZamanInput = document.getElementById('txtD2NeZaman');
    const d2NedenInput = document.getElementById('txtD2Neden');
    const d2NasilInput = document.getElementById('txtD2Nasil');
    const d2KacAdetInput = document.getElementById('txtD2KacAdet');
    // D3
    const d3GeciciOnlemlerInput = document.getElementById('txtD3GeciciOnlemler');
    const d3GeciciOnlemTarihInput = document.getElementById('dateD3GeciciOnlemTarih');
    // D4
    const d4KokNedenlerInput = document.getElementById('txtD4KokNedenler');
    const d4DogrulamaYontemiInput = document.getElementById('txtD4DogrulamaYontemi');
    // D5
    const d5SecilenPCAInput = document.getElementById('txtD5SecilenPCA');
    const d5PCADogrulamaPlaniInput = document.getElementById('txtD5PCADogrulamaPlani');
    // D6
    const d6UygulamaDetaylariInput = document.getElementById('txtD6UygulamaDetaylari');
    const d6UygulamaTarihInput = document.getElementById('dateD6UygulamaTarih');
    const d6PCAEtkinlikDogrulamaInput = document.getElementById('txtD6PCAEtkinlikDogrulama');
    // D7
    const d7SistemikOnlemlerInput = document.getElementById('txtD7SistemikOnlemler');
    // D8
    const d8TakdirNotlariInput = document.getElementById('txtD8TakdirNotlari');

    const kaydetButton = document.getElementById('btnKaydet8D');
    const temizleButton = document.getElementById('btnTemizleForm8D');
    const listelemeAlani = document.getElementById('8dListesiAlani');

    // Event Listeners
    kaydetButton.addEventListener('click', kaydet8D);
    temizleButton.addEventListener('click', formuTemizle8D);

    // Functions
    function formuTemizle8D() {
        form8D.reset();
        problemBasligiInput.focus();
    }

    function kaydet8D() {
        if (!form8D.checkValidity()) {
            form8D.reportValidity();
            return;
        }

        const report8D = {
            id: Date.now().toString(), // Basit bir ID
            problemBasligi: problemBasligiInput.value,
            d0Belirtiler: d0BelirtilerInput.value,
            d1EkipLideri: d1EkipLideriInput.value,
            d1EkipUyeleri: d1EkipUyeleriInput.value,
            d2ProblemTanimi: d2ProblemTanimiInput.value,
            d2Kim: d2KimInput.value,
            d2Ne: d2NeInput.value,
            d2Nerede: d2NeredeInput.value,
            d2NeZaman: d2NeZamanInput.value,
            d2Neden: d2NedenInput.value,
            d2Nasil: d2NasilInput.value,
            d2KacAdet: d2KacAdetInput.value,
            d3GeciciOnlemler: d3GeciciOnlemlerInput.value,
            d3GeciciOnlemTarih: d3GeciciOnlemTarihInput.value,
            d4KokNedenler: d4KokNedenlerInput.value,
            d4DogrulamaYontemi: d4DogrulamaYontemiInput.value,
            d5SecilenPCA: d5SecilenPCAInput.value,
            d5PCADogrulamaPlani: d5PCADogrulamaPlaniInput.value,
            d6UygulamaDetaylari: d6UygulamaDetaylariInput.value,
            d6UygulamaTarih: d6UygulamaTarihInput.value,
            d6PCAEtkinlikDogrulama: d6PCAEtkinlikDogrulamaInput.value,
            d7SistemikOnlemler: d7SistemikOnlemlerInput.value,
            d8TakdirNotlari: d8TakdirNotlariInput.value,
            kayitTarihi: new Date().toLocaleDateString()
        };

        let data8D = JSON.parse(localStorage.getItem('8dData')) || [];
        data8D.push(report8D);
        localStorage.setItem('8dData', JSON.stringify(data8D));

        formuTemizle8D();
        listele8Ds();
        alert('8D Raporu başarıyla kaydedildi!');
    }

    function listele8Ds() {
        listelemeAlani.innerHTML = ''; // Alanı temizle
        const data8D = JSON.parse(localStorage.getItem('8dData')) || [];

        if (data8D.length === 0) {
            listelemeAlani.innerHTML = '<p>Henüz kaydedilmiş 8D/DÖF raporu bulunmamaktadır.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'generic-table'; // Stil için class (style.css'e eklenebilir)
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Problem Başlığı</th>
                <th>Problem Tanımı (Kısa)</th>
                <th>Ekip Lideri</th>
                <th>Kayıt Tarihi</th>
                <th>İşlemler</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data8D.forEach((rapor, index) => {
            const tr = document.createElement('tr');
            const problemTanimiKisa = rapor.d2ProblemTanimi.length > 50 ? rapor.d2ProblemTanimi.substring(0, 50) + '...' : rapor.d2ProblemTanimi;
            tr.innerHTML = `
                <td>${rapor.problemBasligi}</td>
                <td>${problemTanimiKisa}</td>
                <td>${rapor.d1EkipLideri}</td>
                <td>${rapor.kayitTarihi || '-'}</td>
                <td>
                    <button class="btn-sil-8d" data-index="${index}">Sil</button>
                    <button class="btn-goruntule-8d" data-id="${rapor.id}">Görüntüle/Düzenle</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        listelemeAlani.appendChild(table);

        // Sil butonları için event listener'lar
        document.querySelectorAll('.btn-sil-8d').forEach(button => {
            button.addEventListener('click', function() {
                sil8D(this.dataset.index);
            });
        });

        // Görüntüle/Düzenle butonları için event listener'lar
        document.querySelectorAll('.btn-goruntule-8d').forEach(button => {
            button.addEventListener('click', function() {
                alert('Görüntüleme/Düzenleme fonksiyonu bu aşamada aktif değil. ID: ' + this.dataset.id);
                // goruntuleDuzenle8D(this.dataset.id); // Bu fonksiyon ileride tanımlanabilir
            });
        });
    }

    function sil8D(index) {
        if (confirm('Bu 8D raporunu silmek istediğinizden emin misiniz?')) {
            let data8D = JSON.parse(localStorage.getItem('8dData')) || [];
            data8D.splice(index, 1);
            localStorage.setItem('8dData', JSON.stringify(data8D));
            listele8Ds();
            alert('8D Raporu başarıyla silindi.');
        }
    }

    // function goruntuleDuzenle8D(id) {
    //     // Bu fonksiyon, seçilen 8D raporunu forma yüklemek veya
    //     // ayrı bir görüntüleme modalında göstermek için kullanılabilir.
    //     // Örnek:
    //     const data8D = JSON.parse(localStorage.getItem('8dData')) || [];
    //     const rapor = data8D.find(r => r.id === id);
    //     if (rapor) {
    //         // Form alanlarını doldur...
    //         problemBasligiInput.value = rapor.problemBasligi;
    //         d0BelirtilerInput.value = rapor.d0Belirtiler;
    //         // ... diğer tüm alanlar ...
    //         d8TakdirNotlariInput.value = rapor.d8TakdirNotlari;
    //         alert('Veriler forma yüklendi. Henüz güncelleme fonksiyonu aktif değil.');
    //     }
    // }

    // Initial load
    listele8Ds();
});

// Genel tablo stilleri için style.css'e eklenebilir:
/*
.generic-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.generic-table th, .generic-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.generic-table th {
    background-color: #f2f2f2;
    color: #333;
}

.generic-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.generic-table tr:hover {
    background-color: #e9e9e9;
}

.btn-sil-8d, .btn-goruntule-8d {
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
}
*/
