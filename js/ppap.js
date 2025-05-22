document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const formPPAP = document.getElementById('formPPAP');
    const parcaNoInput = document.getElementById('txtPpapParcaNo');
    const parcaAdiInput = document.getElementById('txtPpapParcaAdi');
    const musteriInput = document.getElementById('txtPpapMusteri');
    const tedarikciInput = document.getElementById('txtPpapTedarikci');
    const sunumTarihiInput = document.getElementById('datePpapSunumTarihi');
    const sunumSeviyesiSelect = document.getElementById('selPpapSunumSeviyesi');
    const ppapElementleriListesiDiv = document.getElementById('ppapElementleriListesi');
    
    const btnYeniPpapElementiEkle = document.getElementById('btnYeniPpapElementiEkle');
    const btnKaydetPPAP = document.getElementById('btnKaydetPPAP');
    const btnTemizleFormPPAP = document.getElementById('btnTemizleFormPPAP');
    const ppapListesiAlaniDiv = document.getElementById('ppapListesiAlani');

    // Event Listeners
    btnYeniPpapElementiEkle.addEventListener('click', yeniPpapElementiEkle);
    btnKaydetPPAP.addEventListener('click', kaydetPPAP);
    btnTemizleFormPPAP.addEventListener('click', formuTemizlePPAP);

    // Default PPAP Element Names
    const defaultElementNames = [
        "Tasarım Kayıtları (Teknik Resim vb.)",
        "Mühendislik Değişiklik Dokümanları",
        "Müşteri Mühendislik Onayı",
        "Dizayn FMEA (DFMEA)",
        "Proses Akış Şemaları",
        "Proses FMEA (PFMEA)",
        "Kontrol Planı",
        "Ölçüm Sistemleri Analizi Çalışmaları (MSA)",
        "Boyutsal Sonuçlar",
        "Malzeme ve Performans Test Sonuçları Kayıtları",
        "Başlangıç Proses Çalışmaları",
        "Görünüm Onay Raporu (AAR)",
        "Numune Ürünler",
        "Usta Numune",
        "Kontrol Yardımcıları",
        "Müşteriye Özel Gereklilikler",
        "Parça Sunum Garantisi (PSW)"
    ];

    // Functions
    function yeniPpapElementiEkle(elementAdi = "", referansNo = "", durum = "") {
        const elementId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const elementDiv = document.createElement('div');
        elementDiv.className = 'ppap-element-satiri';
        elementDiv.setAttribute('data-id', elementId);

        // Element Adı (Dropdown)
        const selectElementAdi = document.createElement('select');
        selectElementAdi.className = 'ppapElementAdi';
        selectElementAdi.innerHTML = `<option value="">Element Seçiniz...</option>`;
        defaultElementNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (name === elementAdi) {
                option.selected = true;
            }
            selectElementAdi.appendChild(option);
        });
        // Allow custom entry
        const customOption = document.createElement('option');
        customOption.value = "Diger";
        customOption.textContent = "Diğer (Elle Girin)";
        selectElementAdi.appendChild(customOption);
        
        const inputElementAdiCustom = document.createElement('input');
        inputElementAdiCustom.type = 'text';
        inputElementAdiCustom.className = 'ppapElementAdiCustom';
        inputElementAdiCustom.placeholder = 'Diğer Element Adı';
        inputElementAdiCustom.style.display = (elementAdi && !defaultElementNames.includes(elementAdi) && elementAdi !== "Diger") ? 'inline-block' : 'none';
        if (elementAdi && !defaultElementNames.includes(elementAdi) && elementAdi !== "Diger") {
           inputElementAdiCustom.value = elementAdi;
           const opt = Array.from(selectElementAdi.options).find(o => o.value === "Diger");
           if(opt) opt.selected = true;
        }


        selectElementAdi.addEventListener('change', (e) => {
            if (e.target.value === "Diger") {
                inputElementAdiCustom.style.display = 'inline-block';
                inputElementAdiCustom.focus();
            } else {
                inputElementAdiCustom.style.display = 'none';
                inputElementAdiCustom.value = '';
            }
        });


        // Referans No
        const inputReferans = document.createElement('input');
        inputReferans.type = 'text';
        inputReferans.className = 'ppapElementReferans';
        inputReferans.placeholder = 'Referans No/Link';
        inputReferans.value = referansNo;

        // Durum
        const selectDurum = document.createElement('select');
        selectDurum.className = 'ppapElementDurum';
        ['Sunuldu', 'Onaylandı', 'Reddedildi', 'Geçerli Değil', 'Beklemede'].forEach(d => {
            const option = document.createElement('option');
            option.value = d;
            option.textContent = d;
            if (d === durum) {
                option.selected = true;
            }
            selectDurum.appendChild(option);
        });
        if (!durum && selectDurum.options.length > 0) selectDurum.value = "Beklemede";


        // Sil Butonu
        const btnSilElement = document.createElement('button');
        btnSilElement.type = 'button';
        btnSilElement.textContent = 'Elementi Sil';
        btnSilElement.className = 'btn-sil-element';
        btnSilElement.onclick = () => {
            elementDiv.remove();
        };

        elementDiv.appendChild(document.createTextNode("Element: "));
        elementDiv.appendChild(selectElementAdi);
        elementDiv.appendChild(inputElementAdiCustom);
        elementDiv.appendChild(document.createTextNode(" Ref: "));
        elementDiv.appendChild(inputReferans);
        elementDiv.appendChild(document.createTextNode(" Durum: "));
        elementDiv.appendChild(selectDurum);
        elementDiv.appendChild(btnSilElement);

        ppapElementleriListesiDiv.appendChild(elementDiv);
    }

    function formuTemizlePPAP() {
        formPPAP.reset();
        ppapElementleriListesiDiv.innerHTML = ''; // Tüm dinamik elementleri kaldır
        yeniPpapElementiEkle(); // Başlangıç için bir boş element ekle
        parcaNoInput.focus();
    }

    function kaydetPPAP() {
        if (!formPPAP.checkValidity()) {
            formPPAP.reportValidity();
            return;
        }

        const elementSatirlari = ppapElementleriListesiDiv.querySelectorAll('.ppap-element-satiri');
        const ppapElementleri = [];
        elementSatirlari.forEach(satir => {
            const selectAdi = satir.querySelector('.ppapElementAdi');
            const inputAdiCustom = satir.querySelector('.ppapElementAdiCustom');
            let elementAdi = selectAdi.value;
            if (elementAdi === "Diger") {
                elementAdi = inputAdiCustom.value.trim();
            }

            const referans = satir.querySelector('.ppapElementReferans').value;
            const durum = satir.querySelector('.ppapElementDurum').value;

            if (elementAdi) { // Sadece adı olan elementleri kaydet
                ppapElementleri.push({
                    ad: elementAdi,
                    referans: referans,
                    durum: durum
                });
            }
        });

        const ppapPackage = {
            id: Date.now().toString(),
            parcaNo: parcaNoInput.value,
            parcaAdi: parcaAdiInput.value,
            musteri: musteriInput.value,
            tedarikci: tedarikciInput.value,
            sunumTarihi: sunumTarihiInput.value,
            sunumSeviyesi: sunumSeviyesiSelect.value,
            elementler: ppapElementleri,
            kayitTarihi: new Date().toLocaleDateString()
        };

        let ppapData = JSON.parse(localStorage.getItem('ppapData')) || [];
        ppapData.push(ppapPackage);
        localStorage.setItem('ppapData', JSON.stringify(ppapData));

        formuTemizlePPAP();
        listelePPAPs();
        alert('PPAP Paketi başarıyla kaydedildi!');
    }

    function listelePPAPs() {
        ppapListesiAlaniDiv.innerHTML = '';
        const ppapData = JSON.parse(localStorage.getItem('ppapData')) || [];

        if (ppapData.length === 0) {
            ppapListesiAlaniDiv.innerHTML = '<p>Henüz kaydedilmiş PPAP paketi bulunmamaktadır.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'generic-table ppap-table'; // Stil için class
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Parça No</th>
                <th>Parça Adı</th>
                <th>Müşteri</th>
                <th>Sunum Tarihi</th>
                <th>Seviye</th>
                <th>Element Sayısı</th>
                <th>İşlemler</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        ppapData.forEach((ppap, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${ppap.parcaNo}</td>
                <td>${ppap.parcaAdi}</td>
                <td>${ppap.musteri}</td>
                <td>${ppap.sunumTarihi}</td>
                <td>${ppap.sunumSeviyesi}</td>
                <td>${ppap.elementler ? ppap.elementler.length : 0}</td>
                <td>
                    <button class="btn-sil-ppap" data-index="${index}">Sil</button>
                    <button class="btn-goruntule-ppap" data-id="${ppap.id}">Görüntüle/Düzenle</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        ppapListesiAlaniDiv.appendChild(table);

        document.querySelectorAll('.btn-sil-ppap').forEach(button => {
            button.addEventListener('click', function() {
                silPPAP(this.dataset.index);
            });
        });

        document.querySelectorAll('.btn-goruntule-ppap').forEach(button => {
            button.addEventListener('click', function() {
                goruntuleDuzenlePPAP(this.dataset.id);
            });
        });
    }

    function silPPAP(index) {
        if (confirm('Bu PPAP paketini silmek istediğinizden emin misiniz?')) {
            let ppapData = JSON.parse(localStorage.getItem('ppapData')) || [];
            ppapData.splice(index, 1);
            localStorage.setItem('ppapData', JSON.stringify(ppapData));
            listelePPAPs();
            alert('PPAP Paketi başarıyla silindi.');
        }
    }

    function goruntuleDuzenlePPAP(id) {
        const ppapData = JSON.parse(localStorage.getItem('ppapData')) || [];
        const ppap = ppapData.find(p => p.id === id);

        if (ppap) {
            parcaNoInput.value = ppap.parcaNo;
            parcaAdiInput.value = ppap.parcaAdi;
            musteriInput.value = ppap.musteri;
            tedarikciInput.value = ppap.tedarikci;
            sunumTarihiInput.value = ppap.sunumTarihi;
            sunumSeviyesiSelect.value = ppap.sunumSeviyesi;

            ppapElementleriListesiDiv.innerHTML = ''; // Mevcut elementleri temizle
            if (ppap.elementler && ppap.elementler.length > 0) {
                ppap.elementler.forEach(el => {
                    yeniPpapElementiEkle(el.ad, el.referans, el.durum);
                });
            } else {
                yeniPpapElementiEkle(); // Eğer hiç element yoksa boş bir tane ekle
            }
            
            // Kaydet butonu yerine "Güncelle" butonu göstermek ve ID'yi saklamak daha iyi bir UX olurdu.
            // Bu örnekte, mevcut kaydı silip yenisini ekleyerek "güncelleme" yapılabilir.
            // Daha gelişmiş bir çözüm için, bir 'editingId' state'i tutulabilir.
            alert('PPAP verileri forma yüklendi. Değişiklik yapıp "PPAP Kaydet" ile üzerine yazabilirsiniz (mevcut ID ile yeni kayıt oluşturulur, eskisi silinmez). Gerçek bir güncelleme için ek mantık gerekir.');
        }
    }

    // Initial load
    listelePPAPs();
    yeniPpapElementiEkle(); // Sayfa ilk yüklendiğinde bir boş element satırı ekle
});

// PPAP Element satırları ve tablo için style.css'e eklenebilir:
/*
.ppap-element-satiri {
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
}
.ppap-element-satiri select, .ppap-element-satiri input[type="text"] {
    margin-right: 10px;
    padding: 5px;
}
.btn-sil-element {
    padding: 5px 8px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    cursor: pointer;
}

.ppap-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.ppap-table th, .ppap-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.ppap-table th {
    background-color: #f0f0f0;
    color: #333;
}
*/
