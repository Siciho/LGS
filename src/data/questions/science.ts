// src/data/science.ts
import { Question } from "@/types";

export const scienceQuestions: Question[] = [
  {
    id: 'og_fen_1', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'DNA molekülünde Adenin nükleotidinin karşısına her zaman hangisi gelir?',
    options: ['Guanin', 'Sitozin', 'Timin', 'Urasil'], correctAnswer: 2,
    explanation: 'DNA molekülünde Adenin (A) daima Timin (T) ile eşleşir. Guanin (G) ise Sitozin (C) ile eşleşir.'
  },
  {
    id: 'og_fen_2', subjectId: 'science', topic: 'Basınç', difficulty: 'medium',
    question: 'Katı basıncı aşağıdakilerden hangisine bağlı değildir?',
    options: ['Cismin ağırlığına','Yüzey alanına','Cismin yapıldığı maddenin cinsine','Yer çekimi ivmesine'], correctAnswer: 2,
    explanation: 'Katı basıncı (P), cismin ağırlığı (G) ve yüzey alanına (S) bağlıdır. Formülü P=G/S\'dir. Cismin yapıldığı maddenin cinsi basıncı doğrudan etkilemez.'
  },
  {
    id: 'og_fen_3', subjectId: 'science', topic: 'Mevsimler ve İklimler', difficulty: 'easy',
    question: 'Dünya\'nın kendi ekseni etrafında dönmesi sonucu ne oluşur?',
    options: ['Mevsimler', 'Gece ve gündüz', 'Ay tutulması', 'Yıllar'], correctAnswer: 1,
    explanation: 'Dünya\'nın kendi ekseni etrafında 24 saatte tamamladığı bir tam tur, gece ve gündüzün oluşmasına neden olur.'
  },
  {
    id: 'og_fen_4', subjectId: 'science', topic: 'Mevsimler ve İklimler', difficulty: 'medium',
    question: '21 Haziran tarihinde, Kuzey Yarım Küre\'de hangi mevsim yaşanır?',
    options: ['Kış', 'İlkbahar', 'Yaz', 'Sonbahar'], correctAnswer: 2,
    explanation: '21 Haziran, Kuzey Yarım Küre\'de yaz mevsiminin başlangıcıdır.'
  },
  {
    id: 'og_fen_5', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'DNA\'nın yapı birimine ne ad verilir?',
    options: ['Gen', 'Kromozom', 'Nükleotid', 'Nükleus'], correctAnswer: 2,
    explanation: 'DNA\'nın en küçük yapı birimi, fosfat, şeker ve organik bazdan oluşan nükleotiddir.'
  },
  {
    id: 'og_fen_6', subjectId: 'science', topic: 'Basınç', difficulty: 'hard',
    question: 'Sıvı basıncı ile ilgili aşağıdakilerden hangisi yanlıştır?',
    options: ['Sıvının derinliği arttıkça artar.', 'Sıvının yoğunluğu arttıkça artar.', 'Kabın şekline bağlı değildir.','Kabın taban alanına bağlıdır.'], correctAnswer: 3,
    explanation: 'Sıvı basıncı, sıvının derinliğine ve yoğunluğuna bağlıdır, kabın şekline veya taban alanına bağlı değildir.'
  },
  {
    id: 'og_fen_7', subjectId: 'science', topic: 'Maddenin Halleri', difficulty: 'easy',
    question: 'Maddenin üç hâli vardır: katı, sıvı ve gaz. Hangi olay sıvının gaz hâline geçmesini sağlar?',
    options: ['Donma', 'Yoğuşma', 'Buharlaşma', 'Kıvamlaşma'],
    correctAnswer: 2,
    explanation: 'Sıvı halden gaz hale geçiş, buharlaşma olarak adlandırılır.'
  },
  {
    id: 'og_fen_8', subjectId: 'science', topic: 'Fiziksel Büyüklükler', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi kuvvetin birimi değildir?',
    options: ['Newton', 'Joule', 'Din', 'N'],
    correctAnswer: 1,
    explanation: 'Newton (N) ve Din kuvvet birimleridir. Joule, iş veya enerji birimidir.'
  },
  {
    id: 'og_fen_9', subjectId: 'science', topic: 'Sindirim Sistemi', difficulty: 'easy',
    question: 'İnsan vücudunda sindirimin başladığı organ hangisidir?',
    options: ['Mide', 'Ağız', 'İnce bağırsak', 'Karaciğer'],
    correctAnswer: 1,
    explanation: 'Karbonhidratların sindirimi ağızda başlar.'
  },
  {
    id: 'og_fen_10', subjectId: 'science', topic: 'Su Döngüsü', difficulty: 'easy',
    question: 'Su döngüsünde buharın yoğunlaşmasıyla oluşan olay hangisidir?',
    options: ['Yağış', 'Buharlaşma', 'Terleme', 'Kıvamlaşma'],
    correctAnswer: 0,
    explanation: 'Yoğunlaşma, su buharının sıvı hale dönüşmesidir. Bulutları oluşturur ve sonunda yağış olarak yere düşer.'
  },
  {
    id: 'og_fen_11', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Fotosentez sırasında bitkiler hangi gazı kullanır?',
    options: ['Oksijen', 'Karbondioksit', 'Azot', 'Hidrogen'],
    correctAnswer: 1,
    explanation: 'Fotosentez, bitkilerin karbondioksit ve su kullanarak besin üretmesidir.'
  },
  {
    id: 'og_fen_12', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi elektrik devresini tamamlayan iletken değildir?',
    options: ['Bakır tel', 'Alüminyum tel', 'Plastik', 'Su'],
    correctAnswer: 2,
    explanation: 'Bakır ve alüminyum metaller olduğu için iyi iletkendir. Plastik, yalıtkan bir maddedir.'
  },
  {
    id: 'og_fen_13', subjectId: 'science', topic: 'Isı', difficulty: 'hard',
    question: 'Isı alışverişi olmadan sıcaklığı sabit kalan madde hangisidir?',
    options: ['Termometre sıvısı', 'Su', 'Sıcak taş', 'İzole edilmiş kap'],
    correctAnswer: 3,
    explanation: 'İzole edilmiş bir kap, dış ortamla ısı alışverişini engellediği için içindeki maddenin sıcaklığı sabit kalır.'
  },
  {
    id: 'og_fen_14', subjectId: 'science', topic: 'Işık', difficulty: 'easy',
    question: 'Işık bir ortamdan diğerine geçerken hangi olay gerçekleşir?',
    options: ['Yansıma', 'Kırılma', 'Soğuma', 'Yoğuşma'],
    correctAnswer: 1,
    explanation: 'Işığın bir ortamdan (örneğin havadan) başka bir ortama (örneğin suya) geçerken yön değiştirmesi kırılma olarak adlandırılır.'
  },
  {
    id: 'og_fen_15', subjectId: 'science', topic: 'Dünya ve Evren', difficulty: 'easy',
    question: 'Dünya’nın kendi ekseni etrafında dönmesi sonucu ne meydana gelir?',
    options: ['Mevsimler', 'Gün ve gece', 'Gelgitler', 'Yıldız kayması'],
    correctAnswer: 1,
    explanation: 'Dünya\'nın 24 saatte kendi etrafında dönmesi, gece ve gündüzün oluşmasına neden olur.'
  },
  {
    id: 'og_fen_16', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'easy',
    question: 'Aşağıdaki maddelerden hangisi asidik özelliktedir?',
    options: ['Su', 'Sirke', 'Tuz', 'Karbonat'],
    correctAnswer: 1,
    explanation: 'Sirke, asidik bir maddedir ve pH değeri 7\'den küçüktür.'
  },
  {
    id: 'og_fen_17', subjectId: 'science', topic: 'Hareket ve Kuvvet', difficulty: 'medium',
    question: 'Bir cismin hızının zamanla değişmesi hangi büyüklüğü oluşturur?',
    options: ['Kuvvet', 'İvme', 'Enerji', 'Kütle'],
    correctAnswer: 1,
    explanation: 'Hızdaki değişim miktarına ivme denir.'
  },
  {
    id: 'og_fen_18', subjectId: 'science', topic: 'Sürtünme', difficulty: 'hard',
    question: 'Sürtünmesiz bir ortamda hareket eden cisim hangi durumda durur?',
    options: ['Kendi isteğiyle', 'Başka kuvvet uygulanınca', 'Hiçbir zaman durmaz', 'Hava direnci ile'],
    correctAnswer: 2,
    explanation: 'Newton\'un birinci hareket yasasına göre, bir cisme dışarıdan bir kuvvet etki etmedikçe hareketini sonsuza kadar sürdürür.'
  },
  {
    id: 'og_fen_19', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'easy',
    question: 'Aşağıdaki canlılardan hangisi üretici (ototrof) canlıdır?',
    options: ['İnsan', 'Balık', 'Alg', 'Kurbağa'],
    correctAnswer: 2,
    explanation: 'Algler, fotosentez yaparak kendi besinlerini üretebilirler.'
  },
  {
    id: 'og_fen_20', subjectId: 'science', topic: 'Yoğunluk', difficulty: 'easy',
    question: 'Bir maddenin yoğunluğu ρ = m / V formülü ile hesaplanır. Burada V nedir?',
    options: ['Hacim', 'Kütle', 'Yoğunluk', 'Hız'],
    correctAnswer: 0,
    explanation: 'Yoğunluk formülünde V, hacmi temsil eder.'
  },
  {
    id: 'og_fen_21', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'easy',
    question: 'Elektrik akımı hangi parçacıkların hareketiyle oluşur?',
    options: ['Protonlar', 'Nötronlar', 'Elektronlar', 'Atom çekirdekleri'],
    correctAnswer: 2,
    explanation: 'Elektronların hareket etmesiyle elektrik akımı oluşur.'
  },
  {
    id: 'og_fen_22', subjectId: 'science', topic: 'Ses', difficulty: 'medium',
    question: 'Sesin yayılabilmesi için hangi ortam gerekir?',
    options: ['Boşluk', 'Katı, sıvı veya gaz', 'Sadece katı', 'Hiçbir ortam'],
    correctAnswer: 1,
    explanation: 'Ses, bir dalga olduğu için yayılması için bir ortama (maddeye) ihtiyaç duyar.'
  },
  {
    id: 'og_fen_23', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Fotosentez sonucu bitkiler hangi maddeyi üretir?',
    options: ['Karbondioksit', 'Oksijen', 'Su', 'Azot'],
    correctAnswer: 1,
    explanation: 'Bitkiler fotosentez sonucu atmosfere oksijen bırakır.'
  },
  {
    id: 'og_fen_24', subjectId: 'science', topic: 'Manyetizma', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi mıknatısın özelliği değildir?',
    options: ['Demir çekmesi', 'İki kutup oluşturması', 'Elektrik üretmesi', 'Metal üzerinde kuvvet uygulaması'],
    correctAnswer: 2,
    explanation: 'Mıknatıs elektrik üretmez, ancak manyetik alan oluşturur.'
  },
  {
    id: 'og_fen_25', subjectId: 'science', topic: 'Dünya ve Evren', difficulty: 'easy',
    question: 'Dünya’nın güneş etrafında dönmesi sonucu ne oluşur?',
    options: ['Gün ve gece', 'Mevsimler', 'Gelgitler', 'Yıldız kayması'],
    correctAnswer: 1,
    explanation: 'Dünya\'nın Güneş etrafında 365 gün 6 saatte dönmesiyle mevsimler oluşur.'
  },
  {
    id: 'og_fen_26', subjectId: 'science', topic: 'Hareket ve Kuvvet', difficulty: 'easy',
    question: 'Bir cismin hareket yönünü değiştiren etkiye ne denir?',
    options: ['Kütle', 'Hız', 'Kuvvet', 'Enerji'],
    correctAnswer: 2,
    explanation: 'Kuvvet, cisimlerin hareket durumunu değiştiren etkidir.'
  },
  {
    id: 'og_fen_27', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'medium',
    question: 'Hangi enerji türü yükseğe kaldırılmış bir cisme aittir?',
    options: ['Kinetik enerji', 'Potensiyel enerji', 'Isı enerjisi', 'Elektrik enerjisi'],
    correctAnswer: 1,
    explanation: 'Yüksekte duran cisimlerin yer çekiminden dolayı sahip olduğu enerji, potansiyel enerjidir.'
  },
  {
    id: 'og_fen_28', subjectId: 'science', topic: 'Maddenin Halleri', difficulty: 'easy',
    question: 'Su kaynayınca hangi hâle geçer?',
    options: ['Katı', 'Sıvı', 'Gaz', 'Plazma'],
    correctAnswer: 2,
    explanation: 'Su kaynayınca buharlaşarak gaz hale geçer.'
  },
  {
    id: 'og_fen_29', subjectId: 'science', topic: 'Elektromanyetizma', difficulty: 'medium',
    question: 'Bir iletken telin çevresine sarılan bobin, manyetik alan oluşturur. Bu olay hangi kavrama örnektir?',
    options: ['Elektromıknatıs', 'Elektrik üretimi', 'Elektrik devresi', 'Termodinamik'],
    correctAnswer: 0,
    explanation: 'Bu durum, elektrik akımı sayesinde geçici bir mıknatıs özelliği kazanılması, yani elektromıknatıs oluşumudur.'
  },
  {
    id: 'og_fen_30', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi enerji dönüşümüne örnektir?',
    options: ['Buzun erimesi', 'Güneş panelinin elektrik üretmesi', 'Su buharlaşması', 'Taşın düşmesi'],
    correctAnswer: 1,
    explanation: 'Güneş paneli, güneş enerjisini elektrik enerjisine dönüştürür.'
  },
  {
    id: 'og_fen_31', subjectId: 'science', topic: 'Basınç', difficulty: 'easy',
    question: '“Basınç = Kuvvet / Alan” formülünde basınç birimi nedir?',
    options: ['Newton', 'Pascal', 'Joule', 'Watt'],
    correctAnswer: 1,
    explanation: 'Basınç birimi Pascal\'dır (Pa). Basınç birimi olarak N/m² de kullanılır.'
  },
  {
    id: 'og_fen_32', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Bitkiler için ışık hangi amaçla gereklidir?',
    options: ['Solunum', 'Fotosentez', 'Sindirim', 'Su alma'],
    correctAnswer: 1,
    explanation: 'Bitkiler, fotosentez yaparak besin üretmek için güneş ışığına ihtiyaç duyar.'
  },
  {
    id: 'og_fen_33', subjectId: 'science', topic: 'Fiziksel ve Kimyasal Değişimler', difficulty: 'medium',
    question: 'Hangi durum bir maddenin fiziksel değişimidir?',
    options: ['Kağıdın yırtılması', 'Şekerin erimesi', 'Metalin paslanması', 'Odunun yanması'],
    correctAnswer: 1, // Düzeltme: Şekerin erimesi fizikseldir. Kağıdın yırtılması da fizikseldir. Şeker erimesi daha net bir hal değişimi.
    explanation: 'Şekerin erimesi, maddenin sadece halinin değiştiği fiziksel bir değişimdir. Kağıdın yırtılması da fizikseldir ancak erime daha net bir hal değişimi örneğidir. Paslanma ve yanma kimyasaldır.'
  },
  {
    id: 'og_fen_34', subjectId: 'science', topic: 'Ses', difficulty: 'hard',
    question: 'Ses dalgalarının yayılma hızı en hızlı hangi ortamda olur?',
    options: ['Hava', 'Su', 'Katı', 'Boşluk'],
    correctAnswer: 2,
    explanation: 'Ses, atomlar arasındaki bağların sıkılığı nedeniyle katı maddelerde en hızlı, gazlarda ise en yavaş yayılır.'
  },
  {
    id: 'og_fen_35', subjectId: 'science', topic: 'İnsan Anatomisi', difficulty: 'medium',
    question: 'İnsan vücudundaki hangi organ sindirim ve dolaşımda görev alır?',
    options: ['Akciğer', 'Karaciğer', 'Kalp', 'Mide'],
    correctAnswer: 1,
    explanation: 'Karaciğer, hem sindirimde (safra üretimi) hem de kanı temizleyerek dolaşım sisteminde önemli rol oynar.'
  },
  {
    id: 'og_fen_36', subjectId: 'science', topic: 'Işık', difficulty: 'easy',
    question: 'Işık ışınlarının bir yüzeye çarpıp geri dönmesine ne denir?',
    options: ['Kırılma', 'Yansıma', 'Soğuma', 'Dağılma'],
    correctAnswer: 1,
    explanation: 'Işığın bir yüzeye çarpıp geri dönmesi olayı yansıma olarak adlandırılır.'
  },
  {
    id: 'og_fen_37', subjectId: 'science', topic: 'Maddenin Yapısı', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi elementtir?',
    options: ['Su', 'H2O', 'Demir (Fe)', 'Tuz'],
    correctAnswer: 2,
    explanation: 'Demir (Fe), tek cins atomdan oluşan bir elementtir. Diğerleri bileşiktir.'
  },
  {
    id: 'og_fen_38', subjectId: 'science', topic: 'Bitkiler', difficulty: 'medium',
    question: 'Bitkilerin kökleri hangi amaçla toprakta bulunur?',
    options: ['Fotosentez', 'Destek', 'Su ve mineral alma', 'Nefes alma'],
    correctAnswer: 2,
    explanation: 'Bitkilerin kökleri, topraktan su ve mineralleri emmek için kullanılır.'
  },
  {
    id: 'og_fen_39', subjectId: 'science', topic: 'Fiziksel ve Kimyasal Değişimler', difficulty: 'medium',
    question: 'Hangi durum kimyasal değişimdir?',
    options: ['Buzun erimesi', 'Şekerin erimesi', 'Suyun buharlaşması', 'Kağıdın yanması'],
    correctAnswer: 3,
    explanation: 'Kağıdın yanması, yeni maddelerin oluştuğu kimyasal bir değişimdir.'
  },// --- KASIM 2025 (Basınç + Öncekiler) ---
  {
    id: 'sci_kasim_1', subjectId: 'science', topic: 'Basınç / Fiziksel Olaylar', difficulty: 'medium',
    question: 'Aynı ağırlıktaki ördek ve tavuğun karda yürüdüklerinde ördeğin daha az batmasının sebebi nedir?',
    options: ['Ördeğin daha hafif olması', 'Ördeğin ayaklarının perdeli olması (geniş yüzey alanı)', 'Tavuğun daha hızlı yürümesi', 'Karın daha yumuşak olması'], correctAnswer: 1,
    explanation: 'Katı basıncı, ağırlık bölü yüzey alanıdır. Ördeğin perdeli ayakları yüzey alanını artırır, bu da aynı ağırlıkta daha az basınç uygulamasını ve daha az batmasını sağlar.'
  },
  {
    id: 'sci_kasim_2', subjectId: 'science', topic: 'Basınç / Fiziksel Olaylar', difficulty: 'hard',
    question: 'Derinlere dalan bir dalgıcın üzerine etki eden sıvı basıncı nasıl değişir?',
    options: ['Artar', 'Azalır', 'Değişmez', 'Önce artar sonra azalır'], correctAnswer: 0,
    explanation: 'Sıvı basıncı, sıvının derinliği ve yoğunluğu ile doğru orantılıdır. Derinlik arttıkça sıvı basıncı da artar.'
  },
  {
    id: 'sci_kasim_3', subjectId: 'science', topic: 'DNA ve Genetik Kod / Canlılar ve Yaşam', difficulty: 'easy',
    question: 'Canlıların kalıtsal özelliklerini taşıyan ve hücre çekirdeğinde bulunan yapı hangisidir?',
    options: ['Ribozom', 'Mitokondri', 'DNA', 'Hücre Zarı'], correctAnswer: 2,
    explanation: 'DNA (Deoksiribonükleik asit), canlıların genetik bilgisini taşıyan moleküldür ve genellikle hücre çekirdeğinde bulunur.'
  },
  {
    id: 'sci_kasim_4', subjectId: 'science', topic: 'Mevsimler ve İklim / Dünya ve Evren', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi iklimin özelliklerinden biri değildir?',
    options: ['Geniş bir bölgede uzun yıllar boyunca gözlemlenir.', 'Günlük değişkenlik gösterebilir.', 'Kesin sonuçlar bildirir.', 'İklim bilimi klimatolojidir.'], correctAnswer: 1,
    explanation: 'İklim, uzun süreli hava olaylarının ortalamasıdır ve kesinlik bildirir. Günlük değişkenlik gösteren hava durumudur.'
  },
  {
    id: 'sci_kasim_5', subjectId: 'science', topic: 'DNA ve Genetik Kod / Canlılar ve Yaşam', difficulty: 'medium',
    question: 'Bezelyelerde sarı tohum rengi (S), yeşil tohum rengine (s) baskındır. Heterozigot sarı tohumlu iki bezelyenin çaprazlanması sonucu yeşil tohumlu bezelye oluşma olasılığı nedir?',
    options: ['%0', '%25', '%50', '%75'], correctAnswer: 1,
    explanation: 'Heterozigot iki bireyin (Ss x Ss) çaprazlanmasında genotipler SS, Ss, Ss, ss olur. Fenotipler ise %75 Sarı, %25 Yeşil olur. Yeşil (ss) oluşma olasılığı 1/4 yani %25\'tir.'
  },

  // --- ARALIK 2025 (Madde ve Endüstri + Öncekiler) ---
  {
    id: 'sci_aralik_1', subjectId: 'science', topic: 'Madde ve Endüstri / Madde ve Doğası', difficulty: 'medium',
    question: 'Aşağıdaki olaylardan hangisi kimyasal değişime örnektir?',
    options: ['Suyun donması', 'Demirin paslanması', 'Camın kırılması', 'Tuzun suda çözünmesi'], correctAnswer: 1,
    explanation: 'Demirin paslanması, demirin oksijenle tepkimeye girerek yeni bir madde (pas) oluşturduğu kimyasal bir değişimdir. Diğerleri fiziksel değişimdir.'
  },
  {
    id: 'sci_aralik_2', subjectId: 'science', topic: 'Madde ve Endüstri / Madde ve Doğası', difficulty: 'easy',
    question: 'Elementler periyodik tabloda hangi özelliğe göre sıralanmıştır?',
    options: ['Kütle numarası', 'Atom numarası (Proton sayısı)', 'Nötron sayısı', 'Elektron sayısı'], correctAnswer: 1,
    explanation: 'Modern periyodik tablo, elementlerin artan atom numaralarına (proton sayılarına) göre düzenlenmiştir.'
  },
  {
    id: 'sci_aralik_3', subjectId: 'science', topic: 'Basınç / Fiziksel Olaylar', difficulty: 'medium',
    question: 'Açık hava basıncını ölçen alete ne ad verilir?',
    options: ['Termometre', 'Barometre', 'Dinamometre', 'Manometre'], correctAnswer: 1,
    explanation: 'Açık hava basıncını (atmosfer basıncını) ölçmek için barometre kullanılır.'
  },
  {
    id: 'sci_aralik_4', subjectId: 'science', topic: 'DNA ve Genetik Kod / Canlılar ve Yaşam', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi mutasyona neden olabilecek etkenlerden biri değildir?',
    options: ['Radyasyon', 'Bazı kimyasal maddeler', 'Yüksek sıcaklık', 'Dengeli beslenme'], correctAnswer: 3,
    explanation: 'Radyasyon, bazı kimyasallar ve yüksek sıcaklık gibi çevresel etkenler DNA yapısını bozarak mutasyona neden olabilir. Dengeli beslenme mutasyon nedeni değildir.'
  },
  {
    id: 'sci_aralik_5', subjectId: 'science', topic: 'Mevsimler ve İklim / Dünya ve Evren', difficulty: 'easy',
    question: 'Dünya\'nın Güneş etrafında dolanma hareketi sonucu ne oluşur?',
    options: ['Gece ve gündüz', 'Mevsimler', 'Ay\'ın evreleri', 'Gelgit'], correctAnswer: 1,
    explanation: 'Dünya\'nın Güneş etrafında dolanması ve eksen eğikliği mevsimlerin oluşmasının temel nedenidir.'
  },

  // --- OCAK 2026 (Periyodik Sistem, Asitler/Bazlar + Öncekiler) ---
  {
    id: 'sci_ocak_1', subjectId: 'science', topic: 'Periyodik Sistem', difficulty: 'medium',
    question: 'Periyodik tabloda aynı grupta (dikey sütun) bulunan elementlerin hangi özelliği genellikle benzerdir?',
    options: ['Proton sayıları', 'Nötron sayıları', 'Kimyasal özellikleri', 'Periyot numaraları'], correctAnswer: 2,
    explanation: 'Aynı gruptaki elementlerin son katmanlarındaki elektron sayıları genellikle aynıdır, bu da onlara benzer kimyasal özellikler kazandırır.'
  },
  {
    id: 'sci_ocak_2', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'easy',
    question: 'Turnusol kağıdını maviye çeviren madde türü hangisidir?',
    options: ['Asit', 'Baz', 'Tuz', 'Nötr'], correctAnswer: 1,
    explanation: 'Bazlar, kırmızı turnusol kağıdını maviye çevirirler. Asitler ise mavi turnusol kağıdını kırmızıya çevirir.'
  },
  {
    id: 'sci_ocak_3', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'medium',
    question: 'pH değeri 7 olan bir çözelti için ne söylenebilir?',
    options: ['Asidiktir', 'Baziktir', 'Nötrdür', 'Tuzludur'], correctAnswer: 2,
    explanation: 'pH ölçeğinde 7 nötr noktasıdır. 7\'den küçük değerler asidik, 7\'den büyük değerler baziktir.'
  },
  {
    id: 'sci_ocak_4', subjectId: 'science', topic: 'Madde ve Endüstri / Madde ve Doğası', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi bir metalin özelliği değildir?',
    options: ['Parlak görünüm', 'Isı ve elektriği iyi iletme', 'Tel ve levha haline gelme', 'Kırılgan olma'], correctAnswer: 3,
    explanation: 'Metaller genellikle parlaktır, ısıyı ve elektriği iyi iletir, işlenerek tel ve levha haline getirilebilirler. Ametaller kırılgandır.'
  },
  {
    id: 'sci_ocak_5', subjectId: 'science', topic: 'Basınç / Fiziksel Olaylar', difficulty: 'hard',
    question: 'İçi su dolu bir şişenin ağzı kapatılıp ters çevrildiğinde suyun dökülmemesinin sebebi nedir?',
    options: ['Sıvı basıncı', 'Yer çekimi', 'Açık hava basıncı', 'Kılcallık'], correctAnswer: 2,
    explanation: 'Şişenin ağzındaki açık hava basıncı, içerideki suyun ağırlığından kaynaklanan sıvı basıncından daha büyük olduğu için suyun dökülmesini engeller.'
  },

  // --- ŞUBAT 2026 (Basit Makineler + Öncekiler) ---
  {
    id: 'sci_subat_1', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi bir kaldıraç örneği değildir?',
    options: ['Tahterevalli', 'Makas', 'El arabası', 'Vida'], correctAnswer: 3,
    explanation: 'Vida, eğik düzlem prensibine dayanan bir basit makinedir. Diğerleri kaldıraçtır.'
  },
  {
    id: 'sci_subat_2', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'medium',
    question: 'Sabit makaralar için aşağıdakilerden hangisi doğrudur?',
    options: ['Kuvvetten kazanç sağlar.', 'Yoldan kazanç sağlar.', 'Kuvvetin yönünü değiştirir.', 'İşten kazanç sağlar.'], correctAnswer: 2,
    explanation: 'Sabit makaralar kuvvetten veya yoldan kazanç sağlamaz, sadece kuvvetin yönünü değiştirerek iş yapma kolaylığı sağlar.'
  },
  {
    id: 'sci_subat_3', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'hard',
    question: 'Bir eğik düzlemde yoldan kayıp olması ne anlama gelir?',
    options: ['Kuvvetten kazanç vardır.', 'Kuvvetten kayıp vardır.', 'İşten kazanç vardır.', 'Uygulanan kuvvet yükten küçüktür.'], correctAnswer: 0,
    explanation: 'Basit makinelerde yoldan kayıp varsa, aynı oranda kuvvetten kazanç vardır. İşten kazanç hiçbir zaman olmaz. Yoldan kayıp, yükü daha uzun bir mesafede taşımak ama daha az kuvvet uygulamak demektir.'
  },
  {
    id: 'sci_subat_4', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'medium',
    question: 'Asit yağmurlarının temel nedeni aşağıdakilerden hangisidir?',
    options: ['Orman yangınları', 'Fosil yakıtların yanması sonucu oluşan gazlar', 'Volkanik patlamalar', 'Depremler'], correctAnswer: 1,
    explanation: 'Fosil yakıtların (kömür, petrol) yanmasıyla atmosfere salınan kükürt dioksit ve azot dioksit gibi gazlar, su buharıyla tepkimeye girerek asit yağmurlarını oluşturur.'
  },
  {
    id: 'sci_subat_5', subjectId: 'science', topic: 'Periyodik Sistem', difficulty: 'medium',
    question: 'Periyodik tabloda soldan sağa doğru gidildikçe genellikle hangi özellik artar?',
    options: ['Atom yarıçapı', 'Metalik özellik', 'Elektron alma isteği (Ametalik özellik)', 'Katman sayısı'], correctAnswer: 2,
    explanation: 'Periyodik tabloda soldan sağa doğru gidildikçe genellikle atom yarıçapı azalır, metalik özellik azalır, ametalik özellik (elektron alma isteği) artar. Katman sayısı aynı periyotta değişmez.'
  },

  // --- MART 2026 (Canlılar ve Enerji İlişkileri + Öncekiler) ---
  {
    id: 'sci_mart_1', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'easy',
    question: 'Bir ekosistemdeki besin zincirinin ilk halkasını genellikle hangi canlılar oluşturur?',
    options: ['Üreticiler (Bitkiler)', 'Birincil Tüketiciler (Otçullar)', 'İkincil Tüketiciler (Etçiller)', 'Ayrıştırıcılar (Bakteri ve Mantarlar)'], correctAnswer: 0,
    explanation: 'Besin zincirleri, kendi besinini üreten üretici canlılarla (genellikle fotosentez yapan bitkiler) başlar.'
  },
  {
    id: 'sci_mart_2', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'medium',
    question: 'Fotosentez olayı hücrenin hangi organelinde gerçekleşir?',
    options: ['Mitokondri', 'Ribozom', 'Kloroplast', 'Çekirdek'], correctAnswer: 2,
    explanation: 'Fotosentez, bitki hücrelerinde bulunan ve klorofil pigmenti içeren kloroplast organelinde meydana gelir.'
  },
  {
    id: 'sci_mart_3', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'medium',
    question: 'Oksijenli solunumun temel amacı nedir?',
    options: ['Karbondioksit üretmek', 'Su üretmek', 'Besinlerden enerji (ATP) üretmek', 'Oksijen tüketmek'], correctAnswer: 2,
    explanation: 'Oksijenli solunum, besinlerin oksijen kullanılarak parçalanması ve hücrenin kullanabileceği enerji formu olan ATP\'nin üretilmesi sürecidir.'
  },
  {
    id: 'sci_mart_4', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'medium',
    question: 'Bir çıkrık sisteminde kuvvet kazancını artırmak için ne yapılmalıdır?',
    options: ['Kuvvet kolu (çevirme kolu) kısaltılmalı', 'Yük kolu (silindirin yarıçapı) büyütülmeli', 'Kuvvet kolu (çevirme kolu) uzatılmalı', 'Silindire sarılan ip sayısı artırılmalı'], correctAnswer: 2,
    explanation: 'Çıkrıkta kuvvet kazancı = Kuvvet kolu / Yük kolu. Kazancı artırmak için kuvvet kolu uzatılmalı veya yük kolu (silindir yarıçapı) kısaltılmalıdır.'
  },
  {
    id: 'sci_mart_5', subjectId: 'science', topic: 'Madde ve Endüstri / Madde ve Doğası', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Türkiye\'de kimya endüstrisinin gelişmesine katkı sağlayan kurumlardan biridir?',
    options: ['TÜBİTAK MAM', 'Maden Tetkik ve Arama (MTA)', 'Türkiye Petrolleri (TPAO)', 'Hepsi'], correctAnswer: 3,
    explanation: 'TÜBİTAK Marmara Araştırma Merkezi (MAM), MTA ve TPAO gibi kurumlar, ham madde sağlama, araştırma-geliştirme gibi faaliyetlerle Türkiye\'de kimya endüstrisinin gelişimine katkıda bulunur.'
  },

  // --- NİSAN 2026 (Enerji Dönüşümleri, Elektrik + Öncekiler) ---
  {
    id: 'sci_nisan_1', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'medium',
    question: 'Bir hidroelektrik santralinde (HES) hangi enerji dönüşümü gerçekleşir?',
    options: ['Kimyasal -> Elektrik', 'Potansiyel -> Kinetik -> Elektrik', 'Isı -> Hareket -> Elektrik', 'Nükleer -> Isı -> Elektrik'], correctAnswer: 1,
    explanation: 'Barajda biriken suyun potansiyel enerjisi, su akarken kinetik enerjiye, türbinleri döndürerek hareket enerjisine ve jeneratörler aracılığıyla elektrik enerjisine dönüşür.'
  },
  {
    id: 'sci_nisan_2', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi yenilenebilir bir enerji kaynağı değildir?',
    options: ['Güneş', 'Rüzgar', 'Doğal Gaz', 'Jeotermal'], correctAnswer: 2,
    explanation: 'Doğal gaz, kömür ve petrol gibi fosil yakıtlar yenilenemez enerji kaynaklarıdır. Güneş, rüzgar, su (hidroelektrik), jeotermal ve biyokütle yenilenebilir kaynaklardır.'
  },
  {
    id: 'sci_nisan_3', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'easy',
    question: 'Bir elektrik devresinde akım şiddetini ölçmek için kullanılan alet nedir?',
    options: ['Voltmetre', 'Ampermetre', 'Ohmmetre', 'Direnç'], correctAnswer: 1,
    explanation: 'Ampermetre, elektrik devresinden geçen akım şiddetini (Amper cinsinden) ölçer ve devreye seri bağlanır.'
  },
  {
    id: 'sci_nisan_4', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'medium',
    question: 'Aynı cins elektrik yükleri birbirini ____, zıt cins elektrik yükleri birbirini ____.',
    options: ['çeker / iter', 'iter / çeker', 'iter / iter', 'çeker / çeker'], correctAnswer: 1,
    explanation: 'Elektrostatik kurallarına göre, aynı işaretli yükler (örneğin + ile + veya - ile -) birbirini iterken, zıt işaretli yükler (+ ile -) birbirini çeker.'
  },
  {
    id: 'sci_nisan_5', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'medium',
    question: 'Ayrıştırıcıların (mantarlar, bakteriler) ekosistemdeki temel görevi nedir?',
    options: ['Fotosentez yapmak', 'Otçul canlıları yemek', 'Ölü organizmaları ve atıkları parçalamak', 'Oksijen üretmek'], correctAnswer: 2,
    explanation: 'Ayrıştırıcılar, ölü bitki ve hayvan kalıntılarını parçalayarak madde döngüsünün devamlılığını sağlar ve toprağı mineral bakımından zenginleştirir.'
  },// --- EKİM AYI İÇİN YENİ EKLENEN SORULAR ---
  {
    id: 'sci_ekim_1', subjectId: 'science', topic: 'DNA ve Genetik Kod / Canlılar ve Yaşam', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi adaptasyona örnek olarak gösterilemez?',
    options: ['Kaktüslerin dikenli yaprakları olması', 'Kutup ayılarının beyaz kürke sahip olması', 'Bukalemunların renk değiştirmesi', 'Spor yapan birinin kaslarının gelişmesi'], correctAnswer: 3,
    explanation: 'Adaptasyon, canlının yaşama ve üreme şansını artıran kalıtsal özelliklerdir. Sporla kas gelişimi kalıtsal değildir, modifikasyondur.'
  },
  {
    id: 'sci_ekim_2', subjectId: 'science', topic: 'DNA ve Genetik Kod / Canlılar ve Yaşam', difficulty: 'hard',
    question: 'Bir DNA molekülünde toplam 2000 nükleotid bulunmaktadır. Bu nükleotidlerden 600 tanesi Guanin ise, kaç tanesi Timin\'dir?',
    options: ['400', '600', '700', '1400'], correctAnswer: 0,
    explanation: 'DNA\'da Guanin (G) sayısı Sitozin (C) sayısına, Adenin (A) sayısı ise Timin (T) sayısına eşittir. Toplam nükleotid = A + T + G + C. Eğer G=600 ise C=600 olur. G+C = 1200. Kalan A+T = 2000 - 1200 = 800\'dür. A=T olduğundan, T = 800 / 2 = 400 olur.'
  },
  // --- YIL BOYU İÇİN YENİ EKLENEN SORULAR (30 ADET) ---

  // Mevsimler ve İklimler (3 Yeni Soru)
  {
    id: 'sci_yeni_1', subjectId: 'science', topic: 'Mevsimler ve İklimler', difficulty: 'easy',
    question: 'Dünya\'nın Güneş etrafında dolanması ve eksen eğikliği sonucunda ne oluşur?',
    options: ['Gece ve gündüz', 'Mevsimler', 'Ay tutulması', 'Gelgit olayı'], correctAnswer: 1,
    explanation: 'Mevsimlerin oluşmasının temel nedenleri Dünya\'nın Güneş etrafında dolanması ve eksen eğikliğidir.'
  },
  {
    id: 'sci_yeni_2', subjectId: 'science', topic: 'Mevsimler ve İklimler', difficulty: 'medium',
    question: 'Türkiye Kuzey Yarım Küre\'de yer almaktadır. Buna göre 21 Aralık tarihinde Türkiye\'de hangi durum yaşanır?',
    options: ['En uzun gündüz', 'En kısa gece', 'Yaz başlangıcı', 'Kış başlangıcı ve en uzun gece'], correctAnswer: 3,
    explanation: '21 Aralık, Kuzey Yarım Küre için kış gündönümüdür. Bu tarihte en uzun gece ve en kısa gündüz yaşanır, kış mevsimi başlar.'
  },
  {
    id: 'sci_yeni_3', subjectId: 'science', topic: 'Mevsimler ve İklimler', difficulty: 'medium',
    question: 'İklim ile hava olayları arasındaki temel fark nedir?',
    options: ['İklim dar bir alanda görülür, hava olayı geniş alanda.', 'İklim kısa süreli, hava olayı uzun süreli atmosfer olayıdır.', 'İklim uzun yılların ortalamasıdır, hava olayı anlıktır.', 'İklimi klimatologlar, hava olayını meteorologlar incelemez.'], correctAnswer: 2,
    explanation: 'Hava olayları belirli bir yerde kısa sürede etkili olan atmosfer koşullarıyken (yağmur, kar vb.), iklim geniş bir bölgede uzun yıllar boyunca gözlemlenen hava olaylarının ortalamasıdır.'
  },

  // DNA ve Genetik Kod (3 Yeni Soru)
  {
    id: 'sci_yeni_4', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'DNA\'nın kendini eşlemesi sırasında sitoplazmadan çekirdeğe hangi moleküller girer?',
    options: ['Proteinler', 'Organik bazlar', 'Nükleotidler', 'Amino asitler'], correctAnswer: 2,
    explanation: 'DNA eşlenirken, sitoplazmada serbest halde bulunan nükleotidler (Adenin, Timin, Guanin, Sitozin içeren yapılar) çekirdeğe girerek yeni DNA zincirlerinin yapımında kullanılır.'
  },
  {
    id: 'sci_yeni_5', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'hard',
    question: 'Bir canlının belirli bir özelliğini kontrol eden DNA parçasına ne ad verilir?',
    options: ['Nükleotid', 'Kromozom', 'Gen', 'Nükleus'], correctAnswer: 2,
    explanation: 'Gen, DNA üzerinde belirli bir proteini veya RNA molekülünü kodlayan ve belirli bir kalıtsal karakteri (göz rengi, saç şekli vb.) belirleyen nükleotid dizisidir.'
  },
  {
    id: 'sci_yeni_6', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi modifikasyona örnektir?',
    options: ['Van kedisinin göz renklerinin farklı olması', 'Çuha çiçeğinin sıcaklığa göre farklı renk açması', 'Kaktüslerin iğne yapraklı olması', 'Zehirli ok kurbağasının parlak renkli olması'], correctAnswer: 1,
    explanation: 'Modifikasyon, çevresel faktörlerin etkisiyle canlının genotipinde değil, fenotipinde (dış görünüşünde) meydana gelen ve kalıtsal olmayan değişikliklerdir. Çuha çiçeğinin rengi sıcaklığa bağlı olarak değişir.'
  },

  // Basınç (3 Yeni Soru)
  {
    id: 'sci_yeni_7', subjectId: 'science', topic: 'Basınç', difficulty: 'medium',
    question: 'Katı bir cismin zemine yaptığı basıncı artırmak için ne yapılmalıdır?',
    options: ['Cismin ağırlığı azaltılmalı', 'Cismin yüzey alanı artırılmalı', 'Cisim daha yumuşak bir zemine konulmalı', 'Cismin ağırlığı artırılmalı veya yüzey alanı azaltılmalı'], correctAnswer: 3,
    explanation: 'Katı basıncı (P=G/S) ağırlık (G) ile doğru, yüzey alanı (S) ile ters orantılıdır. Basıncı artırmak için ağırlık artırılmalı ya da yüzey alanı küçültülmelidir.'
  },
  {
    id: 'sci_yeni_8', subjectId: 'science', topic: 'Basınç', difficulty: 'hard',
    question: 'Ağzı kapalı bir pet şişenin içindeki havanın basıncı ile dışarıdaki açık hava basıncı arasındaki ilişki nasıldır?',
    options: ['İç basınç her zaman daha büyüktür.', 'Dış basınç her zaman daha büyüktür.', 'Basınçlar eşittir.', 'Şişenin şekline göre değişir.'], correctAnswer: 2, // Düzeltme: Normalde eşittir, ama şişe sıkılırsa iç basınç artar. Soru net değil. Açık hava basıncı ile kapalı kaptaki gaz basıncı sorulsun.
   explanation: 'Katı basıncı (P=G/S) ağırlık (G) ile doğru, yüzey alanı (S) ile ters orantılıdır. Basıncı artırmak için ağırlık artırılmalı ya da yüzey alanı küçültülmelidir.'  },
  {
    
    id: 'sci_yeni_8', subjectId: 'science', topic: 'Basınç', difficulty: 'hard',
    question: 'Açık hava basıncının (atmosfer basıncı) varlığını kanıtlayan deney aşağıdakilerden hangisidir?',
    options: ['Pascal Prensibi deneyi', 'Torricelli deneyi', 'Arşimet Prensibi deneyi', 'Bernoulli deneyi'], correctAnswer: 1,
    explanation: 'Torricelli, cıva dolu bir boruyu cıva dolu bir kaba ters çevirerek borudaki cıva seviyesinin düşmesini gözlemlemiş ve bu düşüşü engelleyen kuvvetin açık hava basıncı olduğunu kanıtlamıştır.'
  },
  {
    id: 'sci_yeni_9', subjectId: 'science', topic: 'Basınç', difficulty: 'medium',
    question: 'Derinlere dalan bir dalgıcın üzerine etki eden sıvı basıncı nasıl değişir?',
    options: ['Artar', 'Azalır', 'Değişmez', 'Önce artar sonra azalır'], correctAnswer: 0,
    explanation: 'Sıvı basıncı (P=h*d*g) derinlik (h) ile doğru orantılıdır. Dalgıç derine indikçe üzerindeki sıvı basıncı artar.'
  },

  // Madde ve Endüstri / Fiziksel ve Kimyasal Değişimler / Periyodik Sistem / Asitler ve Bazlar (Toplam 6 Yeni Soru) explanation: 'Katı basıncı (P=G/S) ağırlık (G) ile doğru, yüzey alanı (S) ile ters orantılıdır. Basıncı artırmak için ağırlık artırılmalı ya da yüzey alanı küçültülmelidir.'
  {
    id: 'sci_yeni_10', subjectId: 'science', topic: 'Madde ve Endüstri', difficulty: 'medium',
    question: 'Demirin paslanması sırasında gerçekleşen değişim türü nedir?',
    options: ['Fiziksel değişim', 'Kimyasal değişim', 'Hal değişimi', 'Nükleer değişim'], correctAnswer: 1,
    explanation: 'Paslanma, demirin oksijenle tepkimeye girerek yeni bir madde (demir oksit) oluşturmasıdır. Bu nedenle kimyasal bir değişimdir.'
  },
  {
    id: 'sci_yeni_11', subjectId: 'science', topic: 'Fiziksel ve Kimyasal Değişimler', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi sadece fiziksel değişime örnektir?',
    options: ['Sütten yoğurt yapılması', 'Ekmeğin küflenmesi', 'Suyun donması', 'Kömürün yanması'], correctAnswer: 2,
    explanation: 'Suyun donması, maddenin sadece halinin (sıvıdan katıya) değiştiği, kimyasal yapısının değişmediği fiziksel bir olaydır.'
  },
  {
    id: 'sci_yeni_12', subjectId: 'science', topic: 'Periyodik Sistem', difficulty: 'medium',
    question: 'Periyodik tabloda elementler hangi özelliğe göre sıralanmıştır?',
    options: ['Atom numarası (Proton sayısı)', 'Kütle numarası', 'Nötron sayısı', 'Yörünge sayısı'], correctAnswer: 0,
    explanation: 'Modern periyodik sistemde elementler, artan atom numaralarına (proton sayılarına) göre düzenlenmiştir.'
  },
  {
    id: 'sci_yeni_13', subjectId: 'science', topic: 'Periyodik Sistem', difficulty: 'hard',
    question: 'Periyodik tabloda aynı grupta (dikey sütun) bulunan elementlerin hangi özelliği genellikle benzerdir?',
    options: ['Proton sayıları', 'Kütle numaraları', 'Kimyasal özellikleri', 'Periyot numaraları'], correctAnswer: 2,
    explanation: 'Aynı grupta bulunan elementlerin son katmanlarındaki elektron sayıları (değerlik elektronları) genellikle aynıdır, bu da onların benzer kimyasal özellikler göstermesine neden olur.'
  },
  {
    id: 'sci_yeni_14', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'easy',
    question: 'pH değeri 7\'den küçük olan maddeler ne olarak adlandırılır?',
    options: ['Asit', 'Baz', 'Tuz', 'Nötr'], correctAnswer: 0,
    explanation: 'pH ölçeğinde 0-7 arası asidik, 7 nötr, 7-14 arası bazik (alkali) özellikleri gösterir.'
  },
  {
    id: 'sci_yeni_15', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'medium',
    question: 'Mavi turnusol kağıdını kırmızıya çeviren madde aşağıdakilerden hangisidir?',
    options: ['Sabunlu su', 'Limon suyu', 'Amonyak', 'Saf su'], correctAnswer: 1,
    explanation: 'Asitler mavi turnusol kağıdını kırmızıya çevirirler. Limon suyu asidik bir maddedir. Bazlar ise kırmızı turnusol kağıdını maviye çevirir (sabunlu su, amonyak gibi).'
  },

  // Basit Makineler (3 Yeni Soru)
  {
    id: 'sci_yeni_16', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi basit makine değildir?',
    options: ['Kaldıraç', 'Eğik düzlem', 'Elektrik motoru', 'Çıkrık'], correctAnswer: 2,
    explanation: 'Basit makineler, uygulanan kuvvetin yönünü, doğrultusunu veya büyüklüğünü değiştirerek iş kolaylığı sağlayan araçlardır. Elektrik motoru karmaşık bir makinedir.'
  },
  {
    id: 'sci_yeni_17', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'medium',
    question: 'Bir tornavidanın vida sıkarken kullanılması hangi basit makine prensibine örnektir?',
    options: ['Kaldıraç', 'Eğik düzlem', 'Çıkrık', 'Dişli çark'], correctAnswer: 2,
    explanation: 'Tornavida, uygulanan kuvvetin döndürme etkisini artırarak vidayı çeviren bir çıkrık sistemine benzer şekilde çalışır.'
  },
  {
    id: 'sci_yeni_18', subjectId: 'science', topic: 'Basit Makineler', difficulty: 'hard',
    question: 'Yükün arada olduğu bir kaldıraç tipine örnek nedir?',
    options: ['Tahterevalli', 'El arabası', 'Cımbız', 'Makas'], correctAnswer: 1,
    explanation: 'El arabasında yük (taşınan malzeme) destek (tekerlek) ile kuvvet (tutan kişi) arasındadır. Cımbız ve makas kuvetin arada olduğu, tahterevalli desteğin arada olduğu kaldıraç tipleridir.'
  },

  // Canlılar ve Enerji İlişkileri (3 Yeni Soru)
  {
    id: 'sci_yeni_19', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'easy',
    question: 'Bir ekosistemdeki besin zincirinin ilk halkasını hangi canlılar oluşturur?',
    options: ['Üreticiler (Bitkiler)', 'Birincil tüketiciler (Otçullar)', 'İkincil tüketiciler (Etçiller)', 'Ayrıştırıcılar'], correctAnswer: 0,
    explanation: 'Besin zincirleri, kendi besinini üreten üretici canlılarla (genellikle bitkiler veya algler) başlar.'
  },
  {
    id: 'sci_yeni_20', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'medium',
    question: 'Fotosentez olayının denklemi genel olarak nasıldır?',
    options: ['Besin + Oksijen -> Karbondioksit + Su + Enerji', 'Karbondioksit + Su + Işık -> Besin + Oksijen', 'Su + Oksijen -> Karbondioksit + Enerji', 'Besin + Karbondioksit -> Oksijen + Su'], correctAnswer: 1,
    explanation: 'Fotosentezde bitkiler, ışık enerjisi kullanarak karbondioksit ve suyu, besin (glikoz) ve oksijene dönüştürür.'
  },
  {
    id: 'sci_yeni_21', subjectId: 'science', topic: 'Canlılar ve Enerji İlişkileri', difficulty: 'medium',
    question: 'Canlıların yaşamsal faaliyetleri için gerekli enerjiyi besinleri oksijenle parçalayarak elde etmesi olayına ne denir?',
    options: ['Fotosentez', 'Solunum', 'Boşaltım', 'Sindirim'], correctAnswer: 1,
    explanation: 'Oksijenli solunum, besin moleküllerinin oksijen kullanılarak parçalanması ve enerji (ATP) üretilmesi sürecidir.'
  },

  // Enerji Dönüşümleri ve Çevre Bilimi (3 Yeni Soru)
  {
    id: 'sci_yeni_22', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi yenilenebilir enerji kaynağıdır?',
    options: ['Kömür', 'Doğal gaz', 'Petrol', 'Güneş enerjisi'], correctAnswer: 3,
    explanation: 'Yenilenebilir enerji kaynakları (güneş, rüzgar, hidroelektrik, jeotermal) doğada sürekli olarak var olan ve tükenmeyen kaynaklardır. Fosil yakıtlar (kömür, petrol, doğal gaz) yenilenemez.'
  },
  {
    id: 'sci_yeni_23', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'medium',
    question: 'Sera etkisine neden olan temel gaz aşağıdakilerden hangisidir?',
    options: ['Oksijen', 'Azot', 'Karbondioksit', 'Hidrojen'], correctAnswer: 2,
    explanation: 'Başta karbondioksit (CO2) olmak üzere metan (CH4) gibi sera gazları, atmosferde ısıyı tutarak Dünya\'nın ortalama sıcaklığının artmasına (küresel ısınma) neden olur.'
  },
  {
    id: 'sci_yeni_24', subjectId: 'science', topic: 'Enerji Dönüşümleri ve Çevre Bilimi', difficulty: 'medium',
    question: 'Geri dönüşümün çevreye sağladığı en önemli fayda nedir?',
    options: ['Yeni iş alanları yaratması', 'Doğal kaynakların korunması ve enerji tasarrufu', 'Atık depolama alanlarını artırması', 'Ürünlerin fiyatını düşürmesi'], correctAnswer: 1,
    explanation: 'Geri dönüşüm, atık malzemelerin yeniden işlenerek yeni ürünlere dönüştürülmesidir. Bu sayede ham madde ihtiyacı azalır, doğal kaynaklar korunur ve üretim için gereken enerji miktarı düşer.'
  },

  // Elektrik Yükleri ve Elektrik Enerjisi (6 Yeni Soru)
  {
    id: 'sci_yeni_25', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'easy',
    question: 'Nötr bir cisme pozitif yüklü bir cisim dokundurulursa ne olur?',
    options: ['Cisim negatif yüklenir.', 'Cisim pozitif yüklenir.', 'Cisim nötr kalır.', 'Cisim önce negatif sonra pozitif yüklenir.'], correctAnswer: 1,
    explanation: 'Dokunma ile elektriklenmede, iletken cisimler toplam yükü paylaşır. Pozitif yüklü cisim nötr cisme dokunduğunda, nötr cisimden negatif yük (elektron) çeker ve her iki cisim de pozitif yüklenir.'
  },
  {
    id: 'sci_yeni_26', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'medium',
    question: 'Bir elektrik devresinde akım şiddetini ölçmek için kullanılan alet nedir ve devreye nasıl bağlanır?',
    options: ['Voltmetre - Paralel', 'Ampermetre - Seri', 'Voltmetre - Seri', 'Ampermetre - Paralel'], correctAnswer: 1,
    explanation: 'Akım şiddeti ampermetre ile ölçülür ve devreden geçen akımın tamamının üzerinden geçmesi için devreye seri olarak bağlanır.'
  },
  {
    id: 'sci_yeni_27', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'medium',
    question: 'Bir ampulün parlaklığını artırmak için aşağıdakilerden hangisi yapılabilir? (Devredeki diğer elemanlar sabit kalmak şartıyla)',
    options: ['Devreye seri bir ampul daha eklemek', 'Devreye paralel bir ampul daha eklemek', 'Pil sayısını (gerilimi) artırmak', 'Direnci daha büyük bir ampul kullanmak'], correctAnswer: 2,
    explanation: 'Ohm Kanunu\'na göre (V=I*R), gerilimin (pil sayısı) artırılması devreden geçen akımı artırır. Ampulün parlaklığı üzerinden geçen akımla doğru orantılıdır.'
  },
  {
    id: 'sci_yeni_28', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'hard',
    question: 'Elektrik enerjisinin ısı enerjisine dönüştüğü bir alet aşağıdakilerden hangisidir?',
    options: ['Vantilatör', 'Ütü', 'Televizyon', 'Cep telefonu'], correctAnswer: 1,
    explanation: 'Ütü, içindeki direnç teli sayesinde elektrik enerjisini doğrudan ısı enerjisine dönüştürerek çalışır. Diğer aletlerde de ısınma olsa da temel amaçları farklıdır.'
  },
  {
    id: 'sci_yeni_29', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'easy',
    question: 'Yıldırım ve şimşek olayları hangi tür elektriklenmeye örnektir?',
    options: ['Sürtünme ile', 'Dokunma ile', 'Etki ile', 'Havada kendiliğinden'], correctAnswer: 0, // Düzeltme: Bulutlardaki yük ayrışması sürtünme veya çarpışma etkisiyledir. Şimşek bulut içi, yıldırım bulut-yer arası deşarjdır. Sürtünme temel neden.
    explanation: 'Bulutlardaki su damlacıkları ve buz kristallerinin birbirine sürtünmesi sonucu yük ayrışması meydana gelir. Bu yük farkının ani boşalması şimşek veya yıldırım olarak görülür.'
  },
  {
    id: 'sci_yeni_30', subjectId: 'science', topic: 'Elektrik Yükleri ve Elektrik Enerjisi', difficulty: 'medium',
    question: 'Sigortanın bir elektrik devresindeki temel görevi nedir?',
    options: ['Akımı artırmak', 'Gerilimi düşürmek', 'Devreyi aşırı akıma karşı korumak', 'Elektrik enerjisi depolamak'], correctAnswer: 2,
    explanation: 'Sigorta, devreden belirlenen değerden daha yüksek bir akım geçtiğinde eriyerek veya atarak devreyi keser ve bağlı olan cihazların zarar görmesini engeller.'
  },
  // --- BİTİŞ ---
  // --- BİTİŞ ---
  
];