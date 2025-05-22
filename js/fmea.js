document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const fmeaForm = document.getElementById('fmeaForm');
    const projeAdiInput = document.getElementById('txtFmeaProjeAdi');
    const prosesAdimiInput = document.getElementById('txtFmeaProsesAdimi');
    const hataTuruInput = document.getElementById('txtFmeaHataTuru');
    const hataEtkisiInput = document.getElementById('txtFmeaHataEtkisi');
    const siddetInput = document.getElementById('numFmeaSiddet');
    const hataNedeniInput = document.getElementById('txtFmeaHataNedeni');
    const olasilikInput = document.getElementById('numFmeaOlasilik');
    const mevcutKontrollerInput = document.getElementById('txtFmeaMevcutKontroller');
    const tespitEdilebilirlikInput = document.getElementById('numFmeaTespitEdilebilirlik');
    const rpnLabel = document.getElementById('lblFmeaRpn');
    const onerilenFaaliyetInput = document.getElementById('txtFmeaOnerilenFaaliyet');
    const sorumluInput = document.getElementById('txtFmeaSorumlu');
    const terminTarihiInput = document.getElementById('dateFmeaTermin');

    const kaydetButton = document.getElementById('btnKaydetFMEA');
    const temizleButton = document.getElementById('btnTemizleForm');
    const fmeaListesiAlani = document.getElementById('fmeaListesiAlani');

    // Event Listeners
    siddetInput.addEventListener('input', hesaplaRPN);
    olasilikInput.addEventListener('input', hesaplaRPN);
    tespitEdilebilirlikInput.addEventListener('input', hesaplaRPN);
    kaydetButton.addEventListener('click', kaydetFMEA);
    temizleButton.addEventListener('click', formuTemizle);

    // Functions
    function hesaplaRPN() {
        const siddet = parseInt(siddetInput.value) || 0;
        const olasilik = parseInt(olasilikInput.value) || 0;
        const tespitEdilebilirlik = parseInt(tespitEdilebilirlikInput.value) || 0;

        if (siddet > 0 && olasilik > 0 && tespitEdilebilirlik > 0) {
            rpnLabel.textContent = siddet * olasilik * tespitEdilebilirlik;
        } else {
            rpnLabel.textContent = ""; // veya 0
        }
    }

    function formuTemizle() {
        fmeaForm.reset();
        rpnLabel.textContent = "";
        // Eğer ID'ler için özel bir temizleme gerekirse (örn. hidden input)
        // document.getElementById('fmeaId').value = ''; 
        projeAdiInput.focus();
    }

    function kaydetFMEA() {
        if (!fmeaForm.checkValidity()) {
            // HTML5 form validation
            fmeaForm.reportValidity();
            return;
        }

        const fmeaEntry = {
            id: Date.now().toString(), // Basit bir ID
            projeAdi: projeAdiInput.value,
            prosesAdimi: prosesAdimiInput.value,
            hataTuru: hataTuruInput.value,
            hataEtkisi: hataEtkisiInput.value,
            siddet: siddetInput.value,
            hataNedeni: hataNedeniInput.value,
            olasilik: olasilikInput.value,
            mevcutKontroller: mevcutKontrollerInput.value,
            tespitEdilebilirlik: tespitEdilebilirlikInput.value,
            rpn: rpnLabel.textContent || (parseInt(siddetInput.value) * parseInt(olasilikInput.value) * parseInt(tespitEdilebilirlikInput.value)) || 0,
            onerilenFaaliyet: onerilenFaaliyetInput.value,
            sorumlu: sorumluInput.value,
            terminTarihi: terminTarihiInput.value,
            durum: "Açık" // Ekstra bir durum alanı eklenebilir
        };

        let fmeaData = JSON.parse(localStorage.getItem('fmeaData')) || [];
        fmeaData.push(fmeaEntry);
        localStorage.setItem('fmeaData', JSON.stringify(fmeaData));

        formuTemizle();
        listeleFMEAs();
        alert('FMEA başarıyla kaydedildi!');
    }

    function listeleFMEAs() {
        fmeaListesiAlani.innerHTML = ''; // Alanı temizle
        const fmeaData = JSON.parse(localStorage.getItem('fmeaData')) || [];

        if (fmeaData.length === 0) {
            fmeaListesiAlani.innerHTML = '<p>Henüz kaydedilmiş FMEA bulunmamaktadır.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'fmea-table'; // Stil için class
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Proje Adı</th>
                <th>Proses Adımı</th>
                <th>Hata Türü</th>
                <th>RPN</th>
                <th>Sorumlu</th>
                <th>Termin Tarihi</th>
                <th>İşlemler</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        fmeaData.forEach((fmea, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${fmea.projeAdi}</td>
                <td>${fmea.prosesAdimi}</td>
                <td>${fmea.hataTuru}</td>
                <td>${fmea.rpn}</td>
                <td>${fmea.sorumlu || '-'}</td>
                <td>${fmea.terminTarihi || '-'}</td>
                <td>
                    <button class="btn-sil" data-index="${index}">Sil</button>
                    <button class="btn-duzenle" data-id="${fmea.id}">Düzenle</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        fmeaListesiAlani.appendChild(table);

        // Sil butonları için event listener'lar
        document.querySelectorAll('.btn-sil').forEach(button => {
            button.addEventListener('click', function() {
                silFMEA(this.dataset.index);
            });
        });

        // Düzenle butonları için event listener'lar (fonksiyonellik sonra eklenecek)
        document.querySelectorAll('.btn-duzenle').forEach(button => {
            button.addEventListener('click', function() {
                // console.log("Düzenle ID: ", this.dataset.id);
                alert('Düzenleme fonksiyonu henüz tamamlanmadı.');
                // duzenleFMEA(this.dataset.id); // Bu fonksiyonu daha sonra tanımlayabilirsiniz.
            });
        });
    }

    function silFMEA(index) {
        if (confirm('Bu FMEA kaydını silmek istediğinizden emin misiniz?')) {
            let fmeaData = JSON.parse(localStorage.getItem('fmeaData')) || [];
            fmeaData.splice(index, 1);
            localStorage.setItem('fmeaData', JSON.stringify(fmeaData));
            listeleFMEAs();
            alert('FMEA başarıyla silindi.');
        }
    }
    
    // function duzenleFMEA(id) {
    //     let fmeaData = JSON.parse(localStorage.getItem('fmeaData')) || [];
    //     const fmeaToEdit = fmeaData.find(fmea => fmea.id === id);
    //     if (fmeaToEdit) {
    //         projeAdiInput.value = fmeaToEdit.projeAdi;
    //         prosesAdimiInput.value = fmeaToEdit.prosesAdimi;
    //         hataTuruInput.value = fmeaToEdit.hataTuru;
    //         hataEtkisiInput.value = fmeaToEdit.hataEtkisi;
    //         siddetInput.value = fmeaToEdit.siddet;
    //         hataNedeniInput.value = fmeaToEdit.hataNedeni;
    //         olasilikInput.value = fmeaToEdit.olasilik;
    //         mevcutKontrollerInput.value = fmeaToEdit.mevcutKontroller;
    //         tespitEdilebilirlikInput.value = fmeaToEdit.tespitEdilebilirlik;
    //         onerilenFaaliyetInput.value = fmeaToEdit.onerilenFaaliyet;
    //         sorumluInput.value = fmeaToEdit.sorumlu;
    //         terminTarihiInput.value = fmeaToEdit.terminTarihi;
    //         hesaplaRPN(); // RPN'i güncelle
    //         // Kayıt işlemi için ID'yi saklayabilir veya silip yeniden ekleyebilirsiniz.
    //         // Bu örnekte basitlik için silme ve yeniden ekleme gösterilmiyor.
    //         // Genellikle bir "Güncelle" butonu ve ayrı bir mantık olur.
    //         alert("Veriler forma yüklendi. Değişiklikleri yapıp 'FMEA Kaydet' ile güncelleyebilirsiniz.");
    //     }
    // }

    // Initial load
    listeleFMEAs();
    hesaplaRPN(); // Sayfa yüklendiğinde RPN'i bir kez hesapla (eğer formda değerler varsa)
});
