function oyunuBaslat(secim) {
    //kullanıcının seçimini değişkene aktardık
    let kullaniciSecimi = secim.id;
    console.log(kullaniciSecimi);

    //pc tarafından oluşturulan rastgele seçimi değişkene aktardık.
    let rastgeleSayi = Math.floor(Math.random() * 3);
    let bilgisayarSecimi = ["tas", "kagit", "makas"][rastgeleSayi];
    console.log(bilgisayarSecimi);

    //puanlamaları dizi şeklinde değişkene aktardık.
    let oyunPuanlamaları = {
        "tas": { "makas": 1, "tas": 0.5, "kagit": 0 },
        "kagit": { "tas": 1, "kagit": 0.5, "makas": 0 },
        "makas": { "kagit": 1, "makas": 0.5, "tas": 0 }
    };

    //diziden seçimimize karşılık gelen paunı aldık.
    let kullaniciPuani = oyunPuanlamaları[kullaniciSecimi][bilgisayarSecimi];
    console.log(kullaniciPuani);

    //kayıtlı tüm resimlerin kaynak adreslerini aldık.
    let kayitliResimler = {
        "tas": document.getElementById("tas").src,
        "kagit": document.getElementById("kagit").src,
        "makas": document.getElementById("makas").src,
    };

    //temiz bir sonuç ekranı için tüm resimleri sildik
    document.getElementById("tas").remove();
    document.getElementById("kagit").remove();
    document.getElementById("makas").remove();

    //sildiğimiz nesnelerin yerine sonuçlar için yeni nesneler oluşturduk
    let kullaniciResmi = document.createElement("img");
    let bilgisayarResmi = document.createElement("img");
    let sonucMesaji = document.createElement("div");

    //Resim nesnelerine seçimlere göre uygun kaynakları bağlayalım
    kullaniciResmi.src = kayitliResimler[kullaniciSecimi];
    bilgisayarResmi.src = kayitliResimler[bilgisayarSecimi];

    //Oluşturduğumuz nesneleri kapsayıcısı altına alalım
    document.getElementById("container").appendChild(kullaniciResmi);
    document.getElementById("container").appendChild(sonucMesaji);
    document.getElementById("container").appendChild(bilgisayarResmi);

    //puana bakarak şart kontrolüyle sonucu yazdırıyoruz
    if (kullaniciPuani === 0) {
        sonucMesaji.innerHTML = "Maalesef kaybettiniz :(";
        sonucMesaji.style.color = "red";
        sonucMesaji.style.fontSize="3rem"
    }
    else if (kullaniciPuani === 0.5) {
        sonucMesaji.innerHTML = "Sonuç berabere";
        sonucMesaji.style.color = "blue";
        sonucMesaji.style.fontSize="3rem"
    }
    else {
        sonucMesaji.innerHTML = "Tebrikler kazandınız :)";
        sonucMesaji.style.color = "green";
        sonucMesaji.style.fontSize="3rem"
    }
}