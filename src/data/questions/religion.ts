// src/data/religion.ts
import { Question } from "@/types";

export const religionQuestions: Question[] = [
  // Mevcut Sorular (Konu başlıkları subjects.ts ile eşleştirildi)
  {
    id: 'og_din_1', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy', // Eşleştirildi
    question: 'Allah’ın her şeyi bir ölçü ve düzene göre yaratmasına ne denir?',
    options: ['Kaza', 'Kader', 'Ecel', 'Tevekkül'], correctAnswer: 1,
    explanation: 'Kader, Allah\'ın evrende olacak her şeyi önceden bilmesi ve takdir etmesidir.'
  },
  {
    id: 'og_din_2', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium', // Eşleştirildi
    question: 'Aşağıdakilerden hangisine zekat verilmez?',
    options: ['Fakir komşuya', 'İhtiyaç sahibi öğrenciye', 'Anne, baba ve çocuklara', 'Borçlulara'], correctAnswer: 2,
    explanation: 'İslam dinine göre zekat, usul ve füru\'a (anne, baba, dede, nine, çocuk, torun gibi yakın akrabalara) verilmez.'
  },
  {
    id: 'og_din_3', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium', // Eşleştirildi
    question: 'Peygamberlerin Allah’tan aldıkları mesajları insanlara eksizsiz olarak bildirmelerine ne ad verilir?',
    options: ['Sıdk (Doğruluk)', 'Emanet (Güvenilirlik)', 'Fetanet (Akıllı olmak)', 'Tebliğ (Bildirme)'], correctAnswer: 3,
    explanation: 'Peygamberlerin ilahi mesajları insanlara ulaştırma görevi Tebliğ olarak adlandırılır.'
  },
  {
    id: 'og_din_4', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (İslamın Şartları -> Dini Hayat)
    question: 'Aşağıdakilerden hangisi İslam\'ın şartlarından biri değildir?',
    options: ['Şehadet getirmek', 'Namaz kılmak', 'Oruç tutmak', 'Kitaplara inanmak'], correctAnswer: 3,
    explanation: 'Kitaplara inanmak, İslam\'ın değil, İmanın şartlarındandır.'
  },
  {
    id: 'og_din_5', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium', // Eşleştirildi
    question: 'Kur\'an-ı Kerim\'in indiriliş süresi yaklaşık kaç yıldır?',
    options: ['10 yıl', '23 yıl', '40 yıl', '12 yıl'], correctAnswer: 1,
    explanation: 'Kur\'an-ı Kerim, Hz. Muhammed\'e peygamberliğinin başladığı 610 yılından vefat ettiği 632 yılına kadar yaklaşık 23 yılda indirilmiştir.'
  },
  {
    id: 'og_din_6', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy', // Eşleştirildi (Tevhid -> Kader İnancı ile ilgili)
    question: '“Allah’ın varlığı ve birliği, eşi ve benzeri olmaması” inancı aşağıdakilerden hangisiyle ilgilidir?',
    options: ['Tevhid', 'Nübüvvet', 'Ahiret', 'İhsan'],
    correctAnswer: 0,
    explanation: 'Tevhid, Allah\'ın tek ve eşsiz olduğu inancıdır.'
  },
  {
    id: 'og_din_7', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (İslamın Şartları -> Dini Hayat)
    question: 'İslam’ın şartlarından biri aşağıdakilerden hangisidir?',
    options: ['İman', 'Namaz', 'İhsan', 'Sabır'],
    correctAnswer: 1,
    explanation: 'Namaz, İslam\'ın beş temel şartından biridir.'
  },
  {
    id: 'og_din_8', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Hac -> Dini Hayat)
    question: 'Hac ibadeti hangi ayda yapılır?',
    options: ['Recep', 'Ramazan', 'Şaban', 'Zilhicce'],
    correctAnswer: 3,
    explanation: 'Hac ibadeti, Hicri takvimin son ayı olan Zilhicce ayında yapılır.'
  },
  {
    id: 'og_din_9', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (Ahlak -> Dini Hayat)
    question: '“İnsanların doğuştan sahip oldukları haklar” aşağıdaki kavramlardan hangisini ifade eder?',
    options: ['Kul hakkı', 'Doğal hak', 'Adalet', 'Merhamet'],
    correctAnswer: 1,
    explanation: 'Doğal haklar, insanların doğuştan kazandığı, kimseye ait olmayan haklardır.'
  },
  {
    id: 'og_din_10', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (Helal/Haram -> Dini Hayat)
    question: 'İslam’a göre aşağıdakilerden hangisi helaldir?',
    options: ['Faiz', 'Kumar', 'Zekât', 'İçki'],
    correctAnswer: 2,
    explanation: 'Zekât, İslam\'da ibadet olarak kabul edilen ve helal olan bir davranıştır.'
  },
  {
    id: 'og_din_11', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'easy', // Eşleştirildi
    question: 'Kur’an-ı Kerim’in ilk suresi aşağıdakilerden hangisidir?',
    options: ['Fatiha', 'Bakara', 'İhlas', 'Nas'],
    correctAnswer: 0,
    explanation: 'Kur’an-ı Kerim, Fatiha suresi ile başlar.'
  },
  {
    id: 'og_din_12', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi (Peygamberlik -> Genel)
    question: 'Peygamberlerin gönderiliş amacı aşağıdakilerden hangisidir?',
    options: ['İnsanların zenginleşmesini sağlamak', 'İnsanlara doğru yolu göstermek', 'Dünyada rahat yaşamayı öğretmek', 'İnsanların ömürlerini uzatmak'],
    correctAnswer: 1,
    explanation: 'Peygamberler, insanlara Allah\'ın emir ve yasaklarını bildirerek doğru yolu göstermek için gönderilmiştir.'
  },
  {
    id: 'og_din_13', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi
    question: 'Hz. Muhammed’in çocukluk yıllarındaki dürüstlüğü nedeniyle kendisine verilen unvan hangisidir?',
    options: ['El-Emîn', 'El-Fetih', 'El-Hakîm', 'El-Müctehid'],
    correctAnswer: 0,
    explanation: 'Hz. Muhammed, dürüstlüğünden dolayı "El-Emîn" (Güvenilir) unvanını almıştır.'
  },
  {
    id: 'og_din_14', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Günahlar -> Dini Hayat)
    question: 'İslam’a göre aşağıdakilerden hangisi “büyük günah” kabul edilir?',
    options: ['Namaz kılmak', 'Oruç tutmak', 'Yalan söylemek', 'Hırsızlık yapmak'],
    correctAnswer: 3,
    explanation: 'Hırsızlık yapmak, İslam\'da büyük günahlardan biri olarak kabul edilir.'
  },
  {
    id: 'og_din_15', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Laiklik -> Dini Hayat)
    question: '“Din ve vicdan özgürlüğü” ile en çok ilişkili ilke hangisidir?',
    options: ['Laiklik', 'Milliyetçilik', 'Devletçilik', 'Halkçılık'],
    correctAnswer: 0,
    explanation: 'Laiklik, devletin din ve vicdan işlerinde tarafsız olması ilkesidir.'
  },
  {
    id: 'og_din_16', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Ahlak -> Dini Hayat)
    question: '“İyiliği emretmek, kötülükten sakındırmak” ifadesi hangi kavramla açıklanır?',
    options: ['Takva', 'Tevazu', 'Emr-i bi’l-maruf', 'İhsan'],
    correctAnswer: 2,
    explanation: 'Emr-i bi’l-maruf, iyiliği emretmek, kötülükten sakındırmak anlamına gelir.'
  },
  {
    id: 'og_din_17', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'easy', // Eşleştirildi
    question: 'Zekât kimlere verilemez?',
    options: ['Fakirlere', 'Borçlulara', 'Yolculara', 'Zenginlere'],
    correctAnswer: 3,
    explanation: 'Zekat, ihtiyaç sahibi olanlara verilir, zenginlere verilmez.'
  },
  {
    id: 'og_din_18', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'easy', // Eşleştirildi
    question: 'İslam’a göre ilk emir aşağıdakilerden hangisidir?',
    options: ['Oku', 'Koru', 'Dinle', 'Çalış'],
    correctAnswer: 0,
    explanation: 'Kur’an-ı Kerim\'in ilk ayetinde Hz. Muhammed\'e "Oku" emri gelmiştir.'
  },
  {
    id: 'og_din_19', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi
    question: 'Peygamberimizin doğduğu şehir aşağıdakilerden hangisidir?',
    options: ['Medine', 'Mekke', 'Kudüs', 'Taif'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed 571 yılında Mekke\'de doğmuştur.'
  },
  {
    id: 'og_din_20', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (İbadetler -> Dini Hayat)
    question: 'Kurban ibadeti hangi dini bayramda yapılır?',
    options: ['Ramazan Bayramı', 'Kurban Bayramı', 'Mevlid Kandili', 'Berat Kandili'],
    correctAnswer: 1,
    explanation: 'Kurban ibadeti, Kurban Bayramı\'nda yapılır.'
  },
  {
    id: 'og_din_21', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Ahlak -> Dini Hayat)
    question: 'Aşağıdaki kavramlardan hangisi “Allah’a karşı sorumluluk bilinciyle yaşamak” demektir?',
    options: ['İhsan', 'Takva', 'İhlas', 'Tevekkül'],
    correctAnswer: 1,
    explanation: 'Takva, Allah\'ın emir ve yasaklarına karşı sorumlu davranma bilincidir.'
  },
  {
    id: 'og_din_22', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium', // Eşleştirildi (Kaynaklar)
    question: '“İslam dininin temel kaynakları” arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Kur’an', 'Sünnet', 'Hadis', 'Anayasa'],
    correctAnswer: 3,
    explanation: 'Anayasa, İslam dininin temel kaynaklarından biri değildir.'
  },
  {
    id: 'og_din_23', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi
    question: 'Hz. Muhammed’in doğum günü hangi gece kutlanır?',
    options: ['Miraç Kandili', 'Mevlid Kandili', 'Berat Kandili', 'Kadir Gecesi'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed\'in doğum günü Mevlid Kandili olarak kutlanır.'
  },
  {
    id: 'og_din_24', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (Ahlak -> Dini Hayat)
    question: 'Aşağıdaki davranışlardan hangisi “kul hakkına girmek”tir?',
    options: ['Oruç tutmak', 'Başkasının malını izinsiz almak', 'Sadaka vermek', 'Selamlaşmak'],
    correctAnswer: 1,
    explanation: 'Başkasının malını izinsiz almak, kul hakkına girmektir.'
  },
  {
    id: 'og_din_25', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy', // Eşleştirildi (Ahiret -> Kader İnancı ile ilişkili)
    question: '“İnsanların iyi veya kötü amellerinin karşılığını göreceği hayat” hangi kavramla ifade edilir?',
    options: ['Dünya', 'Ahiret', 'Fıtrat', 'Nübüvvet'],
    correctAnswer: 1,
    explanation: 'Ahiret, bu dünya hayatından sonra başlayacak ve amellerin karşılığının görüleceği ebedi hayattır.'
  },
  {
    id: 'og_din_26', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (Helal/Haram -> Dini Hayat)
    question: 'İslam’a göre aşağıdakilerden hangisi haram değildir?',
    options: ['Faiz', 'Kumar', 'Çalışmak', 'İçki'],
    correctAnswer: 2,
    explanation: 'Çalışmak, İslam\'da teşvik edilen bir davranıştır, haram değildir.'
  },
  {
    id: 'og_din_27', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium', // Eşleştirildi
    question: 'Kur’an-ı Kerim aşağıdaki hangi halife döneminde çoğaltılmıştır?',
    options: ['Hz. Ebubekir', 'Hz. Ömer', 'Hz. Osman', 'Hz. Ali'],
    correctAnswer: 2,
    explanation: 'Kur\'an, Hz. Osman döneminde farklı lehçelerde okunmasını önlemek amacıyla çoğaltılmıştır.'
  },
  {
    id: 'og_din_28', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium', // Eşleştirildi (Peygamberlik -> Genel)
    question: '“Allah’ın peygamberler aracılığıyla insanlara gönderdiği buyruklar” ne olarak adlandırılır?',
    options: ['Sünnet', 'Vahiy', 'Hadis', 'Kıyas'],
    correctAnswer: 1,
    explanation: 'Vahiy, Allah\'ın, peygamberleri aracılığıyla insanlara gönderdiği ilahi mesajlardır.'
  },
  {
    id: 'og_din_29', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy', // Eşleştirildi (Ahlak -> Dini Hayat)
    question: 'İslam’a göre “sabır” aşağıdakilerden hangisini ifade eder?',
    options: ['Şikâyet etmek', 'Zorluklara dayanmak', 'Haksızlık yapmak', 'Umutsuz olmak'],
    correctAnswer: 1,
    explanation: 'Sabır, karşılaşılan zorluklara ve sıkıntılara dayanmak anlamına gelir.'
  },
  {
    id: 'og_din_30', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi (Tarih -> Hz. Muhammed)
    question: 'Hz. Muhammed’in Medine’ye hicretiyle birlikte kurulan ilk İslam devleti aşağıdakilerden hangisidir?',
    options: ['Emeviler', 'Abbâsiler', 'Medine İslam Devleti', 'Osmanlılar'],
    correctAnswer: 2,
    explanation: 'Hz. Muhammed\'in hicretinden sonra Medine\'de kurulan devletin adı, Medine İslam Devleti\'dir.'
  },
  {
    id: 'og_din_31', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'easy', // Eşleştirildi (Kadir Gecesi -> Kuran)
    question: 'Kadir Gecesi hangi ayın içinde yer alır?',
    options: ['Şaban', 'Recep', 'Ramazan', 'Muharrem'],
    correctAnswer: 2,
    explanation: 'Kadir Gecesi, Ramazan ayı içinde yer alan mübarek bir gecedir.'
  },
  {
    id: 'og_din_32', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'medium', // Eşleştirildi (Şirk -> İnanç)
    question: 'İslam’a göre en büyük günah aşağıdakilerden hangisidir?',
    options: ['Yalan söylemek', 'Şirk koşmak', 'Hırsızlık yapmak', 'Gıybet etmek'],
    correctAnswer: 1,
    explanation: 'Allah\'a ortak koşmak (şirk), İslam\'da en büyük günah kabul edilir.'
  },
  {
    id: 'og_din_33', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy', // Eşleştirildi (Tevekkül -> Kader)
    question: '“Allah’a güvenip gerekli tedbirleri almak” anlamına gelen kavram aşağıdakilerden hangisidir?',
    options: ['Tevekkül', 'Tevazu', 'Takva', 'İhlas'],
    correctAnswer: 0,
    explanation: 'Tevekkül, bir iş için gerekli tüm çabayı gösterdikten sonra sonucunu Allah\'a bırakmaktır.'
  },
  {
    id: 'og_din_34', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium', // Eşleştirildi (Kul Hakkı -> Dini Hayat)
    question: 'İslam’da “komşu hakkı” ile ilgili olarak aşağıdakilerden hangisi yanlıştır?',
    options: ['Komşularla iyi geçinmek gerekir.', 'Komşular açken tok yatmamak gerekir.', 'Komşunun malını gizlice almak caizdir.', 'Komşuya yardım etmek dinen teşvik edilmiştir.'],
    correctAnswer: 2,
    explanation: 'Komşunun malını gizlice almak kul hakkına girmektir ve caiz değildir.'
  },
  {
    id: 'og_din_35', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'hard', // Eşleştirildi (Peygamberler -> Genel)
    question: 'Aşağıdaki peygamberlerden hangisi “Ulul Azm” peygamberler arasında yer alır?',
    options: ['Hz. Yusuf', 'Hz. Nuh', 'Hz. Harun', 'Hz. Davut'],
    correctAnswer: 1,
    explanation: 'Ulul Azm peygamberler, Kur\'an\'da en çok zorluğa göğüs germiş olarak tanımlanan peygamberlerdir. Bunlar Hz. Nuh, Hz. İbrahim, Hz. Musa, Hz. İsa ve Hz. Muhammed\'dir.'
  },
  {
    id: 'og_din_36', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'easy', // Eşleştirildi (İnfak -> Zekat/Sadaka)
    question: 'İslam’da “infak” ne anlama gelir?',
    options: ['Allah’a şirk koşmak', 'Yardım ve bağışta bulunmak', 'Günah işlemek', 'İbadetleri terk etmek'],
    correctAnswer: 1,
    explanation: 'İnfak, Allah rızası için kişinin malından ihtiyaç sahiplerine harcaması, yani yardım ve bağışta bulunmasıdır.'
  },
  {
    id: 'og_din_37', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy', // Eşleştirildi (Sorumluluk -> Kader)
    question: 'İslam’a göre insanın özgür iradesiyle yaptığı davranışların ahirette karşılığını görmesine ne denir?',
    options: ['Kader', 'Kaza', 'Sorumluluk', 'Hesap'],
    correctAnswer: 2,
    explanation: 'İslam\'da her birey, özgür iradesiyle yaptığı eylemlerden sorumludur.'
  },
  {
    id: 'og_din_38', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy', // Eşleştirildi
    question: 'Hz. Muhammed’e ilk vahiy hangi mağarada gelmiştir?',
    options: ['Sevr', 'Hira', 'Nur', 'Uhud'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed\'e ilk vahiy, Hira Mağarası\'nda gelmiştir.'
  },

  // --- YENİ EKLENEN ÖRNEK SORULAR ---
  {
    id: 'din_new_1', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium',
    question: 'Kur\'an-ı Kerim\'in Allah tarafından korunduğuna dair inanç, onun hangi özelliği ile ilgilidir?',
    options: ['Evrenselliği', 'Mucize oluşu', 'Değiştirilemezliği', 'Apaçık oluşu'], correctAnswer: 2,
    explanation: 'Müslümanlar, Kur\'an\'ın Allah tarafından korunacağına ve kıyamete kadar değiştirilemeyeceğine inanırlar.'
  },
  {
    id: 'din_new_2', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium',
    question: 'Hz. Muhammed\'in Medine\'de farklı inanç gruplarıyla imzaladığı ve birlikte yaşama esaslarını belirleyen belgeye ne ad verilir?',
    options: ['Veda Hutbesi', 'Hudeybiye Antlaşması', 'Medine Sözleşmesi', 'Akabe Biatları'], correctAnswer: 2,
    explanation: 'Medine Sözleşmesi, Medine\'de yaşayan Müslümanlar, Yahudiler ve diğer gruplar arasında toplumsal barışı ve birlikte yaşamayı güvence altına alan bir antlaşmadır.'
  },
  {
    id: 'din_new_3', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy',
    question: 'İslam\'da temizliğe verilen önem aşağıdaki kavramlardan hangisiyle doğrudan ilişkilidir?',
    options: ['İman', 'İbadet', 'Ahlak', 'Abdest/Gusül'], correctAnswer: 3,
    explanation: 'Abdest ve gusül gibi temizlik uygulamaları, İslam\'da hem bedensel hem de manevi temizliğin önemini vurgular ve ibadetlerin ön şartıdır.'
  },
  {
    id: 'din_new_4', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium',
    question: 'Fitre (fıtır sadakası) hangi zaman diliminde verilir?',
    options: ['Ramazan ayı boyunca', 'Ramazan Bayramı namazından önce', 'Kurban Bayramı günlerinde', 'Yılın herhangi bir zamanında'], correctAnswer: 1,
    explanation: 'Fitre, Ramazan ayının sonuna yetişen ve temel ihtiyaçlarının dışında belirli bir mala sahip olan Müslümanların kendileri ve bakmakla yükümlü oldukları kişiler için verdikleri bir sadakadır ve Ramazan Bayramı namazından önce verilmesi gerekir.'
  },// --- EKİM AYI İÇİN YENİ EKLENEN SORULAR ---
  {
    id: 'rel_ekim_1', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi zekatı verilen mallardan biri değildir?',
    options: ['Altın ve Gümüş', 'Ticaret Malları', 'Kullanılan Ev Eşyaları', 'Tarım Ürünleri'], correctAnswer: 2,
    explanation: 'Zekat, nisap miktarına ulaşan ve üzerinden bir yıl geçen belirli mallardan (altın, gümüş, para, ticaret malları, tarım ürünleri, hayvanlar) verilir. Kişinin oturduğu ev, kullandığı araba veya ev eşyaları gibi temel ihtiyaçlar zekata tabi değildir.'
  },
  {
    id: 'rel_ekim_2', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'easy',
    question: 'Sadaka vermenin zekattan temel farkı nedir?',
    options: ['Sadece Ramazan ayında verilir.', 'Belirli bir miktarı ve zamanı yoktur, gönüllülüktür.', 'Sadece zenginler verebilir.', 'Sadece akrabalara verilir.'], correctAnswer: 1,
    explanation: 'Zekat, belirli şartlara (nisap, yıl geçmesi) ve oranlara sahip farz bir ibadettir. Sadaka ise miktarı ve zamanı belirlenmemiş, kişinin isteğine bağlı olarak yaptığı her türlü maddi ve manevi iyiliktir.'
  },
  // --- BİTİŞ ---
  {
    id: 'din_new_5', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'medium',
    question: 'Bir iş için tüm tedbirleri aldıktan sonra Allah\'a güvenmeye ne ad verilir?',
    options: ['Kader', 'Kaza', 'Tevekkül', 'Rızık'], correctAnswer: 2,
    explanation: 'Tevekkül, gerekli tüm çabayı gösterdikten sonra işin sonucunu Allah\'ın takdirine bırakmak ve O\'na güvenmektir.'
  },
  // --- YIL BOYU İÇİN YENİ EKLENEN SORULAR (30 ADET) ---

  // Kader İnancı (6 Yeni Soru)
  {
    id: 'rel_yeni_1', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'medium',
    question: 'Aşağıdaki kavramlardan hangisi insanın sınırlı iradesini ifade eder?',
    options: ['Külli irade', 'Cüz’i irade', 'Tevekkül', 'Kaza'], correctAnswer: 1,
    explanation: 'Cüz’i irade, Allah\'ın insana verdiği seçme ve tercih etme yeteneğidir, sınırlıdır. Külli irade ise Allah\'ın her şeyi kuşatan sonsuz iradesidir.'
  },
  {
    id: 'rel_yeni_2', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy',
    question: 'Allah\'ın ezelden ebede kadar olacak her şeyi bilip takdir etmesine ne denir?',
    options: ['Kaza', 'Ecel', 'Rızık', 'Kader'], correctAnswer: 3,
    explanation: 'Kader, Allah’ın evrende olacak her şeyi önceden bilmesi, planlaması ve takdir etmesidir.'
  },
  {
    id: 'rel_yeni_3', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'medium',
    question: 'Allah\'ın takdir ettiği şeylerin zamanı gelince gerçekleşmesine ne ad verilir?',
    options: ['Kader', 'Kaza', 'Ömür', 'Tevekkül'], correctAnswer: 1,
    explanation: 'Kaza, Allah’ın ezelde takdir ettiği şeylerin zamanı ve yeri geldiğinde meydana gelmesidir.'
  },
  {
    id: 'rel_yeni_4', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'hard',
    question: '“Başarı sadece çalışmakla değil, aynı zamanda Allah’ın takdiriyle de ilgilidir.” düşüncesi hangi kavramla en yakından ilişkilidir?',
    options: ['Rızık', 'Ecel', 'Tevekkül', 'Sorumluluk'], correctAnswer: 2,
    explanation: 'Tevekkül, bir amaca ulaşmak için gerekli tüm çabayı gösterdikten sonra sonucu Allah’a bırakmak ve O’na güvenmektir. Başarı da bu kapsamda değerlendirilir.'
  },
  {
    id: 'rel_yeni_5', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'easy',
    question: 'Her canlının Allah tarafından belirlenmiş yaşam süresine ne denir?',
    options: ['Rızık', 'Kader', 'Ecel', 'Ömür'], correctAnswer: 2, // Düzeltme: Ecel, ömrün bittiği an. Ömür, yaşam süresi.
    explanation: 'Ömür, Allah\'ın her canlı için takdir ettiği yaşam süresidir. Ecel ise bu ömrün sona erdiği andır.'
  },
  {
    id: 'rel_yeni_6', subjectId: 'religion', topic: 'KADER İNANCI', difficulty: 'medium',
    question: 'Aşağıdaki ayetlerden hangisi insanın sorumluluğuna vurgu yapar?',
    options: ['“Şüphesiz biz ona (doğru) yolu gösterdik; artık o isterse şükreden olur, isterse nankör.” (İnsan suresi, 3. ayet)', '“Her can ölümü tadacaktır.” (Âl-i İmrân suresi, 185. ayet)', '“Allah her şeyi bir ölçüye göre yaratmıştır.” (Kamer suresi, 49. ayet)', '“Yeryüzünde yaşayan bütün canlıların rızkı Allah’a aittir.” (Hûd suresi, 6. ayet)'], correctAnswer: 0,
    explanation: 'İnsan suresi 3. ayet, insana doğru yolun gösterildiğini ancak seçimin (şükretmek veya nankör olmak) insana bırakıldığını belirterek, insanın iradesine ve sorumluluğuna işaret eder.'
  },

  // Zekât ve Sadaka (6 Yeni Soru)
  {
    id: 'rel_yeni_7', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium',
    question: 'Zekâtın kelime anlamları arasında aşağıdakilerden hangisi yoktur?',
    options: ['Artma', 'Çoğalma', 'Temizlenme', 'Zorunluluk'], correctAnswer: 3,
    explanation: 'Zekât kelimesi; artma, çoğalma, temizlenme, bereket gibi anlamlara gelir. Farz olması onun hükmüdür, kelime anlamı değildir.'
  },
  {
    id: 'rel_yeni_8', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi sadece Ramazan ayına özgü bir sadaka türüdür?',
    options: ['Zekât', 'Fitre (Fıtır Sadakası)', 'Sadaka-i Cariye', 'Fidye'], correctAnswer: 1,
    explanation: 'Fitre (fıtır sadakası), Ramazan ayının sonuna yetişen Müslümanların bayram namazından önce vermesi gereken vacip bir sadakadır.'
  },
  {
    id: 'rel_yeni_9', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium',
    question: 'Ticaret mallarının zekât oranı nedir?',
    options: ['1/10', '1/20', '1/30', '1/40'], correctAnswer: 3,
    explanation: 'Altın, gümüş, para ve ticaret mallarının zekâtı, nisap miktarına ulaşıp üzerinden bir yıl geçince kırkta bir (%2.5) oranında verilir.'
  },
  {
    id: 'rel_yeni_10', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'hard',
    question: '“İnsan öldüğü zaman amel defteri kapanır. Ancak üç şey hariç: ..., faydalanılan ilim ve kendisine dua eden hayırlı evlat.” Hadisindeki boşluğa aşağıdakilerden hangisi gelmelidir?',
    options: ['Verilen zekât', 'Tutulan oruç', 'Kılınan namaz', 'Sadaka-i cariye'], correctAnswer: 3,
    explanation: 'Sadaka-i cariye, kişinin ölümünden sonra da sevabı devam eden sadakalardır (çeşme, okul, cami yaptırmak gibi).'
  },
  {
    id: 'rel_yeni_11', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'medium',
    question: 'Zekât ve sadaka ibadetlerinin öncelikli amacı nedir?',
    options: ['Toplumda zenginliği artırmak', 'Sosyal adaleti ve yardımlaşmayı sağlamak', 'Devlete vergi gelirini artırmak', 'Kişinin sadece kendi maneviyatını güçlendirmek'], correctAnswer: 1,
    explanation: 'Zekât ve sadaka, zenginlerle fakirler arasında bir köprü kurarak toplumsal dengeyi, yardımlaşmayı ve sosyal adaleti sağlamayı hedefler.'
  },
  {
    id: 'rel_yeni_12', subjectId: 'religion', topic: 'ZEKÂT VE SADAKA', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi sadaka olarak değerlendirilmez?',
    options: ['Gülümsemek', 'Yoldaki bir taşı kaldırmak', 'Borç vermek', 'Gösteriş için yardım yapmak'], correctAnswer: 3,
    explanation: 'Sadaka, Allah rızası için yapılan her türlü iyiliktir. Gösteriş (riya) amacıyla yapılan yardımlar sadaka sayılmaz.'
  },

  // Din ve Hayat (6 Yeni Soru)
  {
    id: 'rel_yeni_13', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium',
    question: 'İslam dininin korunmasını istediği beş temel değer (Zarurat-ı Diniyye) arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Canın korunması', 'Malın korunması', 'Aklın korunması', 'Şöhretin korunması'], correctAnswer: 3,
    explanation: 'İslam\'ın korunmasını esas aldığı beş temel değer; canın, malın, aklın, neslin ve dinin korunmasıdır.'
  },
  {
    id: 'rel_yeni_14', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi dinin bireysel faydalarından biridir?',
    options: ['Toplumsal barışa katkı sağlaması', 'Adaletin sağlanmasına yardımcı olması', 'İnsana manevi huzur vermesi', 'Yardımlaşma duygusunu güçlendirmesi'], correctAnswer: 2,
    explanation: 'İnanç ve ibadetler, insanın anlam arayışına cevap vererek ona manevi bir dayanak ve iç huzur sağlar.'
  },
  {
    id: 'rel_yeni_15', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium',
    question: 'Hz. Lokman\'ın oğluna verdiği öğütler Kur\'an\'da hangi surede yer alır?',
    options: ['Yasin Suresi', 'Bakara Suresi', 'Lokman Suresi', 'Mülk Suresi'], correctAnswer: 2,
    explanation: 'Hz. Lokman\'ın oğluna verdiği hikmetli öğütler, kendi adıyla anılan Lokman Suresi\'nde anlatılır.'
  },
  {
    id: 'rel_yeni_16', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'hard',
    question: 'Aşağıdaki peygamber kıssalarından hangisi, sabır ve Allah\'a teslimiyet konusunda önemli bir örnektir?',
    options: ['Hz. Yusuf\'un kardeşleri tarafından kuyuya atılması', 'Hz. Eyüp\'ün hastalığına sabretmesi', 'Hz. Musa\'nın Firavun\'la mücadelesi', 'Hz. İbrahim\'in putları kırması'], correctAnswer: 1,
    explanation: 'Hz. Eyüp, uzun süren ağır hastalığına ve malını kaybetmesine rağmen Allah\'a isyan etmemiş, sabır ve teslimiyet göstermiş bir peygamberdir.'
  },
  {
    id: 'rel_yeni_17', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'easy',
    question: 'İslam\'a göre alkol ve uyuşturucu kullanmanın yasaklanmasının temel nedeni nedir?',
    options: ['Ekonomiye zarar vermesi', 'Aklın korunması ilkesine aykırı olması', 'Sadece belirli zamanlarda serbest olması', 'Toplumsal statüyü düşürmesi'], correctAnswer: 1,
    explanation: 'Alkol ve uyuşturucu gibi zararlı maddeler, insanın akıl sağlığını ve muhakeme yeteneğini olumsuz etkilediği için İslam\'da aklın korunması ilkesi gereği yasaklanmıştır.'
  },
  {
    id: 'rel_yeni_18', subjectId: 'religion', topic: 'DİN VE HAYAT', difficulty: 'medium',
    question: 'Bir toplumda adaletin sağlanması, dinin hangi temel amacına hizmet eder?',
    options: ['Neslin korunması', 'Malın korunması', 'Canın korunması', 'Aklın korunması'], correctAnswer: 2, // Düzeltme: Adalet daha çok can ve mal güvenliği ile ilgilidir.
    explanation: 'Adalet, insanların can ve mal güvenliğini sağlayarak huzurlu bir toplum oluşturmayı hedefler. Bu da dinin temel amaçlarından olan canın ve malın korunmasıyla yakından ilgilidir.'
  },

  // Hz. Muhammed ve Örnekliği (6 Yeni Soru)
  {
    id: 'rel_yeni_19', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium',
    question: 'Hz. Muhammed\'in Medine\'ye hicret ederken Hz. Ebubekir ile birlikte sığındığı mağaranın adı nedir?',
    options: ['Hira Mağarası', 'Sevr Mağarası', 'Uhud Dağı Mağarası', 'Nur Dağı Mağarası'], correctAnswer: 1,
    explanation: 'Hz. Muhammed ve Hz. Ebubekir, Mekkeli müşriklerden gizlenmek için Medine\'ye hicretleri sırasında Sevr Mağarası\'nda üç gün kalmışlardır.'
  },
  {
    id: 'rel_yeni_20', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy',
    question: 'Hz. Muhammed\'in Veda Hutbesi\'nde en çok vurguladığı konulardan biri nedir?',
    options: ['Zenginliğin önemi', 'Kabileciliğin üstünlüğü', 'İnsan hakları ve eşitlik', 'Savaş stratejileri'], correctAnswer: 2,
    explanation: 'Veda Hutbesi, insan hakları, kadın hakları, kan davalarının kaldırılması, faizin yasaklanması gibi evrensel mesajlar içeren ve insanlar arası eşitliği vurgulayan tarihi bir konuşmadır.'
  },
  {
    id: 'rel_yeni_21', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium',
    question: 'Peygamberimizin aile üyelerine ve çocuklara karşı tutumu nasıldı?',
    options: ['Sert ve otoriter', 'İlgisiz ve mesafeli', 'Şefkatli, merhametli ve adil', 'Sadece erkek çocuklara değer veren'], correctAnswer: 2,
    explanation: 'Hz. Muhammed, aile hayatında eşlerine ve çocuklarına karşı son derece şefkatli, merhametli, adil davranmış ve onlarla yakından ilgilenmiştir.'
  },
  {
    id: 'rel_yeni_22', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'hard',
    question: 'Hz. Muhammed\'in Hendek Savaşı\'nda Medine\'nin etrafına hendek kazılması fikrini veren sahabe kimdir?',
    options: ['Hz. Ali', 'Hz. Ömer', 'Hz. Ebubekir', 'Selman-ı Farisi'], correctAnswer: 3,
    explanation: 'Hendek kazma fikri, İran asıllı sahabe Selman-ı Farisi tarafından önerilmiş ve Peygamberimiz tarafından kabul edilmiştir. Bu, istişareye (danışmaya) verdiği önemi gösterir.'
  },
  {
    id: 'rel_yeni_23', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'easy',
    question: 'Peygamberimizin güzel ahlakını tamamlamak üzere gönderildiğini ifade eden hadisi, onun hangi yönünü vurgular?',
    options: ['Askeri liderliğini', 'Devlet adamlığını', 'Örnek ahlakını', 'Ticari başarısını'], correctAnswer: 2,
    explanation: 'Bu hadis, Hz. Muhammed\'in peygamber olarak gönderilişinin temel amaçlarından birinin insanlara en güzel ahlakı öğretmek ve yaşantısıyla örnek olmak olduğunu gösterir.'
  },
  {
    id: 'rel_yeni_24', subjectId: 'religion', topic: 'HZ. MUHAMMED VE ÖRNEKLİĞİ', difficulty: 'medium',
    question: 'Peygamberimizin hayatındaki "Hüzün Yılı" olarak adlandırılan dönemde hangi iki önemli kişiyi kaybetmiştir?',
    options: ['Annesi Amine ve Dedesi Abdulmuttalip', 'Amcası Ebu Talip ve Eşi Hz. Hatice', 'Kızı Fatıma ve Torunu Hasan', 'Babası Abdullah ve Amcası Hamza'], correctAnswer: 1,
    explanation: 'Peygamberliğin 10. yılında, Hz. Muhammed\'i himaye eden amcası Ebu Talip ve en büyük destekçisi olan eşi Hz. Hatice kısa aralıklarla vefat etmişlerdir. Bu yıla "Hüzün Yılı" denir.'
  },

  // Kur’an-ı Kerim ve Özellikleri (6 Yeni Soru)
  {
    id: 'rel_yeni_25', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'easy',
    question: 'Kur\'an-ı Kerim\'in yaklaşık 114 bölümünden her birine ne ad verilir?',
    options: ['Ayet', 'Cüz', 'Sure', 'Hizb'], correctAnswer: 2,
    explanation: 'Kur\'an-ı Kerim, Fatiha ile başlayıp Nas ile biten 114 adet surelerden oluşur.'
  },
  {
    id: 'rel_yeni_26', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium',
    question: 'Kur\'an-ı Kerim\'in ana konuları arasında hangisi yer almaz?',
    options: ['İnanç esasları (Tevhid, Ahiret vb.)', 'İbadetler (Namaz, Oruç vb.)', 'Ahlak ilkeleri', 'Bilimsel formüller ve teoriler'], correctAnswer: 3,
    explanation: 'Kur\'an\'ın temel amacı insanlara inanç, ibadet ve ahlak konularında yol göstermektir. Bilimsel gerçeklere işaret eden ayetler olsa da, bir bilim kitabı değildir ve detaylı formüller içermez.'
  },
  {
    id: 'rel_yeni_27', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'easy',
    question: 'Kur\'an ayetlerinin bir araya gelmesiyle oluşan ve sureleri meydana getiren her bir cümleye ne denir?',
    options: ['Cüz', 'Ayet', 'Hatim', 'Tecvid'], correctAnswer: 1,
    explanation: 'Ayet, Kur\'an surelerini oluşturan, duraklarla birbirinden ayrılan harf, kelime veya cümlelerdir.'
  },
  {
    id: 'rel_yeni_28', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium',
    question: 'Kur\'an-ı Kerim\'i güzel bir şekilde, kurallarına uygun olarak okumaya ne ad verilir?',
    options: ['Meal', 'Tefsir', 'Tecvid', 'Hafızlık'], correctAnswer: 2,
    explanation: 'Tecvid, Kur\'an harflerinin çıkış yerlerine ve okuma kurallarına (uzatma, durma vb.) dikkat ederek Kur\'an\'ı güzel bir şekilde okuma ilmidir.'
  },
  {
    id: 'rel_yeni_29', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'hard',
    question: 'Kur\'an-ı Kerim\'in anlamını başka bir dile (tam karşılığı olmasa da) aktarmaya ne denir?',
    options: ['Tefsir', 'Tecvid', 'Meal', 'Kıraat'], correctAnswer: 2,
    explanation: 'Meal, Kur\'an metninin tam karşılığı olmasa da anlamını başka bir dile çevirme işlemidir. Tefsir ise ayetlerin daha geniş ve derinlemesine açıklanmasıdır.'
  },
  {
    id: 'rel_yeni_30', subjectId: 'religion', topic: 'KUR’AN-I KERİM VE ÖZELLİKLERİ', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Kur\'an-ı Kerim\'in özelliklerinden biri değildir?',
    options: ['Son ilahi kitap olması', 'Sadece Araplara gönderilmiş olması', 'Kıyamete kadar geçerli olması', 'Allah kelamı olması'], correctAnswer: 1,
    explanation: 'İslam inancına göre Kur\'an, sadece Araplara değil, tüm insanlığa gönderilmiş evrensel bir ilahi kitaptır.'
  },
  // --- BİTİŞ ---
];