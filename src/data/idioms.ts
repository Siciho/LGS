// src/data/idioms.ts

export interface Idiom {
  id: number;
  idiom: string;
  meaning: string;
  hint: string;
  distractors: string[];
}

export const idioms: Idiom[] = [
  {
    id: 1,
    idiom: "Etekleri zil çalmak",
    meaning: "Çok sevinmek, büyük bir sevinç ve coşku içinde olmak.",
    hint: "LGS denemesinden tam puan aldığını duyunca...",
    distractors: [
      "Çok sinirlenmek, öfkeden deliye dönmek.",
      "Korkudan ne yapacağını bilememek.",
      "Bir işten dolayı bıkkınlık ve usanç duymak."
    ]
  },
  {
    id: 2,
    idiom: "Göz boyamak",
    meaning: "Kandırmak, yanıltmak amacıyla bir şeyi iyi veya kötü göstererek aldatmak.",
    hint: "Vitrinleri süsleyerek ve yapay ışıklar kullanarak müşterilerin...",
    distractors: [
      "Bir konuyu ayrıntılarıyla incelemek.",
      "Başkalarının saygısını ve sevgisini kazanmak.",
      "Göz sağlığına dikkat etmemek."
    ]
  },
  {
    id: 3,
    idiom: "Ağzı açık kalmak",
    meaning: "Çok şaşırmak, şaşkınlıktan ne yapacağını bilememek.",
    hint: "Sihirbazın yaptığı numaraları görünce çocukların...",
    distractors: [
      "Çok konuşup çevresindekileri rahatsız etmek.",
      "Sır saklamayı beceremeyip her şeyi anlatmak.",
      "Çok acıkıp hemen yemek istemek."
    ]
  },
  {
    id: 4,
    idiom: "Abayı yakmak",
    meaning: "Birine gönül vermek, aşırı derecede aşık olmak.",
    hint: "Mahalledeki o kıza uzun zamandır...",
    distractors: [
      "Eski elbiselerini yakıp yenilerini almak.",
      "Çok üşüyüp kalın giysiler aramak.",
      "Bir hata yapıp cezalandırılmaktan korkmak."
    ]
  },
  {
    id: 5,
    idiom: "Bal dök yala",
    meaning: "Bir yerin çok temiz, pırıl pırıl ve düzenli olması.",
    hint: "Annem evi öyle bir temizlemiş ki, odalar adeta...",
    distractors: [
      "Yemeklerin çok lezzetli ve tatlı olması.",
      "Birinin çok tatlı dilli ve ikna edici olması.",
      "Zenginlik içinde lüks bir hayat yaşamak."
    ]
  },
  {
    id: 6,
    idiom: "Bin dereden su getirmek",
    meaning: "Birini kandırmak veya bir işi yapmamak için pek çok bahane ileri sürmek.",
    hint: "Ödevini yapmadığı için öğretmenine açıklama yaparken...",
    distractors: [
      "Çok çalışıp büyük bir başarı elde etmek.",
      "Uzak yerlerden su taşıyarak tarım yapmak.",
      "Bir sorunu çözmek için tüm yolları denemek."
    ]
  },
  {
    id: 7,
    idiom: "Burun kıvırmak",
    meaning: "Bir şeyi beğenmeyip küçümsemek, değer vermemek.",
    hint: "Kendisine sunulan güzelim fırsata hiç düşünmeden...",
    distractors: [
      "Koku alma duyusunu kaybetmek.",
      "Çok soğuk havada yüzünü gizlemek.",
      "Birinden çekinip onunla konuşmaktan kaçınmak."
    ]
  },
  {
    id: 8,
    idiom: "Çam devirmek",
    meaning: "Başkalarını kıracak, üzecek veya pot kıracak sözleri farkında olmadan söylemek.",
    hint: "Müdürün yanında eski hatalardan bahsederek yine büyük bir...",
    distractors: [
      "Ormandaki ağaçları kesip zarar vermek.",
      "Büyük bir işi başarıyla sonuçlandırmak.",
      "Sözünde durmayıp insanları yarı yolda bırakmak."
    ]
  },
  {
    id: 9,
    idiom: "Dili damağı kurumak",
    meaning: "Çok susamak veya aşırı heyecan ve korkudan konuşamaz hale gelmek.",
    hint: "Sıcak havada saatlerce yürüyünce susuzluktan...",
    distractors: [
      "Hastalanıp konuşma yeteneğini kaybetmek.",
      "Çok acı bir şey yiyip rahatsız olmak.",
      "Söyleyecek söz bulamayıp sessiz kalmak."
    ]
  },
  {
    id: 10,
    idiom: "Göze girmek",
    meaning: "Davranışları veya başarısıyla birinin sevgi, takdir ve güvenini kazanmak.",
    hint: "Son projede gösterdiği üstün performansla yöneticisinin...",
    distractors: [
      "Birine fark ettirmeden gizlice bakmak.",
      "Görme bozukluğu yaşamaya başlamak.",
      "Kıskançlık krizine girip başkasına zarar vermek."
    ]
  },
  {
    id: 11,
    idiom: "Gözden düşmek",
    meaning: "Daha önce duyulan sevgi, güven ve rağbeti davranışları nedeniyle kaybetmek.",
    hint: "Sürekli yalan söylediği ortaya çıkınca arkadaşlarının...",
    distractors: [
      "Ağlarken gözyaşlarını tutamamak.",
      "Uykusuzluktan dolayı göz kapakları ağırlaşmak.",
      "Fark edilmeyen gizli bir tehlikeyle karşılaşmak."
    ]
  },
  {
    id: 12,
    idiom: "Kulak kabartmak",
    meaning: "Belli etmemeye çalışarak gizlice dinlemek.",
    hint: "Yan odada konuşulan dedikodulara engel olamayıp...",
    distractors: [
      "Kulak tıkacı kullanıp sesleri duymamak.",
      "Birinin sözünü kesip kendi fikrini söylemek.",
      "Yüksek sesle müzik dinlemek."
    ]
  },
  {
    id: 13,
    idiom: "Kulak ardı etmek",
    meaning: "Gereken önemi vermemek, dinlememek, savsaklamak.",
    hint: "Doktorun uyarılarını sürekli olarak...",
    distractors: [
      "Gizli sırları başkasına fısıldamak.",
      "Kulak arkasındaki bir rahatsızlığı önemsemek.",
      "Bir şeyi çok dikkatli bir şekilde dinlemek."
    ]
  },
  {
    id: 14,
    idiom: "Küplere binmek",
    meaning: "Çok öfkelenmek, aşırı derecede kızıp sinirlenmek.",
    hint: "Vazonun kırıldığını görünce babam adeta...",
    distractors: [
      "Kendi kendine eğlenip neşeli olmak.",
      "Büyük bir eşyanın üzerine çıkıp oynamak.",
      "Eski antika küpleri toplayıp biriktirmek."
    ]
  },
  {
    id: 15,
    idiom: "Sinek avlamak",
    meaning: "İş yerinde veya dükkanda müşterinin olmaması, boş ve işsiz kalmak.",
    hint: "Yeni açılan mağaza yüksek fiyatlar yüzünden günlerdir...",
    distractors: [
      "Doğayı ve böcekleri inceleyen bir araştırmacı olmak.",
      "Çok titiz olup evdeki sinekleri temizlemek.",
      "Gereksiz detaylarla uğraşıp vakit kaybetmek."
    ]
  },
  {
    id: 16,
    idiom: "Tepesi atmak",
    meaning: "Birdenbire çok kızmak, sabrı tükenip öfkelenmek.",
    hint: "Sözünün kesilmesine dayanamayıp birden...",
    distractors: [
      "Yüksek bir yerden aşağıya doğru atlamak.",
      "Aklına harika bir fikir veya çözüm gelmek.",
      "Baş dönmesi veya tansiyon düşüklüğü yaşamak."
    ]
  },
  {
    id: 17,
    idiom: "Yaka silkmek",
    meaning: "Bıkmak, usanmak, artık dayanamayacak hale gelip bezmek.",
    hint: "Onun bu bitmek bilmeyen şikayetlerinden herkes...",
    distractors: [
      "Elbisesinin yakasını temizleyip düzeltmek.",
      "Birine karşı saygısını göstermek için eğilmek.",
      "Çok gururlu ve kibirli bir şekilde davranmak."
    ]
  },
  {
    id: 18,
    idiom: "Ağzı kulaklarına varmak",
    meaning: "Çok sevinmek, mutluluktan yüzü gülmek.",
    hint: "Sınavı kazandığını öğrenince sevinçten...",
    distractors: [
      "Yüksek sesle gülüp herkesi güldürmek.",
      "Çok konuşmaktan çenesi yorulmak.",
      "Kulaklarında duyma kaybı hissetmek."
    ]
  },
  {
    id: 19,
    idiom: "Can kulağıyla dinlemek",
    meaning: "Büyük bir dikkatle, hiçbir şeyi kaçırmadan dinlemek.",
    hint: "Öğretmenin sınavda çıkacak dediği konuları tüm sınıf...",
    distractors: [
      "Müzik dinlerken uyuya kalmak.",
      "Gürültülü bir ortamda duymaya çalışmak.",
      "Birinin sözlerini önemsemeden dinlermiş gibi yapmak."
    ]
  },
  {
    id: 20,
    idiom: "Göz yummak",
    meaning: "Kusurları, hataları veya uygunsuz durumları görmezlikten gelmek, müsamaha göstermek.",
    hint: "Kardeşinin yaptığı yaramazlıklara bu seferlik...",
    distractors: [
      "Uykusu geldiği için gözlerini kapatmak.",
      "Bir tehlike karşısında korkup kaçmak.",
      "Görme yeteneğini korumak için önlem almak."
    ]
  },
  {
    id: 21,
    idiom: "Hapı yutmak",
    meaning: "Kötü bir duruma düşmek, cezalandırılmaktan veya zarar görmekten kurtulamamak.",
    hint: "Ödev dosyasını evde unuttuğunu fark edince...",
    distractors: [
      "Hastalanınca doktorun verdiği ilacı içmek.",
      "Büyük bir fırsatı değerlendirip zengin olmak.",
      "Yemek yerken boğazına bir şey kaçmak."
    ]
  },
  {
    id: 22,
    idiom: "İğneyle kuyu kazmak",
    meaning: "Yetersiz araçlarla, çok yavaş ve sabır isteyerek zor bir işi başarmaya çalışmak.",
    hint: "Bu devasa veritabanını tek tek kontrol etmek adeta...",
    distractors: [
      "Ufak tefek işlerle büyük kazançlar sağlamak.",
      "Kuyu açarak su kaynağı bulmaya çalışmak.",
      "Tehlikeli işlere gözü kapalı atılmak."
    ]
  },
  {
    id: 23,
    idiom: "Kafa patlatmak",
    meaning: "Bir konu üzerinde çok yoğun bir şekilde düşünmek, zihin yormak.",
    hint: "Bu zor matematik sorusunu çözebilmek için saatlerce...",
    distractors: [
      "Çok gürültülü bir ortamda başı ağrımak.",
      "Kafasını sert bir yere çarpıp yaralanmak.",
      "Gereksiz işlerle uğraşıp vaktini ziyan etmek."
    ]
  },
  {
    id: 24,
    idiom: "Nabız yoklamak",
    meaning: "Eğilimleri, düşünceleri veya niyetleri anlamaya çalışmak.",
    hint: "Yeni teklifi sunmadan önce ortakların...",
    distractors: [
      "Doktorun hastanın kalp atışını kontrol etmesi.",
      "Birini korkutarak ondan bilgi sızdırmak.",
      "Spor yaparken kalp ritmini ölçmek."
    ]
  },
  {
    id: 25,
    idiom: "Paçaları sıvamak",
    meaning: "Bir işe başlamak için hazırlık yapıp kararlıca girişmek.",
    hint: "Bahçe temizliği yapmak için sabah erkenden...",
    distractors: [
      "Derenin içinden geçerken pantolonunu korumak.",
      "Zor bir durumdan kaçmak için fırsat kollamak.",
      "Bir hatayı örtbas etmeye çalışmak."
    ]
  },
  {
    id: 26,
    idiom: "Sırtı yere gelmemek",
    meaning: "Güçlü olmak, sarsılmamak, yenilgiye uğramamak.",
    hint: "Bu disiplinle çalışmaya devam ederse onun asla...",
    distractors: [
      "Çok yorulup dinlenmek için uzanamamak.",
      "Sırt ağrılarından dolayı rahatsız olmak.",
      "Her zaman başkalarının yardımına muhtaç kalmak."
    ]
  },
  {
    id: 27,
    idiom: "Tereyağından kıl çeker gibi",
    meaning: "Çok kolay, pürüzsüz ve hiç kimseye zarar vermeden bir işi halletmek.",
    hint: "Bu zor anlaşmayı kimseyi kırmadan, adeta...",
    distractors: [
      "Yemek yaparken çok titiz davranmak.",
      "Çok yavaş ve verimsiz çalışmak.",
      "Zoraki yapılan ve sıkıcı olan işleri belirtmek."
    ]
  },
  {
    id: 28,
    idiom: "İpe un sermek",
    meaning: "İşi yapmamak için birtakım geçersiz bahaneler ve engeller uydurmak.",
    hint: "Kendisine verilen her görevde bir bahane bulup...",
    distractors: [
      "Unu temiz iplerin üzerine serip kurutmak.",
      "Bir işi mükemmel ve eksiksiz yapmak.",
      "Başkalarının emeğini küçümseyip değer vermemek."
    ]
  },
  {
    id: 29,
    idiom: "İnce eleyip sık dokumak",
    meaning: "Bir şeyi en ince ayrıntılarına kadar incelemek, çok titiz davranmak.",
    hint: "Ev satın almadan önce tüm detayları...",
    distractors: [
      "Kumaş dokuma işinde ustalaşmak.",
      "Hızlıca karar verip ayrıntıları önemsememek.",
      "Yemekleri süzgeçten geçirerek temizlemek."
    ]
  },
  {
    id: 30,
    idiom: "Dostlar alışverişte görsün",
    meaning: "Gösteriş olsun diye, iş yapıyor gibi görünmek amacıyla iş yapmak.",
    hint: "Sırf laf olmasın diye yapılan bu yardımlar adeta...",
    distractors: [
      "Arkadaşlarıyla birlikte mağazaları dolaşmak.",
      "Ticaret yaparak büyük kazançlar elde etmek.",
      "Dostlarına pahalı hediyeler alıp onları mutlu etmek."
    ]
  },
  {
    id: 31,
    idiom: "Ağzında bakla ıslanmamak",
    meaning: "Sır saklayamamak, duyduğu bir şeyi hemen başkalarına anlatmak.",
    hint: "Ona güvenip hiçbir şey söyleme çünkü onun...",
    distractors: [
      "Çok obur olup sürekli yemek yemek istemek.",
      "Konuşurken kelimeleri yuvarlayıp anlaşılmaz konuşmak.",
      "Birini sürekli susturmaya çalışmak."
    ]
  },
  {
    id: 32,
    idiom: "Akla karayı seçmek",
    meaning: "Bir işi başarıncaya kadar çok güçlük çekmek, büyük sıkıntılarla karşılaşmak.",
    hint: "Bu sınavı kazanıp yerleşene kadar adeta...",
    distractors: [
      "Zıt kavramları birbirinden ayırt etmek.",
      "Çok kararsız kalıp hiçbir şey seçememek.",
      "Zengin ve fakir arasındaki farkı gözetmek."
    ]
  },
  {
    id: 33,
    idiom: "Ayak sürümek (sürümek)",
    meaning: "Bir işi yapmamak için direnmek veya ağırdan almak, geciktirmek.",
    hint: "Verilen yeni görevi yapmamak için günlerdir...",
    distractors: [
      "Yürürken ayaklarını yere sürtüp ses çıkarmak.",
      "Çok yorgunluktan adım atacak gücü kalmamak.",
      "Birinin izinden gidip onu taklit etmek."
    ]
  },
  {
    id: 34,
    idiom: "Göz kulak olmak",
    meaning: "Bir şeyi veya bir kimseyi korumak, gözetmek ve kollamak.",
    hint: "Ben pazara gidene kadar kardeşine...",
    distractors: [
      "Duyma ve görme duyularını aynı anda kullanmak.",
      "Birinin gizli sırlarını öğrenmeye çalışmak.",
      "Başkalarının işine gereksizce karışmak."
    ]
  },
  {
    id: 35,
    idiom: "İçi içine sığmamak",
    meaning: "Aşırı sevinç, coşku veya heyecandan ötürü yerinde duramamak.",
    hint: "LGS sonuçlarının açıklanacağını öğrenen öğrencinin...",
    distractors: [
      "Çok kilo alıp kıyafetlerine sığamamak.",
      "Karın ağrısı veya mide rahatsızlığı çekmek.",
      "Kendi düşüncelerini kimseyle paylaşmak istememek."
    ]
  },
  {
    id: 36,
    idiom: "Kabına sığmamak",
    meaning: "Coşku, heyecan veya sabırsızlıktan ötürü duygularını engelleyememek, taşkınlık yapmak.",
    hint: "Şampiyonluk kupasını kaldırınca futbolcular...",
    distractors: [
      "Kap kacak ölçülerini aşacak kadar yemek yapmak.",
      "Çok sinirlenip etrafındaki eşyaları kırmak.",
      "Bir yere ait olduğunu hissedememek."
    ]
  },
  {
    id: 37,
    idiom: "Sudan çıkmış balığa dönmek",
    meaning: "Yeni ve yabancı bir ortama girince ne yapacağını bilemeyip şaşkınlık ve acemilik çekmek.",
    hint: "Köyden büyük şehre ilk geldiğinde adeta...",
    distractors: [
      "Çok susuz kalıp nefes almakta zorlanmak.",
      "Bir tehlikeyi ucuz atlatıp rahat bir nefes almak.",
      "Çok iyi yüzmeyi bildiği için gururlanmak."
    ]
  },
  {
    id: 38,
    idiom: "Açık kapı bırakmak",
    meaning: "Son kararı vermeyip, anlaşma veya uzlaşma için uygun bir pay bırakmak.",
    hint: "Teklifi reddetti ama görüşmeler için yine de...",
    distractors: [
      "Evden çıkarken hırsız girmesin diye kapıyı kilitlememek.",
      "Sırlarını herkesin duyabileceği şekilde açıklamak.",
      "Bir tehlikeye karşı savunmasız durumda kalmak."
    ]
  },
  {
    id: 39,
    idiom: "Kendini paralamak",
    meaning: "Bir işi başarmak için aşırı çaba sarf etmek, kendini çok yormak.",
    hint: "Hedeflerine ulaşabilmek için günlerdir...",
    distractors: [
      "Öfkeden elbiselerini yırtıp kendine zarar vermek.",
      "Paralarını gereksiz şeyler için çarçur etmek.",
      "Çok bencilce davranıp sadece kendini düşünmek."
    ]
  },
  {
    id: 40,
    idiom: "Kendini harap etmek",
    meaning: "Aşırı derece üzülmek, dertlenmek ve bu yüzden yıpranmak.",
    hint: "Daha yolun başında başarısızlık korkusuyla...",
    distractors: [
      "Evini veya odasını bilerek dağıtıp bozmak.",
      "Zorlu bir spor antrenmanında aşırı yorulmak.",
      "Kötü alışkanlıklar edinip sağlığını bozmak."
    ]
  },
  {
    id: 41,
    idiom: "Kendini yiyip bitirmek",
    meaning: "Sürekli endişelenip dert edinmek, içten içe kendini yıpratmak.",
    hint: "Sınav kaygısı yüzünden haftalardır...",
    distractors: [
      "Çok diyet yapıp aşırı derecede zayıflamak.",
      "Yemek yapmayı bilmediği için hazır gıdalarla beslenmek.",
      "Başkalarının dedikodularına çok fazla odaklanmak."
    ]
  },
  {
    id: 42,
    idiom: "Kendini kaybetmek",
    meaning: "Heyecandan, öfkeden veya baygınlıktan ötürü iradesini ve ne yaptığını bilemeyecek duruma gelmek.",
    hint: "En sevdiği şarkı çalınca konserde adeta...",
    distractors: [
      "Karanlık bir ormanda yönünü bulamayarak kaybolmak.",
      "Hafızasını kaybedip kim olduğunu unutmak.",
      "Kendi çıkarlarını korumayı becerememek."
    ]
  },
  {
    id: 43,
    idiom: "Yere göğe sığdıramamak",
    meaning: "Çok beğenmek, çok övmek, kendisine aşırı derecede değer verdiğini göstermek.",
    hint: "Yeni aldığı arabayı herkese ballandıra ballandıra anlatıyor, adeta...",
    distractors: [
      "Bir yerin çok geniş ve ferah olduğunu belirtmek.",
      "Bir eşyayı koyacak yer bulamayıp sıkıntı yaşamak.",
      "Başkalarının başarısını kıskanıp küçümsemek."
    ]
  },
  {
    id: 44,
    idiom: "Canını dişine takmak",
    meaning: "Her türlü tehlikeyi, zorluğu göze alarak büyük bir çaba ile çalışmak.",
    hint: "Ailesini geçindirebilmek ve borçları ödemek için gece gündüz...",
    distractors: [
      "Çok sinirlenip dişlerini sıkmak.",
      "Tehlikeli bir işe girmekten korkup kaçmak.",
      "Kendi sağlığına hiç dikkat etmeyip hastalanmak."
    ]
  },
  {
    id: 45,
    idiom: "Aba altından değnek göstermek",
    meaning: "Sakin, yumuşak görünmekle birlikte üstü kapalı bir şekilde korkutmak, gözdağı vermek.",
    hint: "Tatlı bir dille konuşuyordu ama sözleriyle adeta...",
    distractors: [
      "Yardıma muhtaç kişilere gizlice destek olmak.",
      "Kendi gücünü herkesin önünde açıkça sergilemek.",
      "Haksızlığa karşı çıkıp dürüstçe mücadele etmek."
    ]
  },
  {
    id: 46,
    idiom: "Ağırdan almak",
    meaning: "Bir işi yapmada isteksiz davranmak, yavaş hareket etmek ve geciktirmek.",
    hint: "Temizlik yapma sırası ona gelince işi sürekli...",
    distractors: [
      "Ağır yükleri taşımakta zorlanmak.",
      "Bir konuyu çok detaylı ve derinlemesine düşünmek.",
      "Başkalarının fikirlerine çok fazla önem vermek."
    ]
  },
  {
    id: 47,
    idiom: "Açığa vurmak",
    meaning: "Gizli olan bir şeyi herkese duyurmak, açıklamak, sırrı ifşa etmek.",
    hint: "İçindeki o büyük heyecanı daha fazla saklayamayıp...",
    distractors: [
      "Bir eşyayı dışarıya, açık alana bırakmak.",
      "Çok sinirlenip kontrolünü kaybetmek.",
      "Yeni bir işe büyük yatırımlar yapmak."
    ]
  },
  {
    id: 48,
    idiom: "Faka basmak",
    meaning: "Tuzağa düşmek, aldatılmak, oyuna getirilmek.",
    hint: "Ucuz reklam ilanlarına inanıp alışveriş yapınca...",
    distractors: [
      "Ayağı kayıp sert bir şekilde yere düşmek.",
      "Bir işte çok başarılı olup ödül kazanmak.",
      "Planlı bir şekilde hareket edip hedefe ulaşmak."
    ]
  },
  {
    id: 49,
    idiom: "Yüzüne gözüne bulaştırmak",
    meaning: "Yapılması gereken bir işi beceriksizlik yüzünden berbat etmek, başaramamak.",
    hint: "Basit bir sunum hazırlığı yapacakken işi...",
    distractors: [
      "Temizlik yaparken her tarafı toz içinde bırakmak.",
      "Çok utanıp yüzünün kızarmasına engel olamamak.",
      "Başkalarının işine karışıp ortalığı karıştırmak."
    ]
  },
  {
    id: 50,
    idiom: "Altından kalkmak",
    meaning: "Zor, karmaşık veya ağır bir işi başarıyla tamamlamak, üstesinden gelmek.",
    hint: "Bu kadar yoğun sınav hazırlık programının tek başına...",
    distractors: [
      "Ağır bir yükün altında kalıp ezilmek.",
      "Bir sorunu çözmek için başkalarından yardım istemek.",
      "İşleri erteleyip son dakikaya bırakmak."
    ]
  },
  {
    id: 51,
    idiom: "Ayağına üşenmemek",
    meaning: "Bir işi yapmak veya bir yere gitmek için üşenmeyip çaba harcamak.",
    hint: "Bizimle görüşmek için şehrin öbür ucundan...",
    distractors: [
      "Yürümekten nefret edip sürekli araç kullanmak.",
      "Tembellik edip gün boyu hiçbir iş yapmamak.",
      "Ayak sağlığına dikkat edip rahat ayakkabılar giymek."
    ]
  },
  {
    id: 52,
    idiom: "Başının çaresine bakmak",
    meaning: "Kendi sorununu başkalarının yardımı olmadan kendi imkanlarıyla çözmek.",
    hint: "Bu zor durumda kimse yardım etmeyince artık...",
    distractors: [
      "Hastalanığında hemen bir doktora başvurmak.",
      "Kendi hatalarını başkalarının üzerine atmak.",
      "Sürekli dert yanarak çevresindekileri bıktırmak."
    ]
  },
  {
    id: 53,
    idiom: "Kirişe asılmak",
    meaning: "Var gücüyle çalışmak, tüm enerjisini bir işe vermek.",
    hint: "Sınava son iki ay kala tüm gücümüzle...",
    distractors: [
      "Spor yaparken barfiks demirine asılı kalmak.",
      "İnşaatta kullanılan ahşap kirişleri sabitlemek.",
      "İşten kaytarmak için bahaneler aramak."
    ]
  },
  {
    id: 54,
    idiom: "Çile çekmek",
    meaning: "Büyük sıkıntı, üzüntü ve zorluklara katlanmak.",
    hint: "Bu başarıyı elde edene kadar yıllarca...",
    distractors: [
      "Uzun bir yolculukta otobüsün bozulmasıyla beklemek.",
      "İplik veya yün çilesini düzgünce sarmaya çalışmak.",
      "Arkadaşlarıyla küçük tartışmalar yaşamak."
    ]
  },
  {
    id: 55,
    idiom: "Rahata ermek / kavuşmak",
    meaning: "Sıkıntı, dert veya zor günlerin ardından huzura, bolluğa ulaşmak.",
    hint: "Borçlarını tamamen ödeyip bitirince nihayet...",
    distractors: [
      "İşten ayrılıp gün boyu tembellik yapmak.",
      "Tatile gidip birkaç gün dinlenmek.",
      "Sorumluluklarından kaçıp hiçbir şeyle ilgilenmemek."
    ]
  },
  {
    id: 56,
    idiom: "Taviz vermemek",
    meaning: "Kararlarından, prensiplerinden veya haklarından asla ödün vermemek.",
    hint: "Disiplinli ders çalışma planından en ufak bir...",
    distractors: [
      "Başkanın isteklerine boyun eğip boyun bükmek.",
      "Kararsız kalıp sürekli fikir değiştirmek.",
      "Arkadaşlarına karşı çok yumuşak davranmak."
    ]
  },
  {
    id: 57,
    idiom: "Pes etmek",
    meaning: "Zorluklar karşısında dayanamayıp mücadeleyi bırakmak, teslim olmak.",
    hint: "Sorular ne kadar zor olursa olsun asla...",
    distractors: [
      "Oyunda hile yapıp rakiplerini yenmeye çalışmak.",
      "Çok yorulup kısa bir mola vermek.",
      "Başkalarının yardım teklifini kabul etmek."
    ]
  },
  {
    id: 58,
    idiom: "Yenik düşmek",
    meaning: "Bir güce, duyguya veya duruma karşı koyamayarak yenilmek, mağlup olmak.",
    hint: "Sınav esnasında heyecanına ve stresine...",
    distractors: [
      "Bir yarışmada sonuncu olmak.",
      "Arkadaşıyla yaptığı maçı kaybetmek.",
      "Sorumluluklarını zamanında yerine getirmemek."
    ]
  },
  {
    id: 59,
    idiom: "Göğüs germek",
    meaning: "Zorluklara, sıkıntılara karşı dayanmak, direnç göstermek ve katlanmak.",
    hint: "Karşılaştığı tüm zorluklara ailesi için...",
    distractors: [
      "Spor yaparken göğüs kaslarını geliştirmek.",
      "Tehlikeli bir duruma karşı önlem almadan atılmak.",
      "Kendini ilgilendirmeyen işlerde ön plana çıkmak."
    ]
  },
  {
    id: 60,
    idiom: "Gözden kaçırmak",
    meaning: "Dikkatsizlik yüzünden bir şeyi fark etmemek, görememek veya atlamak.",
    hint: "Kitaptaki yazım hatalarını hızlıca okurken...",
    distractors: [
      "Bir şeyi gizlice saklayıp kaybetmek.",
      "Görme yetisinde anlık bir azalma hissetmek.",
      "İstenmeyen durumlardan uzak durmaya çalışmak."
    ]
  }
];
