// src/data/turkish.ts
import { Question } from "@/types";

export const turkishQuestions: Question[] = [
  {
    id: 'og_tur_1', subjectId: 'turkish', topic: 'Deyimler ve Atasözleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "burun" sözcüğü deyim içinde kullanılmamıştır?',
    options: ['Her işe burnunu sokmasından hoşlanmıyorum.','Babasının burnundan düşmüş, tıpkı o.','Kaza yapınca burnu bile kanamamış.','Burnumdaki sızı beni rahatsız ediyor.'], correctAnswer: 3,
    explanation: '"Burnumdaki sızı beni rahatsız ediyor." cümlesinde burun kelimesi gerçek anlamıyla kullanılmıştır. Diğer seçeneklerdeki "burnunu sokmak", "burnundan düşmek" ve "burnu kanamamak" birer deyimdir.'
  },
  {
    id: 'og_tur_2', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde bir yazım yanlışı vardır?',
    options: ['TDK\'nin yeni kurallarını inceledin mi?','Herşey yolunda gibi görünüyordu.','Bu konuyu da yarın görüşürüz.','19 Mayıs 1919\'da Samsun\'a çıktı.'], correctAnswer: 1,
    explanation: '"Herşey" kelimesi ayrı yazılmalıdır. Doğru yazımı "her şey" şeklindedir.'
  },
  {
    id: 'og_tur_3', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'hard',
    question: '"Güneş, altın saçlarını yeryüzüne serpiyordu." cümlesindeki söz sanatı aşağıdakilerden hangisidir?',
    options: ['Benzetme', 'Kişileştirme', 'Abartma', 'Konuşturma'], correctAnswer: 1,
    explanation: 'Kişileştirme, insan dışındaki varlıklara insan özelliği verilmesidir. "Güneş"e "saç" verilmesi kişileştirme sanatına örnektir.'
  },
  {
    id: 'og_tur_4', subjectId: 'turkish', topic: 'Cümle Ögeleri', difficulty: 'medium',
    question: '"Uzun bir yolculuktan sonra küçük bir kasabaya geldik." cümlesinin yüklemi hangisidir?',
    options: ['geldik', 'kasabaya geldik', 'bir kasabaya geldik', 'küçük bir kasabaya geldik'], correctAnswer: 0,
    explanation: 'Yüklem, cümlede iş, oluş, durum bildiren çekimli fiildir. Bu cümlede yüklem "geldik" fiilidir.'
  },
  {
    id: 'og_tur_5', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'easy',
    question: 'Cümle sonuna konulan (.) işareti aşağıdakilerden hangisidir?',
    options: ['Ünlem', 'Soru İşareti', 'Nokta', 'Virgül'], correctAnswer: 2,
    explanation: 'Cümle sonuna konulan işaret, cümle tamamlandığında kullanılan Nokta işaretidir.'
  },
  {
    id: 'og_tur_6', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde isim-fiil kullanılmıştır?',
    options: ['Koşarak yanımdan uzaklaştı.', 'Gülmek sana çok yakışıyor.', 'Gelen gideni aratır derler.', 'Okunacak çok kitap var.'], correctAnswer: 1,
    explanation: 'İsim-fiil, fiillere "-ma, -ış, -mak" ekleri getirilerek oluşturulur. "Gülmek" kelimesi bu kurala uyar.'
  },
  {
    id: 'og_tur_7', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisi yapısına göre birleşik cümledir?',
    options: ['Çok yorulduğu için erken yattı.','Çalıştıkça başarısı artıyor.','Kitabı okudu ve bitirdi.','Hava çok sıcaktı, bu yüzden dışarı çıkmadık.'], correctAnswer: 1,
    explanation: 'Birleşik cümleler, bir temel cümle ve en az bir yan cümlecikten oluşur. "Çalıştıkça" sözcüğü bir yan cümleciktir.'
  },
  {
    id: 'og_tur_8', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'easy',
    question: 'Aşağıdaki kelimelerden hangisi ünlü düşmesine uğramıştır?',
    options: ['kaplumbağa', 'dostluk', 'kayboldu', 'babaanne'], correctAnswer: 2,
    explanation: '"Kayboldu" kelimesi "kayıp" ve "oldu" kelimelerinin birleşimiyle oluşmuş ve aradaki "ı" ünlüsü düşmüştür.'
  },
  {
    id: 'og_tur_9', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Hangi cümlede gereksiz sözcük kullanımından kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Herkes bu konuyu biliyor.', 'Aradan tam beş yıl geçti.','Birlikte el ele tutuşarak yürüdüler.','Bu konuyu tekrar gözden geçirmelisin.'], correctAnswer: 2,
    explanation: '"Birlikte" ve "el ele tutuşarak" aynı anlama geldiği için ikisinden birinin kullanılması yeterlidir.'
  },
  {
    id: 'og_tur_10', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Paragrafta asıl anlatılmak istenen düşünceye ne ad verilir?',
    options: ['Yardımcı düşünce', 'Ana fikir', 'Konu', 'Başlık'], correctAnswer: 1,
    explanation: 'Paragrafta asıl anlatılmak istenen ve yazarın okuyucuya vermek istediği mesaja ana fikir denir.'
  },
  {
    id: 'lgs24_tur_1', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'hard',
    question: '"Bırakmak" sözcüğü verilen cümlelerde (Tamirci... bıraktı / Bırak, insanlar... / Eşyalarını... bıraktı / İşi ona bıraktı) aşağıdaki anlamlarından hangisiyle kullanılmamıştır?',
    options: ['Bir işi başka bir zamana ertelemek', 'Bakılmak, korunmak için vermek', 'Bir iş için birini görevlendirmek', 'Birinin bir şey yapmasına engel olmamak'], correctAnswer: 0,
    explanation: "Verilen cümlelerde 'bırakmak' fiili; 'ertelemek' anlamında değil, 'ilgilenmemek', 'emanet etmek', 'devretmek' ve 'karışmamak' anlamlarında kullanılmıştır. Bu nedenle 'bir işi başka bir zamana ertelemek' anlamı yoktur."
  },
  {
    id: 'lgs25_tur_1', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'hard',
    question: 'Bu metinde boş bırakılan yerlere düşüncenin akışına göre sırasıyla aşağıdakilerin hangisi getirilmelidir? (Metin: ...yine de -, yaşama direncini ve umudunu yitirmemiş... dostlarına karşı - ve paylaşımcı olan...)',
    options: ['rahata kavuşmamış - duyarlı', 'pes etmemiş - koruyucu', 'yenik düşmemiş - gururlu', 'taviz vermemiş - baskici'], correctAnswer: 1,
    explanation: "Metnin ilk boşluğuna 'yine de yaşama direncini ve umudunu yitirmemiş' ifadesiyle uyumlu olarak 'pes etmemiş' gelmelidir. İkinci boşluğa ise dostlarına karşı 'paylaşımcı' ifadesiyle uyumlu olarak 'koruyucu' kelimesi anlam akışını tamamlar."
  },
  {
    id: 'tur_new_1', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "de" bağlacı yanlış yazılmıştır?',
    options: ['Annem de bizimle gelecek.', 'Kitaplarıda çantama koydum.', 'O da çok yorulmuştu.', 'Biz de çok heyecanlandık.'], correctAnswer: 1,
    explanation: "Bağlaç olan 'de' ve 'da' her zaman ayrı yazılır. 'Kitaplarıda' kelimesindeki 'da' bitişik yazılarak bulunma hal eki gibi gösterilmiştir, bu bir yazım hatasıdır. Doğrusu 'Kitapları da' olmalıydı."
  },
  {
    id: 'tur_new_2', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'medium',
    question: 'Atatürk ( ) "Yurtta sulh, cihanda sulh." demiştir. Cümlesinde parantezle belirtilen yere hangi noktalama işareti getirilmelidir?',
    options: [', (virgül)', '; (noktalı virgül)', ': (iki nokta)', '… (üç nokta)'], correctAnswer: 0,
    explanation: 'Tırnak içinde olmayan alıntı cümlelerinden sonra virgül konur.'
  },
  {
    id: 'tur_new_3', subjectId: 'turkish', topic: 'Cümle Ögeleri', difficulty: 'hard',
    question: '"Baharın gelişiyle ağaçlar, rengarenk çiçeklerle süslendi." cümlesinin öznesi nedir?',
    options: ['ağaçlar', 'rengarenk çiçeklerle', 'süslendi', 'Baharın gelişiyle'], correctAnswer: 0,
    explanation: 'Yükleme "süslenen ne?" sorusunu sorduğumuzda "ağaçlar" cevabını alırız. Bu nedenle cümlenin öznesi "ağaçlar"dır.'
  },
  {
    id: 'tur_new_4', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: 'Aşağıdaki altı çizili sözcüklerden hangisi mecaz anlamda kullanılmıştır?',
    options: ['Bu yemeğin tadı çok _keskin_.', 'Sırtında _ağır_ bir çanta vardı.', 'Bana karşı çok _soğuk_ davranıyor.', 'Odanın _karanlık_ bir köşesinde oturuyordu.'], correctAnswer: 2,
    explanation: '"Soğuk davranmak" ifadesinde "soğuk" kelimesi, dokunma duyusuyla ilgili gerçek anlamının dışında, "ilgisiz, sevimsiz" anlamında kullanılmıştır.'
  },
  {
    id: 'tur_new_5', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir paragrafın ilk cümlesi aşağıdakilerden hangisi olamaz?',
    options: ['Bu nedenle, sonuç olarak...', 'Kitap okumak, ufku genişletir.', 'Teknoloji, hayatımızı kolaylaştırdı.', 'İnsan, sosyal bir varlıktır.'], correctAnswer: 0,
    explanation: 'Bir paragrafın giriş cümlesi, kendinden önceki bir cümleye gönderme yapan "bu nedenle, çünkü, fakat, sonuç olarak" gibi bağlayıcı ifadelerle başlayamaz.'
  },
  {
    id: 'tur_new_6', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde sıfat-fiil (ortaç) kullanılmıştır?',
    options: ['Konuşarak anlaşabiliriz.', 'Yaptığı işler herkes tarafından beğenildi.', 'Buraya gelmek istemiyorum.', 'Ağlayışını duyan olmadı.'], correctAnswer: 1,
    explanation: 'Sıfat-fiil ekleri "-an, -ası, -mez, -ar, -dik, -ecek, -miş" ekleridir. "Yaptığı" kelimesindeki "-dığı" eki sıfat-fiil ekidir.'
  },
  {
    id: 'tur_new_7', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerden hangisinin yazımı doğrudur?',
    options: ['Proğram', 'Klavuz', 'Eşortman', 'Orijinal'], correctAnswer: 3,
    explanation: 'Doğru yazım "Orijinal"dir. Diğerlerinin doğru yazımları "Program", "Kılavuz" ve "Eşofman" olmalıdır.'
  },
  {
    id: 'tur_new_8', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde neden-sonuç ilişkisi vardır?',
    options: ['Yağmur yağarsa dışarı çıkamayız.', 'Ders çalışmak için odasına çekildi.', 'Çok yorulduğundan hemen uyuyakaldı.', 'Seni görmek üzere buraya geldim.'], correctAnswer: 2,
    explanation: '"Hemen uyuyakalmasının" nedeni "çok yorulmasıdır". "-dığından" eki neden-sonuç anlamı katmıştır.'
  },
  {
    id: 'tur_new_9', subjectId: 'turkish', topic: 'Sözcük Türleri', difficulty: 'medium',
    question: '"Güzel havalarda parkta yürüyüş yaparız." cümlesinde "güzel" kelimesinin türü nedir?',
    options: ['İsim', 'Sıfat', 'Zarf', 'Zamir'], correctAnswer: 1,
    explanation: '"Güzel" kelimesi, "hava" ismini nitelediği için bir sıfattır.'
  },
  {
    id: 'tur_new_10', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerden hangisinde ünsüz benzeşmesi (sertleşmesi) vardır?',
    options: ['Kitabı', 'Ağacın', 'Yurttaş', 'Kalbim'], correctAnswer: 2,
    explanation: '"Yurt" kelimesi sert ünsüzle biter ve "-daş" eki "-taş" şekline dönüşür. Bu bir ünsüz benzeşmesidir.'
  },
  {
    id: 'tur_new_11', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'hard',
    question: 'Özel olarak vurgulanmak istenen sözler, cümlenin hangi noktalama işareti içine alınır?',
    options: ['Parantez ()', 'Kısa çizgi -', 'Tırnak işareti ""', 'Köşeli ayraç []'], correctAnswer: 2,
    explanation: 'Başka bir kimseden veya yazıdan olduğu gibi aktarılan sözler gibi, özel olarak belirtilmek istenen sözler de tırnak içine alınır.'
  },
  {
    id: 'tur_new_12', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisi yüklemi bakımından etkendir?',
    options: ['Bütün sokaklar temizlendi.', 'Toplantıda önemli kararlar alındı.', 'Arkadaşım dün akşam bize geldi.', 'Bulaşıklar özenle yıkandı.'], correctAnswer: 2,
    explanation: 'Etken çatılı fiillerde işi yapan, yani gerçek özne bellidir. "geldi" fiilinin öznesi "Arkadaşım"dır ve bellidir. Diğer seçeneklerde işi yapan belli değildir (edilgen çatı).'
  },
  {
    id: 'tur_new_13', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde özne-yüklem uyumsuzluğu vardır?',
    options: ['Ağaçlar yapraklarını döktüler.', 'Kuşlar neşeyle ötüşüyor.', 'Onlar yarın sinemaya gidecek.', 'Herkes sırasını bekliyordu.'], correctAnswer: 0,
    explanation: 'İnsan dışındaki varlıkların (bitki, hayvan, nesne) çoğul özneleri için yüklem tekil olur. "Ağaçlar yapraklarını döktü." olmalıydı.'
  },
  {
    id: 'tur_new_14', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: '"Kırmak" kelimesi hangi cümlede "incitmek, gücendirmek" anlamında kullanılmıştır?',
    options: ['Oyuncağını yanlışlıkla kırdı.', 'Bu sözlerinle beni çok kırdın.', 'Odunları baltayla kırdı.', 'Direksiyonu aniden sağa kırdı.'], correctAnswer: 1,
    explanation: '"Bu sözlerinle beni çok kırdın." cümlesinde "kırmak" fiili mecazi bir anlamda, "incitmek, gücendirmek" manasında kullanılmıştır.'
  },
  {
    id: 'tur_new_15', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Düşüncenin akışını bozan cümle, paragrafın hangi bölümünde yer almaz?',
    options: ['Giriş cümlesi olabilir.', 'Gelişme bölümünde olabilir.', 'Sonuç cümlesi olabilir.', 'Giriş cümlesi olamaz.'], correctAnswer: 3,
    explanation: 'Giriş cümlesi konuyu tanıttığı için genellikle akışı bozmaz. Akışı bozan cümle, genellikle gelişme bölümünde konudan sapan bir ifade olarak karşımıza çıkar.'
  },
  {
    id: 'tur_new_16', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde sayıların yazımı ile ilgili bir yanlışlık yapılmıştır?',
    options: ['Sınavda 15\'inci oldum.', 'Okulda on beş gün kaldık.', 'Saat 16.30\'da buluşalım.', 'Çek üzerine yanlız on bin tl yazdı.'], correctAnswer: 3,
    explanation: '"Yalnız" kelimesi "yanlız" şeklinde yanlış yazılmıştır. Ayrıca yazı ile yazılan sayılar (on bin) genellikle ayrı yazılır; sadece çek/senet gibi ticari belgelerde bitişik yazılır.'
  },
  {
    id: 'tur_new_17', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi bir ünlem cümlesidir?',
    options: ['Yarın hava nasıl olacak', 'Eyvah, otobüsü kaçırdım!', 'Derslerine düzenli çalışmalısın.', 'Kitap okumayı çok severim.'], correctAnswer: 1,
    explanation: 'Şaşma, korku, sevinç gibi ani duyguları bildiren ve sonunda ünlem işareti olan cümleler ünlem cümlesidir.'
  },
  {
    id: 'tur_new_18', subjectId: 'turkish', topic: 'Cümle Ögeleri', difficulty: 'hard',
    question: '"Dün akşam bize gelen misafirler, salonda oturuyor." cümlesinde hangi öge yoktur?',
    options: ['Özne', 'Yüklem', 'Belirtili Nesne', 'Dolaylı Tümleç (Yer Tamlayıcısı)'], correctAnswer: 2,
    explanation: 'Yüklem: "oturuyor". Oturan kim?: "Dün akşam bize gelen misafirler" (Özne). Nerede oturuyor?: "salonda" (Dolaylı Tümleç). Cümlede "neyi, kimi" sorularına cevap veren belirtili nesne yoktur.'
  },
  {
    id: 'tur_new_19', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde zarf-fiil (ulaç) kullanılmıştır?',
    options: ['Güler yüzüyle herkesi etkiledi.', 'Okumak, en sevdiği eylemdi.', 'Durmadan konuşuyordu.', 'Yapılacak işler listesi kabarıktı.'], correctAnswer: 2,
    explanation: 'Zarf-fiil, fiillere getirilen "-ken, -alı, -madan, -ince, -ip, -arak, -dıkça, -e...-e, -r...-mez, -casına, -meksizin, -dığında" gibi eklerle yapılır. "Durmadan" kelimesi zarf-fiildir.'
  },
  {
    id: 'tur_new_20', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'medium',
    question: '"Aslan gibi güçlü bir çocuktu." cümlesindeki söz sanatı hangisidir?',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Tezat'], correctAnswer: 1,
    explanation: 'Çocuğun gücü, aslanın gücüne benzetilmiştir. "gibi" edatı bu benzetmeyi kurmuştur.'
  },
  {
    id: 'tur_new_21', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisi kanıtlanabilirlik açısından diğerlerinden farklıdır?',
    options: ['Film, iki saat on beş dakika sürdü.', 'Yazarın son kitabı büyük bir ilgi gördü.', 'Türkiye\'nin en yüksek dağı Ağrı Dağı\'dır.', 'Bu bina geçen yıl inşa edildi.'], correctAnswer: 1,
    explanation: '"Büyük bir ilgi gördü" ifadesi kişisel bir yorum içerir ve nesnel değildir, yani öznel bir yargıdır. Diğer seçenekler ise kanıtlanabilir, nesnel yargılardır.'
  },
  {
    id: 'tur_new_22', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bu parçada yazarın yakındığı durum aşağıdakilerden hangisidir? "Günümüz gençleri, sanki her şeyi biliyormuş gibi davranıyor. Büyüklerinin tecrübelerinden faydalanmak yerine kendi bildiklerini okuyorlar. Oysa bilgece bir söz dinlemek, binlerce kitap okumaktan daha aydınlatıcı olabilir bazen."',
    options: ['Gençlerin çok kitap okumaması', 'Gençlerin tecrübeye önem vermemesi', 'Büyüklerin gençlere yol göstermemesi', 'Kitapların yeterince aydınlatıcı olmaması'], correctAnswer: 1,
    explanation: 'Paragrafta yazar, gençlerin büyüklerinin tecrübelerinden faydalanmak yerine kendi bildiklerini okumasından şikayet etmektedir.'
  },
  {
    id: 'tur_new_23', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde birleşik fiillerin yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['Bu duruma seyirci kalamam.', 'Beni affet, lütfen!', 'Sonunda istediği evi farketti.', 'Sabretti ve muradına erdi.'], correctAnswer: 2,
    explanation: '"Fark etmek" birleşik fiili, ses düşmesi veya türemesi olmadığı için ayrı yazılmalıdır. "Fark etti" şeklinde olmalıydı.'
  },
  {
    id: 'tur_new_24', subjectId: 'turkish', topic: 'Sözcük Türleri', difficulty: 'medium',
    question: '"Akşam, günün en hüzünlü anıdır." cümlesindeki "akşam" sözcüğü hangi türdedir?',
    options: ['Sıfat', 'Zarf', 'İsim', 'Zamir'], correctAnswer: 2,
    explanation: '"Akşam" kelimesi burada bir zaman dilimini belirten bir varlığın adı olarak kullanılmıştır, bu yüzden isimdir.'
  },
  {
    id: 'tur_new_25', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'easy',
    question: 'Aşağıdaki sözcük çiftlerinden hangisi zıt anlamlı değildir?',
    options: ['ileri - geri', 'güzel - çirkin', 'ıslak - yaş', 'uzun - kısa'], correctAnswer: 2,
    explanation: '"Islak" ve "yaş" kelimeleri eş anlamlıdır. Diğer seçeneklerdeki kelimeler birbirinin zıttıdır.'
  },
  {
    id: 'tur_new_26', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: '"Çocuk, güle oynaya evine gitti." cümlesindeki fiilimsi ikilemesi hangi türdedir?',
    options: ['İsim-fiil', 'Sıfat-fiil', 'Zarf-fiil', 'Fiilimsi değildir'], correctAnswer: 2,
    explanation: '"Güle oynaya" ikilemesindeki "-a ... -a" ekleri zarf-fiil ekidir ve fiilin nasıl yapıldığını belirtir.'
  },
  {
    id: 'tur_new_27', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'medium',
    question: 'Sıralı cümleleri birbirinden ayırmak için genellikle hangi noktalama işareti kullanılır?',
    options: ['Nokta (.)', 'Virgül (,)', 'İki nokta (:)', 'Ünlem (!)'], correctAnswer: 1,
    explanation: 'Sıralı cümleler, yani art arda gelen ve anlamca birbiriyle ilişkili olan cümleler virgül ile ayrılır. Örneğin: "Geldim, gördüm, yendim."'
  },
  {
    id: 'tur_new_28', subjectId: 'turkish', topic: 'Cümle Ögeleri', difficulty: 'hard',
    question: '"Öğretmenimiz, bize bu konuyu dün uzun uzun anlattı." cümlesinin zarf tümleçleri hangileridir?',
    options: ['bize - dün', 'bu konuyu - anlattı', 'dün - uzun uzun', 'Öğretmenimiz - dün'], correctAnswer: 2,
    explanation: 'Yükleme sorulan "ne zaman?" sorusunun cevabı "dün" (zarf tümleci) ve "nasıl?" sorusunun cevabı "uzun uzun" (zarf tümleci) olur.'
  },
  {
    id: 'tur_new_29', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerin hangisinde "ünsüz yumuşaması" (değişimi) görülür?',
    options: ['Sokakta', 'Ağacı', 'Kitapçı', 'Seçkin'], correctAnswer: 1,
    explanation: '"Ağaç" kelimesi ünlü ile başlayan bir ek aldığında sonundaki "ç" sesi "c" sesine dönüşür. Bu bir ünsüz yumuşamasıdır.'
  },
  {
    id: 'tur_new_30', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde çatı uyuşmazlığından kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Sabah erkenden kalkıp okula gidildi.', 'Bütün ödevler bitirilip rafa konuldu.', 'Yemek yiyip hemen yattı.', 'Konu dikkatle dinlendi.'], correctAnswer: 0,
    explanation: '"Kalkıp" fiilimsisi etken çatılı iken, cümlenin yüklemi olan "gidildi" edilgen çatılıdır. Fiilimsi ile yüklemin çatıları uyumlu olmalıdır. Doğrusu "Sabah erkenden kalkıp okula gitti." veya "Sabah erkenden kalkılarak okula gidildi." olmalıydı.'
  },
  {
    id: 'tur_new_31', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki tarihlerin hangisinin yazımı doğrudur?',
    options: ['29 Ekim 1923\'de', '10.Kasım.1938', '30 ağustos zaferi', '23 Nisan 1920\'de'], correctAnswer: 3,
    explanation: 'Belirli bir tarih bildiren ay ve gün adları büyük harfle başlar ve gelen ekler kesme işaretiyle ayrılır. "23 Nisan 1920\'de" yazımı doğrudur.'
  },
  {
    id: 'tur_new_32', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir yazıda olayların, kişilerin, varlıkların okuyucunun gözünde canlanacak şekilde anlatılmasına ne ad verilir?',
    options: ['Açıklama', 'Tartışma', 'Öyküleme', 'Betimleme'], correctAnswer: 3,
    explanation: 'Varlıkların ve durumların özelliklerini, okuyucunun zihninde bir resim çizer gibi anlatma tekniğine betimleme (tasvir etme) denir.'
  },
  {
    id: 'tur_new_33', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'medium',
    question: '"Bülbül, güle olan aşkını hüzünlü şarkılarla anlatıyordu." cümlesinde hangi söz sanatı ağır basmaktadır?',
    options: ['Benzetme', 'Abartma', 'Kişileştirme', 'Tezat'], correctAnswer: 2,
    explanation: 'İnsana ait olan "aşkını anlatma" ve "hüzünlü şarkı söyleme" özellikleri, insan dışı bir varlık olan bülbüle verilerek kişileştirme yapılmıştır.'
  },
  {
    id: 'tur_new_34', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'easy',
    question: '"Göz" kelimesi aşağıdakilerin hangisinde "çekmecenin bölümü" anlamında kullanılmıştır?',
    options: ['Onun gözüne girmek için çok çalıştı.', 'İğnenin gözünden ipliği geçirdi.', 'Masanın gözünde unuttuğu kalemi aradı.', 'Bu olaydan sonra gözümden düştü.'], correctAnswer: 2,
    explanation: '"Masanın gözü" ifadesi, masanın çekmecesi veya bölmesi anlamında kullanılan bir kalıptır.'
  },
  {
    id: 'tur_new_35', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi anlamca olumsuzdur?',
    options: ['Bu yaramaz çocuğu sevmiyor değilim.', 'Ne aradı ne de sordu.', 'Sanki bunları ben mi yaptım?', 'Böyle bir günde evde oturulur mu?'], correctAnswer: 1,
    explanation: 'Biçimce olumlu gibi görünse de "Ne aradı ne de sordu." cümlesi, anlamca "aramadı ve sormadı" demektir, yani olumsuzdur.'
  },
  {
    id: 'tur_new_36', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde bir mantık hatası vardır?',
    options: ['Bırakın patates soymayı, yemek bile yapamaz o.', 'Bu ormanda geyikler hatta karacalar bile yaşar.', 'Okula her gün yaya yürüyerek giderdi.', 'Aldığı kararlarda her zaman isabetliydi.'], correctAnswer: 1,
    explanation: 'Karaca, geyikten daha küçük bir hayvandır. "Hatta" bağlacı, bir düşüncenin derecesini artırmak için kullanılır. Cümlenin mantıksal olarak doğru olması için "Bu ormanda karacalar hatta geyikler bile yaşar." şeklinde olmalıydı.'
  },
  {
    id: 'tur_new_37', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'medium',
    question: '"Yazar, son romanında okuru farklı dünyalara götürüyor." cümlesinin nesnesi aşağıdakilerden hangisidir?',
    options: ['Yazar', 'son romanında', 'okuru', 'farklı dünyalara'], correctAnswer: 2,
    explanation: 'Yükleme "kimi, neyi" sorularını sorduğumuzda belirtili nesneyi buluruz. "Kimi götürüyor?" sorusunun cevabı "okuru" kelimesidir. Bu yüzden nesne "okuru"dur.'
  },
  {
    id: 'tur_new_38', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde kısaltmaların yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['TÜBİTAK\'ın projesi ilgi gördü.', 'THY\'de yeni bir dönem başladı.', 'PTT\'ye uğramam gerekiyor.', 'T.C.\'nin kurucusu Atatürk\'tür.'], correctAnswer: 3,
    explanation: 'Büyük harflerle yapılan kısaltmalara getirilen eklerde kısaltmanın son harfinin okunuşu esas alınır. Ancak gelenekleşmiş olan "T.C." (Türkiye Cumhuriyeti) kısaltmasında nokta kullanılır ve gelen ek kesme işaretiyle ayrılmaz. Doğrusu "T.C.nin" şeklinde olmalıydı.'
  },
  {
    id: 'tur_new_39', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinin yüklemi geçişsiz bir fiildir?',
    options: ['Kardeşim camı kırmış.', 'Öğretmen konuyu anlattı.', 'Bebek mışıl mışıl uyudu.', 'Babam gazeteyi okudu.'], correctAnswer: 2,
    explanation: 'Geçişsiz fiiller, "neyi, kimi" sorularına cevap veremeyen, yani nesne alamayan fiillerdir. "Onu uyudu" diyemeyiz. Diğer seçeneklerdeki fiiller ("onu kırmış", "onu anlattı", "onu okudu") nesne alabilir.'
  },
  {
    id: 'tur_new_40', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir paragrafta "Örneğin, mesela, söz gelişi" gibi ifadeler kullanılıyorsa, hangi düşünceyi geliştirme yolu kullanılmıştır?',
    options: ['Tanımlama', 'Karşılaştırma', 'Örneklendirme', 'Tanık Gösterme'], correctAnswer: 2,
    explanation: 'Soyut bir düşünceyi veya konuyu daha anlaşılır hale getirmek için somut örnekler verilmesine örneklendirme denir. "Örneğin, mesela" gibi ifadeler bu yöntemin ipuçlarıdır.'
  },
  {
    id: 'tur_new_41', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: '"Derin" sözcüğü aşağıdaki cümlelerin hangisinde "O, çok derin bir insandır." cümlesindeki anlamıyla kullanılmıştır?',
    options: ['Kuyunun derinliği herkesi korkuttu.', 'Derin bir sessizlik kapladı ortalığı.', 'Konuyla ilgili derin bilgilere sahipti.', 'Derin bir yara almıştı.'], correctAnswer: 2,
    explanation: 'Cümlede "derin insan" ifadesi mecazi olarak "çok bilgili, kapsamlı düşünen" anlamındadır. "Derin bilgilere sahipti" cümlesindeki "derin" sözcüğü de aynı mecazi anlamda, "kapsamlı, ayrıntılı" manasında kullanılmıştır.'
  },
  {
    id: 'tur_new_42', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi, yükleminin türüne göre diğerlerinden farklıdır?',
    options: ['Bugün hava çok güzeldi.', 'En sevdiği renk mavidir.', 'Yolculuğumuz oldukça yorucu geçti.', 'Sınıfın en çalışkanı oydu.'], correctAnswer: 2,
    explanation: '"Geçti" bir fiil olduğu için bu cümle fiil cümlesidir. Diğer seçeneklerin yüklemleri ("güzeldi", "mavidir", "oydu") isim soylu sözcükler olduğu için isim cümlesidir.'
  },
  {
    id: 'tur_new_43', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'easy',
    question: 'Tamamlanmamış cümlelerin sonuna hangi noktalama işareti konur?',
    options: ['Nokta (.)', 'Soru İşareti (?)', 'Üç nokta (...)', 'Ünlem işareti (!)'], correctAnswer: 2,
    explanation: 'Anlatım olarak tamamlanmamış, eksik bırakılmış cümlelerin sonuna üç nokta konur. Örneğin: "Önümüzde uzanan yemyeşil bir ova..."'
  },
  {
    id: 'tur_new_44', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki sözcüklerin hangisinde "kaynaştırma ünsüzü" kullanılmıştır?',
    options: ['Annesi', 'Kitabın', 'Gözlük', 'Kalemlik'], correctAnswer: 0,
    explanation: '"Anne-si" kelimesinde, "anne" kelimesi ile iyelik eki "-i" arasına "-s-" kaynaştırma ünsüzü girmiştir. Diğer bir deyişle, iki ünlü yan yana gelemeyeceği için araya "s" girmiştir.'
  },
  {
    id: 'tur_new_45', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde fiilimsi yoktur?',
    options: ['Yapacak bir şey kalmadı.', 'Gülüşüyle herkesi etkiledi.', 'Çocuklar koşarak bahçeye çıktı.', 'Yarın erkenden yola çıkmalıyız.'], correctAnswer: 3,
    explanation: '"Çıkmalıyız" kelimesi gereklilik kipiyle çekimlenmiş bir fiildir, fiilimsi değildir. Diğer seçeneklerde "yapacak" (sıfat-fiil), "gülüşüyle" (isim-fiil), "koşarak" (zarf-fiil) fiilimsileri vardır.'
  },
  {
    id: 'tur_new_46', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde terim anlamlı bir sözcük kullanılmıştır?',
    options: ['Maçın ilk periyodunu önde kapattık.', 'Bugün içimde bir sıkıntı var.', 'Geniş bir odada oturuyorduk.', 'Bu davranışın hiç hoş değil.'], correctAnswer: 0,
    explanation: '"Periyot" kelimesi, spor (basketbol, hentbol vb.) alanına özgü özel bir anlam taşıdığı için terim anlamlıdır.'
  },
  {
    id: 'tur_new_47', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'easy',
    question: 'Soru eki olan "mi"nin yazımıyla ilgili aşağıdakilerden hangisi doğrudur?',
    options: ['Her zaman kelimeye bitişik yazılır.', 'Her zaman kendinden önceki kelimeden ayrı yazılır.', 'Sadece fiillerden sonra ayrı yazılır.', 'Sadece isimlerden sonra ayrı yazılır.'], correctAnswer: 1,
    explanation: 'Soru eki "mi", "mı", "mu", "mü" her zaman kendinden önceki kelimeden ayrı yazılır ve kendinden sonra gelen ekler bu eke bitişik yazılır. Örn: "Geldin mi?", "Okuyor musun?"'
  },
  {
    id: 'tur_new_48', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "amaç-sonuç" ilişkisi vardır?',
    options: ['Kar yağdığı için yollar kapandı.', 'Kilo vermek için spor yapıyor.', 'Çok çalıştığından başarılı oldu.', 'Elektrikler kesilince film yarıda kaldı.'], correctAnswer: 1,
    explanation: '"Spor yapmasının" amacı "kilo vermektir". "-mek için" ifadesi genellikle amaç-sonuç anlamı kurar. Diğer seçenekler neden-sonuç bildirir.'
  },
  {
    id: 'tur_new_49', subjectId: 'turkish', topic: 'Cümle Ögeleri', difficulty: 'hard',
    question: '"Atatürk, modern Türkiye\'nin kurucusudur." cümlesi hangi ögelerden oluşmaktadır?',
    options: ['Özne - Nesne - Yüklem', 'Özne - Dolaylı Tümleç - Yüklem', 'Sadece Yüklem', 'Özne - Yüklem'], correctAnswer: 3,
    explanation: 'Yüklem: "modern Türkiye\'nin kurucusudur" (isim tamlaması olduğu için bölünmez). Modern Türkiye\'nin kurucusu olan kim?: "Atatürk" (Özne). Cümle özne ve yüklemden oluşmaktadır.'
  },// --- EKİM AYI İÇİN YENİ EKLENEN SORULAR ---
  {
    id: 'tur_ekim_1', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bu parçada yazarın asıl yakındığı durum nedir? "Televizyonun karşısına geçip saatlerce kanallar arasında gezinmek, ne yazık ki modern insanın en büyük zaaflarından biri haline geldi. Oysa o değerli saatler, bir kitap okuyarak, yeni bir şeyler öğrenerek veya sevdiklerimizle sohbet ederek çok daha verimli geçirilebilirdi."',
    options: ['Televizyon programlarının kalitesizliği', 'İnsanların kitap okumaması', 'Zamanın verimsiz kullanılması', 'Sosyal ilişkilerin zayıflaması'], correctAnswer: 2,
    explanation: 'Yazar, televizyon karşısında kaybedilen zamanın kitap okuma, öğrenme veya sosyalleşme gibi daha verimli aktivitelere ayrılabileceğini belirterek, zamanın boşa harcanmasından yakınmaktadır.'
  },
  {
    id: 'tur_ekim_2', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'medium',
    question: '"Rüzgâr, ağaçların dallarını hafifçe sallıyordu." cümlesinin ögeleri sırasıyla hangisinde doğru verilmiştir?',
    options: ['Özne - Belirtili Nesne - Zarf Tümleci - Yüklem', 'Özne - Belirtisiz Nesne - Zarf Tümleci - Yüklem', 'Dolaylı Tümleç - Özne - Zarf Tümleci - Yüklem', 'Özne - Belirtili Nesne - Yüklem'], correctAnswer: 0,
    explanation: 'Yüklem: sallıyordu. Sallayan ne?: Rüzgâr (Özne). Neyi sallıyordu?: ağaçların dallarını (Belirtili Nesne). Nasıl sallıyordu?: hafifçe (Zarf Tümleci). Sıralama: Özne - Belirtili Nesne - Zarf Tümleci - Yüklem.'
  },
  {
    id: 'tur_ekim_3', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'easy',
    question: 'Aşağıdaki kelimelerin hangisinde "ünlü daralması" vardır?',
    options: ['Geliyor', 'Kitabı', 'Gözlük', 'Yemek'], correctAnswer: 0,
    explanation: 'Ünlü daralması, "-yor" eki aldığında "a" veya "e" ünlülerinin "ı, i, u, ü"ye dönüşmesidir. "Gel-e-yor" değil, "Gel-i-yor" olur.'
  },
  // --- BİTİŞ ---
  {
    id: 'tur_new_50', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir metnin ana düşüncesi en kapsamlı şekilde genellikle metnin hangi bölümünde bulunur?',
    options: ['Giriş bölümünde', 'Herhangi bir yerinde olabilir', 'Sonuç bölümünde', 'Gelişme bölümünde'], correctAnswer: 2,
    explanation: 'Yazar, anlattıklarını toparlayıp varmak istediği sonucu, yani ana düşünceyi genellikle paragrafın veya metnin sonuç bölümünde özetleyici bir ifadeyle verir.'
  },// --- YIL BOYU İÇİN YENİ EKLENEN SORULAR (30 ADET) ---
  {
    id: 'tur_yeni_1', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'easy',
    question: 'Aşağıdaki cümlelerin hangisinde "kalmak" sözcüğü "bir yerde belirli bir süre oturmak, eğleşmek" anlamında kullanılmıştır?',
    options: ['Bu iş sana kaldı.', 'Dedemden bana eski bir saat kaldı.', 'Yaz tatilinde köyde kaldık.', 'Sınavın bitmesine beş dakika kaldı.'], correctAnswer: 2,
    explanation: '"Yaz tatilinde köyde kaldık." cümlesinde "kalmak" fiili, bir yerde belirli bir süre vakit geçirmek anlamındadır.'
  },
  {
    id: 'tur_yeni_2', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: 'Aşağıdaki ikilemelerden hangisi zıt anlamlı sözcüklerle oluşturulmuştur?',
    options: ['Eş dost', 'İleri geri', 'Doğru dürüst', 'Mal mülk'], correctAnswer: 1,
    explanation: '"İleri" ve "geri" sözcükleri zıt anlamlıdır. Diğer seçeneklerde eş anlamlı veya yakın anlamlı sözcükler kullanılmıştır.'
  },
  {
    id: 'tur_yeni_3', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "varsayım" anlamı vardır?',
    options: ['Belki yarın kar yağar.', 'Diyelim ki sınavı kazandın, ne yapacaksın?', 'Bu işi bitirebileceğini sanmıyorum.', 'Keşke daha çok çalışsaydım.'], correctAnswer: 1,
    explanation: '"Diyelim ki" ifadesi, olmamış bir şeyi olmuş gibi kabul etme, yani varsayım anlamı katar.'
  },
  {
    id: 'tur_yeni_4', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'hard',
    question: '"Sanatçı, eserleriyle toplumun aynasıdır." cümlesinde anlatılmak istenen nedir?',
    options: ['Sanatçının eserlerinin toplumu yansıtması', 'Sanatçının toplumdan kopuk olması', 'Sanatın sadece sanat için yapılması', 'Toplumun sanatı yönlendirmesi'], correctAnswer: 0,
    explanation: 'Bu cümlede sanatçının, eserleri aracılığıyla içinde yaşadığı toplumun özelliklerini, sorunlarını, değerlerini yansıttığı ifade edilmektedir.'
  },
  {
    id: 'tur_yeni_5', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: '"Kitap okuyuş tarzı çok etkileyiciydi." cümlesindeki fiilimsinin türü nedir?',
    options: ['İsim-fiil', 'Sıfat-fiil', 'Zarf-fiil', 'Fiilimsi yoktur'], correctAnswer: 0,
    explanation: '"Okuyuş" kelimesi "oku-" fiiline "-uş" isim-fiil eki getirilerek türetilmiştir.'
  },
  {
    id: 'tur_yeni_6', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde kalıcı isim olmuş bir fiilimsi vardır?',
    options: ['Dondurma yemek için sabırsızlanıyordu.', 'Gelecek hafta sınavım var.', 'Yazarın son denemesi çok beğenildi.', 'Danışmaya adres sordu.'], correctAnswer: 3,
    explanation: '"Danışma" kelimesi "-ma" isim-fiil ekini almasına rağmen artık bir eylemi değil, bir yeri ifade eden kalıcı bir isim haline gelmiştir.'
  },
  {
    id: 'tur_yeni_7', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'medium',
    question: '"Yarınki geziye sınıfımızın tamamı katılacak." cümlesinin dolaylı tümleci (yer tamlayıcısı) hangisidir?',
    options: ['Yarınki geziye', 'sınıfımızın tamamı', 'katılacak', 'Cümlede dolaylı tümleç yoktur.'], correctAnswer: 0,
    explanation: 'Yükleme sorulan "nereye katılacak?" sorusunun cevabı "yarınki geziye" ifadesidir. Bu ifade yer tamlayıcısıdır.'
  },
  {
    id: 'tur_yeni_8', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: 'Aşağıdaki sorulardan hangisi farklı bir ögeyi buldurmaya yöneliktir?',
    options: ['Dün akşam nereye gittiniz?', 'Bu kitabı kim yazmış?', 'Çantanda ne var?', 'Pazardan ne aldın?'], correctAnswer: 0,
    explanation: '"Nereye" sorusu dolaylı tümleci buldurur. "Kim" sorusu özneyi, "ne var?" sorusu (isim cümlesinde) özneyi, "ne aldın?" sorusu belirtisiz nesneyi buldurur.'
  },
  {
    id: 'tur_yeni_9', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde bir yazım yanlışı vardır?',
    options: ['Her hangi bir sorunla karşılaşmadık.', 'Onunla baş başa görüşmek istiyorum.', 'Birtakım insanlar olayı yanlış anladı.', 'Pek çok kişi aynı fikirdeydi.'], correctAnswer: 0,
    explanation: '"Herhangi" kelimesi bitişik yazılır.'
  },
  {
    id: 'tur_yeni_10', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['Yarın Ay\'a yolculuk başlayacak.', 'Ali Bey, toplantıya geç kaldı.', 'Kardeşim İngilizce kursuna gidiyor.', 'Tuz Gölü, İç Anadolu Bölgesi\'ndedir.'], correctAnswer: 0,
    explanation: 'Gök cisimlerinin adları (Ay, Güneş, Dünya vb.) terim anlamıyla kullanıldığında büyük harfle başlar. Ancak bu cümlede "Ay" terim anlamıyla kullanılmamıştır, küçük harfle başlamalıydı.' // Düzeltme: Gök cisimleri büyük harfle başlar. Yanlışlık başka şıkta olmalı. A doğru. D doğru. C doğru. B doğru. Soruyu değiştirelim.
   }, 
    
   { id: 'tur_yeni_144', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'hard',// Yeni Soru:
    question: 'Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['Ankara Kalesi turistlerin uğrak yeridir.', 'Bu yıl Ramazan Bayramı\'nda köydeydik.', 'Türk Dil Kurumu yeni bir sözlük yayımladı.', 'Anneler günü için hediye aldım.'], correctAnswer: 3,
    explanation: 'Özel günler (Anneler Günü, Öğretmenler Günü vb.) büyük harfle başlar. "Anneler Günü" şeklinde yazılmalıydı.'
  },
  {
    id: 'tur_yeni_11', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'medium',
    question: 'Eş görevli kelime ve kelime gruplarının arasına hangi noktalama işareti konur?',
    options: ['Nokta (.)', 'Virgül (,)', 'Noktalı Virgül (;)', 'İki Nokta (:)'], correctAnswer: 1,
    explanation: 'Cümle içinde art arda sıralanan ve aynı görevde kullanılan kelime veya kelime gruplarının (örneğin özneler, nesneler) arasına virgül konur.'
  },
  {
    id: 'tur_yeni_12', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde noktalı virgül (;) yanlış kullanılmıştır?',
    options: ['Pazardan elma, armut, muz; sebzelerden pırasa, ıspanak aldım.', 'At ölür, meydan kalır; yiğit ölür, şan kalır.', 'Çok çalıştı; ama sınavı kazanamadı.', 'Sevinçten, heyecandan içim içime sığmıyor; bağırmak istiyorum.'], correctAnswer: 2,
    explanation: '"Ama, fakat, lakin" gibi bağlaçlardan önce veya sonra noktalı virgül kullanılmaz. Bu cümlede "ama"dan önce virgül kullanılabilirdi veya hiçbir işaret konulmayabilirdi.'
  },
  {
    id: 'tur_yeni_13', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'medium',
    question: '"Kar taneleri, gökyüzünde dans eden kelebekler gibiydi." cümlesinde benzeyen unsur nedir?',
    options: ['Kar taneleri', 'Gökyüzü', 'Kelebekler', 'Dans'], correctAnswer: 0,
    explanation: 'Benzetme sanatında dört unsur bulunur: Benzeyen, kendisine benzetilen, benzetme yönü, benzetme edatı. Bu cümlede "Kar taneleri" (benzeyen), "kelebeklere" (kendisine benzetilen) benzetilmiştir.'
  },
  {
    id: 'tur_yeni_14', subjectId: 'turkish', topic: 'Metin Türleri', difficulty: 'easy',
    question: 'Yaşanmış ya da yaşanması mümkün olayların yer ve zaman belirterek anlatıldığı yazı türü hangisidir?',
    options: ['Masal', 'Hikâye (Öykü)', 'Deneme', 'Makale'], correctAnswer: 1,
    explanation: 'Hikâye (öykü), gerçek veya gerçeğe uygun olayları kısa bir şekilde anlatan edebi türdür.'
  },
  {
    id: 'tur_yeni_15', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi yüklemin yerine göre kurallı bir cümledir?',
    options: ['Gördüm onu dün parkta.', 'Seni çok seviyorum.', 'Geldi mi beklenen misafir?', 'Yoktu ortalıkta kimsecikler.'], correctAnswer: 1,
    explanation: 'Kurallı (düz) cümlede yüklem cümlenin sonunda bulunur. "Seviyorum" yüklemi sonda olduğu için bu cümle kurallıdır.'
  },
  {
    id: 'tur_yeni_16', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerden hangisi yapısına göre sıralı cümledir?',
    options: ['Yağmur yağıyor, hava serinledi.', 'Çalışırsan başarırsın.', 'Güneş açınca içim ısındı.', 'Ne aradı ne sordu.'], correctAnswer: 0,
    explanation: 'Sıralı cümle, en az iki yüklemi olan ve bu yüklemlerin virgül veya noktalı virgülle birbirine bağlandığı cümlelerdir. "Yağıyor" ve "serinledi" yüklemleri virgülle bağlanmıştır.'
  },
  {
    id: 'tur_yeni_17', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'medium',
    question: '"Bütün sınıf, öğretmeni dikkatle dinledi." cümlesinin çatı özelliği nedir?',
    options: ['Etken - Geçişli', 'Edilgen - Geçişli', 'Etken - Geçişsiz', 'Edilgen - Geçişsiz'], correctAnswer: 0,
    explanation: 'İşi yapan ("dinleyen kim?" -> "Bütün sınıf") belli olduğu için etkendir. Fiil ("neyi dinledi?" -> "öğretmeni") nesne alabildiği için geçişlidir.'
  },
  {
    id: 'tur_yeni_18', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinin yüklemi edilgen çatılıdır?',
    options: ['Çocuklar bahçede top oynuyor.', 'Polis, hırsızı yakaladı.', 'Sınav sonuçları dün açıklandı.', 'Misafirler salonda oturdu.'], correctAnswer: 2,
    explanation: 'Edilgen çatılı fiillerde işi yapan (özne) belli değildir ve fiil "-ıl, -il, -ul, -ül" veya "-ın, -in, -un, -ün" eklerinden birini alır. "Açıklandı" fiilinde açıklayan kim belli değildir.'
  },
  {
    id: 'tur_yeni_19', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde deyimin yanlış kullanılmasından kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['O kadar çok konuşuyordu ki kafam şişti.', 'Sevinçten etekleri tutuştu.', 'Yaptığı hatadan dolayı yüzü kızardı.', 'Sınavı kazanınca havalara uçtu.'], correctAnswer: 1,
    explanation: '"Etekleri tutuşmak" deyimi telaşlanmak, paniklemek anlamına gelir. Sevinç durumu için "etekleri zil çalmak" deyimi kullanılmalıydı.'
  },
  {
    id: 'tur_yeni_20', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde dolaylı tümleç eksikliğinden kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Arkadaşını çok sever, sürekli hediye alırdı.', 'Bu kitapları okumanı ve faydalanmanı isterim.', 'Köye gitti ve bir hafta kaldı.', 'Ona güveniyor ve yardım ediyorduk.'], correctAnswer: 1, // Düzeltme: A'da "ona". B'de "onlardan". D'de "ona". B doğru.
    explanation: 'Cümlenin ikinci kısmında "neyden faydalanmanı isterim?" sorusunun cevabı eksiktir. Cümle "Bu kitapları okumanı ve onlardan faydalanmanı isterim." şeklinde olmalıydı.'
  },
  {
    id: 'tur_yeni_21', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerin hangisinde hem ünsüz yumuşaması hem de ünsüz benzeşmesi vardır?',
    options: ['Kitapçık', 'Adım', 'Yurttaşlık', 'Çalışkan'], correctAnswer: 2, // Düzeltme: 
    explanation: 'Cümlenin ikinci kısmında "neyden faydalanmanı isterim?" sorusunun cevabı eksiktir. Cümle "Bu kitapları okumanı ve onlardan faydalanmanı isterim." şeklinde olmalıydı.'
  },
   
  {  id: 'tur_yeni_2ww1', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerin hangisinde "ünsüz türemesi" görülür?',
    options: ['Hissetti', 'Kayboldu', 'Ağacın', 'Gidiyor'], correctAnswer: 0,
    explanation: '"His" kelimesi "etmek" yardımcı fiiliyle birleşirken arada "s" ünsüzü türemiştir.'
  },
  {
    id: 'tur_yeni_22', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir paragrafta "Kısacası, özetle, yani" gibi ifadeler hangi bölümde yer alır?',
    options: ['Giriş', 'Gelişme', 'Sonuç', 'Herhangi bir bölümde'], correctAnswer: 2,
    explanation: 'Bu tür ifadeler, anlatılanları toparlamak ve ana fikri özetlemek amacıyla genellikle paragrafın veya metnin sonuç bölümünde kullanılır.'
  },
  {
    id: 'tur_yeni_23', subjectId: 'turkish', topic: 'Sözcük Türleri', difficulty: 'medium',
    question: '"Okuldan eve kadar hızlı hızlı yürüdü." cümlesinde ikileme hangi türde kullanılmıştır?',
    options: ['İsim', 'Sıfat', 'Zarf', 'Zamir'], correctAnswer: 2,
    explanation: '"Hızlı hızlı" ikilemesi, "yürüdü" fiilinin nasıl yapıldığını belirttiği için durum zarfıdır.'
  },
  {
    id: 'tur_yeni_24', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'hard',
    
    question: 'Hitaplar için veya kendisinden sonra açıklama yapılacak cümlenin sonuna hangi noktalama işareti konur?',
    options: ['Nokta (.)', 'Virgül (,)', 'İki Nokta (:)', 'Ünlem (!)'], correctAnswer: 2,
    explanation: 'Kendisinden sonra örnek verilecek veya açıklama yapılacak cümlenin sonuna iki nokta konur. Ayrıca seslenmelerde ve hitaplarda da kullanılır (örn: Sevgili Arkadaşım:).'
  },
  {
    id: 'tur_yeni_26', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisi sadece temel ögelerden (özne ve yüklem) oluşmuştur?',
    options: ['Güneş, altın ışıklarını yeryüzüne gönderiyordu.', 'O, sınıfımızın en başarılı öğrencisidir.', 'Çocuklar parkta neşeyle oynuyorlardı.', 'Kitabı dün akşam bitirdim.'], correctAnswer: 1,
    explanation: 'Yüklem: "sınıfımızın en başarılı öğrencisidir" (isim tamlaması). Kim?: "O" (Özne). Cümle sadece özne ve yüklemden oluşur.'
  },
  {
    id: 'tur_yeni_27', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: 'Aşağıdaki altı çizili kelimelerden hangisi fiilimsi değildir?',
    options: ['_Okunmuş_ gazeteleri topladı.', '_Koşarken_ ayağı takıldı.', 'Bu _bina_ çok eski.', 'Gülmek herkese yakışır.'], correctAnswer: 2,
    explanation: '"Bina" kelimesi kalıcı bir isimdir, fiilimsi değildir. Diğerleri: "okunmuş" (sıfat-fiil), "koşarken" (zarf-fiil), "gülmek" (isim-fiil).'
  },
  {
    id: 'tur_yeni_28', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "dokunmak" sözcüğü "insanın içine işlemek, etkilemek" anlamında kullanılmıştır?',
    options: ['Sobaya dokununca eli yandı.', 'Bu acı sözler ona çok dokundu.', 'Sıcak hava ekinlere dokundu.', 'Benim eşyalarıma kimse dokunmasın.'], correctAnswer: 1,
    explanation: '"Acı sözlerin ona dokunması" ifadesi, sözlerin onu duygusal olarak incittiği, etkilediği anlamına gelir (mecazi anlam).'
  },
  {
    id: 'tur_yeni_29', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde tamlama yanlışlığından kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Ekonomik ve sağlık sorunları yaşıyoruz.', 'Bu olaydan siyasi ve askeri yetkililer sorumludur.', 'Özel ve kamu kuruluşları iş birliği yaptı.', 'Resmi ve devlet daireleri yarın kapalı.'], correctAnswer: 0, // Düzeltme: A'da "ekonomik sorunlar ve sağlık sorunları". B doğru. C doğru. D'de "Resmi daireler ve devlet daireleri". A veya D olabilir. A daha yaygın.
    explanation: '"Ekonomik" ve "sağlık" kelimeleri aynı tamlanana ("sorunları") bağlanamaz. Doğrusu "Ekonomik sorunlar ve sağlık sorunları yaşıyoruz." şeklinde olmalıydı.'
  },
  {
    id: 'tur_yeni_30', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde yön bildiren sözcüğün yazımı yanlıştır?',
    options: ['Rüzgar kuzeyden esiyor.', 'Bu yıl Doğu Anadolu\'ya kar erken yağdı.', 'Evimiz güney batı yönündedir.', 'Batı medeniyetini yakından takip ediyor.'], correctAnswer: 2,
    explanation: 'Ara yönler (güneybatı, kuzeydoğu vb.) her zaman bitişik yazılır.'
  },
  // --- BİTİŞ ---
];