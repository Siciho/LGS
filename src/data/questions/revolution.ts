// src/data/revolution.ts
import { Question } from "@/types";

export const revolutionQuestions: Question[] = [
  {
    id: 'og_ink_1', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'medium', // Mapped based on content
    question: 'Aşağıdakilerden hangisi Sivas Kongresi’nde alınan kararlardan biri değildir?',
    options: ['Manda ve himayenin kesin olarak reddedilmesi','Tüm cemiyetlerin tek çatı altında birleştirilmesi','Temsil Heyeti\'nin oluşturulması','Türkiye Büyük Millet Meclisi\'nin açılması'], correctAnswer: 3,
    explanation: 'TBMM, Sivas Kongresi\'nden sonra, 23 Nisan 1920\'de Ankara\'da açılmıştır. Kongrenin kararı değildir.'
  },
  {
    id: 'og_ink_2', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy',
    question: '“Egemenlik, kayıtsız şartsız milletindir.” sözü Atatürk ilkelerinden hangisiyle doğrudan ilgilidir?',
    options: ['Laiklik', 'Devletçilik', 'Cumhuriyetçilik', 'İnkılapçılık'], correctAnswer: 2,
    explanation: 'Egemenliğin millete ait olması, Cumhuriyetçilik ilkesinin temelini oluşturur.'
  },
  {
    id: 'og_ink_3', subjectId: 'revolution', topic: 'Cepheler', difficulty: 'medium',
    question: 'Kurtuluş Savaşı’nda Batı Cephesi’nde kazanılan ilk askeri zafer aşağıdakilerden hangisidir?',
    options: ['Sakarya Meydan Muharebesi', 'Büyük Taarruz', 'I. İnönü Muharebesi', 'II. İnönü Muharebesi'], correctAnswer: 2,
    explanation: 'Batı Cephesi\'nde kazanılan ilk zafer, I. İnönü Muharebesi\'dir. (6-10 Ocak 1921)'
  },
  {
    id: 'og_ink_4', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'easy', // Mapped based on content
    question: 'Aşağıdakilerden hangisi Amasya Genelgesi\'nin en önemli maddelerinden biridir?',
    options: ['Vatanın bütünlüğü milletin azim ve kararı kurtaracaktır.','Manda ve himaye kabul edilemez.','Kuvay-i Milliye\'yi kurmak.','Milli sınırlar içinde vatan bir bütündür.'], correctAnswer: 0,
    explanation: 'Amasya Genelgesi\'nin bu maddesi, ilk kez "milletin azim ve kararı"ndan bahsederek milli egemenlik fikrine işaret etmesi açısından önemlidir.'
  },
  {
    id: 'og_ink_5', subjectId: 'revolution', topic: 'Lozan Antlaşması', difficulty: 'medium',
    question: 'Lozan Barış Konferansı\'nda Türkiye\'yi temsil eden heyetin başkanı kimdir?',
    options: ['Mustafa Kemal Paşa','İsmet İnönü','Fevzi Çakmak','Kazım Karabekir'], correctAnswer: 1,
    explanation: 'Lozan Barış Konferansı\'nda Türk heyetinin başkanı İsmet İnönü olmuştur.'
  },
  {
    id: 'og_ink_7', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'easy', // Mapped based on content
    question: 'Kurtuluş Savaşı sırasında yayımlanan hangi genelge “milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır” ifadesini içermektedir?',
    options: ['Havza Genelgesi', 'Amasya Genelgesi', 'Erzurum Kongresi', 'Sivas Kongresi'],
    correctAnswer: 1,
    explanation: 'Amasya Genelgesi, Kurtuluş Savaşı\'nın amacını ve yöntemini belirten bu önemli ifadeyi içerir.'
  },
  {
    id: 'og_ink_8', subjectId: 'revolution', topic: 'Misak-ı Milli', difficulty: 'medium',
    question: 'Misak-ı Milli kararları hangi mecliste kabul edilmiştir?',
    options: ['TBMM', 'İstanbul Mebusan Meclisi', 'Erzurum Kongresi', 'Sivas Kongresi'],
    correctAnswer: 1,
    explanation: 'Misak-ı Milli, son Osmanlı Mebusan Meclisi\'nde kabul edilmiştir.'
  },
  {
     id: 'og_ink_9', subjectId: 'revolution', topic: 'Eğitim İnkılapları', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Tevhid-i Tedrisat Kanunu’nun (Öğretim Birliği Yasası) sonuçlarından biridir?',
    options: ['Eğitimde birliğin sağlanması', 'Saltanatın kaldırılması', 'Medreselerin tekrar açılması', 'Harf İnkılabının yapılması'],
    correctAnswer: 0,
    explanation: 'Tevhid-i Tedrisat Kanunu ile ülkedeki tüm eğitim kurumları Milli Eğitim Bakanlığı\'na bağlanarak eğitim ve öğretimde birlik sağlanmıştır.'
    },
  {
    id: 'og_ink_10', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle
    question: 'Atatürk’ün hangi ilkesi halkın kendi iradesiyle yönetime katılmasını esas alır?',
    options: ['Laiklik', 'Halkçılık', 'Devletçilik', 'İnkılapçılık'],
    correctAnswer: 1,
    explanation: 'Halkçılık ilkesi, toplumda eşitliği ve halkın yönetime katılımını hedefler.'
  },
  {
    id: 'og_ink_11', subjectId: 'revolution', topic: 'Sosyal Alanda İnkılaplar', difficulty: 'easy', // Mapped based on content (Health)
    question: 'Atatürk dönemi sağlık alanındaki gelişmelerin temel amacı aşağıdakilerden hangisidir?',
    options: ['Ülkede dini kurallara uygun tedavi sağlamak', 'Halkın yaşam süresini kısaltmak', 'Halk sağlığını korumak ve geliştirmek', 'Yalnızca askerî hastaneleri güçlendirmek'],
    correctAnswer: 2,
    explanation: 'Atatürk dönemi sağlık politikaları, halk sağlığını koruma ve geliştirme amacı gütmüştür.'
  },
  {
    id: 'og_ink_12', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle
    question: '1928’de Anayasa’dan “Devletin dini İslam’dır” ifadesi çıkarılmıştır. Bu gelişme hangi ilkeyle ilgilidir?',
    options: ['Milliyetçilik', 'Laiklik', 'Devletçilik', 'Cumhuriyetçilik'],
    correctAnswer: 1,
    explanation: 'Devletin din işlerinde tarafsız olmasını sağlayan bu değişiklik, Laiklik ilkesinin en önemli adımlarından biridir.'
  },
  {
    id: 'og_ink_13', subjectId: 'revolution', topic: 'Çağdaş Türkiye Yolunda Adımlar', difficulty: 'medium', // Mapped based on content (End of Ottoman)
    question: 'Saltanatın kaldırılması hangi gelişmenin doğrudan sonucudur?',
    options: ['İstanbul’un işgali', 'Osmanlı Devleti’nin resmen sona ermesi', 'Cumhuriyet’in ilanı', 'Halifeliğin kaldırılması'],
    correctAnswer: 1,
    explanation: 'Saltanatın kaldırılmasıyla Osmanlı Devleti\'nin siyasi varlığı resmen sona ermiştir.'
  },
  {
    id: 'og_ink_14', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası ve Atatürk’ün Ölümü', difficulty: 'easy',
    question: 'Atatürk’ün dış politika anlayışını en iyi yansıtan söz aşağıdakilerden hangisidir?',
    options: ['“Yurtta sulh, cihanda sulh”', '“Ne mutlu Türk’üm diyene”', '“Egemenlik, kayıtsız şartsız milletindir”', '“Hayatta en hakiki mürşit ilimdir”'],
    correctAnswer: 0,
    explanation: '"Yurtta sulh, cihanda sulh" sözü, Atatürk\'ün barışçıl dış politikasını özetler.'
  },
  {
    id: 'og_ink_15', subjectId: 'revolution', topic: 'Lozan Antlaşması', difficulty: 'easy',
    question: 'Kapitülasyonların kaldırılması hangi antlaşma ile gerçekleşmiştir?',
    options: ['Mondros', 'Sevr', 'Lozan', 'Ankara'],
    correctAnswer: 2,
    explanation: 'Kapitülasyonlar, Türkiye\'nin ekonomik bağımsızlığını sağlayan Lozan Barış Antlaşması ile kaldırılmıştır.'
  },
  {
    id: 'og_ink_16', subjectId: 'revolution', topic: 'Cepheler', difficulty: 'medium',
    question: 'Kurtuluş Savaşı’nda düzenli ordunun ilk zaferi aşağıdakilerden hangisidir?',
    options: ['Sakarya Meydan Muharebesi', 'Büyük Taarruz', 'I. İnönü Savaşı', 'II. İnönü Savaşı'],
    correctAnswer: 2,
    explanation: 'Düzenli ordunun Batı Cephesi\'ndeki ilk zaferi, I. İnönü Savaşı olmuştur.'
  },
  {
    id: 'og_ink_17', subjectId: 'revolution', topic: 'İsyanlar ve Suikast Girişimleri', difficulty: 'medium',
    question: 'Şeyh Sait İsyanı’nın çıkış nedeni aşağıdakilerden hangisidir?',
    options: ['Saltanatın kaldırılması', 'Cumhuriyet’in ilanı', 'Laiklik karşıtı hareketler', 'Ekonomik sıkıntılar'],
    correctAnswer: 2,
    explanation: 'Şeyh Sait İsyanı, laiklik karşıtı ve cumhuriyet rejimine muhalif bir ayaklanmadır.'
  },
  {
    id: 'og_ink_18', subjectId: 'revolution', topic: 'Ekonomik İnkılaplar', difficulty: 'medium',
    question: 'Aşağıdaki kuruluşlardan hangisi Atatürk döneminde açılmıştır?',
    options: ['Ziraat Bankası', 'İş Bankası', 'Osmanlı Bankası', 'Merkez Bankası (Osmanlı dönemi)'],
    correctAnswer: 1,
    explanation: 'Türkiye İş Bankası, 1924 yılında Atatürk\'ün talimatıyla kurulmuştur.'
  },
  {
    id: 'og_ink_19', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle (Republic)
    question: 'Cumhuriyet’in ilanıyla aşağıdaki gelişmelerden hangisi doğrudan gerçekleşmiştir?',
    options: ['Saltanatın kaldırılması', 'Halifeliğin kaldırılması', 'Devlet başkanının belirlenmesi', 'Çok partili hayata geçilmesi'],
    correctAnswer: 2,
    explanation: 'Cumhuriyet\'in ilanıyla, devlet başkanlığı sorunu çözülmüş ve Cumhurbaşkanlığı makamı oluşturulmuştur.'
  },
  {
    id: 'og_ink_20', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'medium', // Mapped to broader principle
    question: 'Aşağıdakilerden hangisi Atatürk’ün milliyetçilik anlayışını en iyi açıklar?',
    options: ['Irkçılığa dayalıdır.', 'Din birliğine dayanır.', 'Vatandaşlık bağına dayanır.', 'Sadece kültürel farklılıkları ön plana çıkarır.'],
    correctAnswer: 2,
    explanation: 'Atatürk milliyetçiliği, ırk, din ayrımı gözetmeden vatandaşlık bağına dayanan kapsayıcı bir anlayıştır.'
  },
  {
     id: 'og_ink_21', subjectId: 'revolution', topic: 'Hukuk Alanında İnkılaplar', difficulty: 'medium', // Mapped based on content (Civil Code)
    question: 'Aşağıdaki inkılaplardan hangisi doğrudan toplumsal hayatı düzenlemeye yöneliktir?',
    options: ['Medeni Kanun\'un kabulü', 'Sanayi Teşvik Kanunu\'nun çıkarılması', 'İzmir İktisat Kongresi\'nin toplanması', 'Tevhid-i Tedrisat Kanunu'],
    correctAnswer: 0,
    explanation: 'Medeni Kanun; evlenme, boşanma, miras gibi konularda kadın-erkek eşitliğini getirerek doğrudan toplumsal hayatı düzenlemiştir. Diğer seçenekler daha çok ekonomi ve eğitimle ilgilidir.'
  },
  {
    id: 'og_ink_22', subjectId: 'revolution', topic: 'Ekonomik İnkılaplar', difficulty: 'easy',
    question: 'Atatürk’ün ekonomik alandaki çalışmalarının temel amacı aşağıdakilerden hangisidir?',
    options: ['Dışa bağımlı ekonomi oluşturmak', 'Karma ekonomi modeli geliştirmek', 'Halkın ekonomik gücünü azaltmak', 'Yalnızca tarımsal faaliyetleri geliştirmek'],
    correctAnswer: 1,
    explanation: 'Atatürk dönemi ekonomisi, özel teşebbüsle devletin işbirliğini içeren karma ekonomi modelini benimsemiştir.'
  },
  {
    id: 'og_ink_23', subjectId: 'revolution', topic: 'Antlaşmalar', difficulty: 'medium',
    question: 'Aşağıdaki antlaşmalardan hangisi Kurtuluş Savaşı sırasında imzalanmamıştır?',
    options: ['Moskova Antlaşması', 'Ankara Antlaşması', 'Kars Antlaşması', 'Lozan Antlaşması'],
    correctAnswer: 3,
    explanation: 'Lozan Antlaşması, Kurtuluş Savaşı\'nı bitiren barış antlaşmasıdır, savaş sırasında imzalanmamıştır.'
  },
  {
    id: 'og_ink_24', subjectId: 'revolution', topic: 'Çağdaş Türkiye Yolunda Adımlar', difficulty: 'easy', // Mapped broadly
    question: 'Aşağıdakilerden hangisi Cumhuriyet dönemi inkılaplarının ortak özelliklerinden biridir?',
    options: ['Osmanlı kültürünü güçlendirme', 'Çağdaşlaşmayı hedefleme', 'Saltanatı devam ettirme', 'Dini kurallara bağlı kalma'],
    correctAnswer: 1,
    explanation: 'Tüm inkılapların temel amacı, Türkiye\'yi modern ve çağdaş bir devlet haline getirmektir.'
  },
  {
    id: 'og_ink_25', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle (Laicism)
    question: 'Atatürk’ün “En hakiki mürşit ilimdir, fendir.” sözü hangi ilkeyle ilişkilendirilebilir?',
    options: ['İnkılapçılık', 'Milliyetçilik', 'Laiklik', 'Devletçilik'],
    correctAnswer: 2,
    explanation: 'Bu söz, dinin devlet işlerinden ayrılması ve aklın, bilimin yol gösterici olması anlamına gelen Laiklik ilkesiyle doğrudan ilişkilidir.'
  },
  {
    id: 'og_ink_26', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle (Republicanism)
    question: 'Atatürk’ün “Benim naçiz vücudum elbet bir gün toprak olacaktır; fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır.” sözü hangi ilkeyle ilgilidir?',
    options: ['Cumhuriyetçilik', 'Devletçilik', 'Milliyetçilik', 'Laiklik'],
    correctAnswer: 0,
    explanation: 'Bu söz, Cumhuriyet yönetiminin sürekliliğini ve kalıcılığını vurgular.'
  },
  {
    id: 'og_ink_27', subjectId: 'revolution', topic: 'Lozan Antlaşması', difficulty: 'medium',
    question: 'Lozan Antlaşması’nda Türkiye’nin lehine çözümlenen konulardan biri aşağıdakilerden hangisidir?',
    options: ['Kapitülasyonların kaldırılması', 'Boğazların tamamen Türk egemenliğine bırakılması', 'Musul’un Türkiye’ye bırakılması', 'Azınlıklara siyasi ayrıcalık verilmesi'],
    correctAnswer: 0,
    explanation: 'Kapitülasyonların kaldırılması, Türkiye\'nin ekonomik bağımsızlığını kazanarak lehine çözdüğü önemli bir konudur.'
  },
  {
    id: 'og_ink_28', subjectId: 'revolution', topic: 'Eğitim İnkılapları', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi Atatürk döneminde yapılan kültürel gelişmelerden biridir?',
    options: ['Tevhid-i Tedrisat Kanunu', 'Mecelle’nin uygulanması', 'Saltanatın kaldırılması', 'Halifeliğin kaldırılması'],
    correctAnswer: 0,
    explanation: 'Tevhid-i Tedrisat Kanunu, eğitim ve kültür alanında yapılan önemli bir inkılaptır.'
  },
  {
     id: 'og_ink_29', subjectId: 'revolution', topic: 'Ekonomik İnkılaplar', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Atatürk döneminde yapılan ekonomik gelişmelerden biridir?',
    options: ['İzmir İktisat Kongresi\'nin toplanması', 'Saltanatın kaldırılması', 'Tekke ve zaviyelerin kapatılması', 'Medeni Kanun\'un kabulü'],
    correctAnswer: 0,
    explanation: 'İzmir İktisat Kongresi, yeni Türkiye devletinin ekonomik hedeflerini belirlemek amacıyla toplanmış önemli bir ekonomik gelişmedir.'
  },
  {
    id: 'og_ink_30', subjectId: 'revolution', topic: 'Sosyal Alanda İnkılaplar', difficulty: 'easy',
    question: 'Şapka Kanunu hangi alanda yapılan bir inkılaptır?',
    options: ['Eğitim', 'Kültür', 'Ekonomi', 'Sosyal'],
    correctAnswer: 3,
    explanation: 'Şapka Kanunu, kılık kıyafette modernleşmeyi sağlayarak sosyal alanda yapılan bir inkılaptır.'
  },
  {
    id: 'og_ink_31', subjectId: 'revolution', topic: 'Siyasi Hayat ve Çok Partili Denemeler', difficulty: 'medium',
    question: 'Türkiye Cumhuriyeti’nde ilk çok partili deneme hangi parti ile başlamıştır?',
    options: ['Serbest Cumhuriyet Fırkası', 'Demokrat Parti', 'Terakkiperver Cumhuriyet Fırkası', 'Cumhuriyet Halk Fırkası'],
    correctAnswer: 2,
    explanation: 'Cumhuriyet döneminde ilk çok partili hayata geçiş denemesi, Terakkiperver Cumhuriyet Fırkası ile olmuştur.'
  },
  {
    id: 'og_ink_32', subjectId: 'revolution', topic: 'İsyanlar ve Suikast Girişimleri', difficulty: 'medium',
    question: 'İzmir Suikasti girişiminin amacı nedir?',
    options: ['Cumhuriyeti güçlendirmek', 'Atatürk’ü ortadan kaldırmak', 'Çok partili hayata geçmek', 'Ekonomiyi canlandırmak'],
    correctAnswer: 1,
    explanation: 'İzmir Suikasti, Atatürk\'ü ortadan kaldırarak Cumhuriyet rejimine karşı bir girişimdir.'
  },
  {
    id: 'og_ink_33', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'easy', // Mapped based on content (Erzurum)
    question: 'Atatürk’ün “Milli sınırlar içinde vatan bir bütündür, parçalanamaz.” sözü hangi belgeye aittir?',
    options: ['Erzurum Kongresi', 'Misak-ı Milli', 'Amasya Genelgesi', 'Lozan Antlaşması'],
    correctAnswer: 0,
    explanation: 'Bu söz, ilk kez Erzurum Kongresi\'nde dile getirilmiştir.'
  },
  {
    id: 'og_ink_34', subjectId: 'revolution', topic: 'Siyasi Hayat ve Çok Partili Denemeler', difficulty: 'medium',
    question: 'Türk kadınlarına seçme ve seçilme hakkı hangi yılda verilmiştir?',
    options: ['1924', '1926', '1930', '1934'],
    correctAnswer: 3,
    explanation: 'Türk kadınlarına milletvekili seçme ve seçilme hakkı 1934 yılında verilmiştir.'
  },
  {
    id: 'og_ink_35', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped broadly
    question: '“Atatürk ilke ve inkılaplarının korunması ve yaşatılması” görevi aşağıdaki kurumların hangisine aittir?',
    options: ['TBMM', 'Cumhurbaşkanlığı', 'Anayasa Mahkemesi', 'Türk Silahlı Kuvvetleri'],
    correctAnswer: 3,
    explanation: 'Türk Silahlı Kuvvetleri\'nin anayasal görevlerinden biri, Cumhuriyetin ve Atatürk ilke ve inkılaplarının korunmasıdır.'
  },
  {
    id: 'og_ink_36', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası ve Atatürk’ün Ölümü', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi Atatürk döneminde Türk dış politikasının temel amaçlarından biri değildir?',
    options: ['Tam bağımsızlık', 'Barışçıl ilişkiler', 'Uluslararası işbirliği', 'Yayılmacı siyaset'],
    correctAnswer: 3,
    explanation: 'Atatürk\'ün dış politikası barış ve tam bağımsızlık üzerine kuruludur, yayılmacı bir siyaset izlenmemiştir.'
  },
  {
    id: 'og_ink_37', subjectId: 'revolution', topic: 'Ekonomik İnkılaplar', difficulty: 'medium',
    question: 'Cumhuriyet döneminde çıkarılan Kabotaj Kanunu’nun amacı nedir?',
    options: ['Deniz ticaretini yabancılara açmak', 'Türk denizciliğini geliştirmek', 'Yalnızca askeri deniz gücünü artırmak', 'Balıkçılığı yasaklamak'],
    correctAnswer: 1,
    explanation: 'Kabotaj Kanunu, Türk karasularında denizcilik ve liman işletme haklarını Türk vatandaşlarına vermeyi amaçlamıştır.'
  },
  {
    id: 'og_ink_38', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy', // Mapped to broader principle (Revolutionism)
    question: 'Atatürk’ün hangi ilkesi sürekli yenilik yapmayı ve gelişmeyi esas alır?',
    options: ['Cumhuriyetçilik', 'Halkçılık', 'İnkılapçılık', 'Devletçilik'],
    correctAnswer: 2,
    explanation: 'İnkılapçılık, çağın gereksinimlerine uygun olarak sürekli yenilik ve değişim yapma ilkesidir.'
  },// --- EKİM AYI İÇİN YENİ EKLENEN SORULAR ---
  {
    id: 'rev_ekim_1', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'medium',
    question: 'Erzurum Kongresi\'nde alınan "Manda ve himaye kabul olunamaz." kararı ile aşağıdakilerden hangisi vurgulanmıştır?',
    options: ['Milli egemenlik', 'Tam bağımsızlık', 'Ulusal birlik', 'Çağdaşlaşma'], correctAnswer: 1,
    explanation: 'Manda ve himayenin reddedilmesi, başka bir devletin yönetimi altına girmeyi kabul etmemek anlamına gelir ve doğrudan tam bağımsızlık ilkesiyle ilgilidir.'
  },
  {
    id: 'rev_ekim_2', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'easy',
    question: 'Mustafa Kemal Paşa\'nın Samsun\'a çıkışının temel amacı neydi?',
    options: ['Yeni bir devlet kurmak', 'Padişaha bağlılığını bildirmek', 'Milli Mücadele\'yi başlatmak', 'İtilaf Devletleri ile anlaşmak'], correctAnswer: 2,
    explanation: 'Mustafa Kemal\'in 19 Mayıs 1919\'da Samsun\'a çıkışı, Anadolu\'da işgallere karşı milli bir direniş örgütlemek ve Kurtuluş Savaşı\'nı başlatmak amacını taşıyordu.'
  },// --- YIL BOYU İÇİN YENİ EKLENEN SORULAR (30 ADET) ---
  {
    id: 'rev_yeni_1', subjectId: 'revolution', topic: 'Bir Kahraman Doğuyor', difficulty: 'easy',
    question: 'Mustafa Kemal\'in ilk askeri başarısını kazandığı savaş aşağıdakilerden hangisidir?',
    options: ['Trablusgarp Savaşı', 'Balkan Savaşları', 'Çanakkale Savaşı', 'Kurtuluş Savaşı'], correctAnswer: 0,
    explanation: 'Mustafa Kemal, Trablusgarp Savaşı\'nda (1911-1912) İtalyanlara karşı Tobruk ve Derne\'de başarılı savunmalar yaparak ilk askeri başarısını kazanmıştır.'
  },
  {
    id: 'rev_yeni_2', subjectId: 'revolution', topic: 'Bir Kahraman Doğuyor', difficulty: 'medium',
    question: 'Mustafa Kemal\'in Harp Akademisi\'nden mezun olduktan sonra ilk görev yeri neresidir?',
    options: ['Selanik', 'Manastır', 'İstanbul', 'Şam'], correctAnswer: 3,
    explanation: 'Mustafa Kemal, 1905 yılında Kurmay Yüzbaşı rütbesiyle Harp Akademisi\'nden mezun olmuş ve ilk görev yeri olan Şam\'daki 5. Ordu\'ya atanmıştır.'
  },
  {
    id: 'rev_yeni_3', subjectId: 'revolution', topic: 'Bir Kahraman Doğuyor', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Mustafa Kemal\'in fikir hayatını etkileyen şehirlerden biri değildir?',
    options: ['Selanik', 'Manastır', 'Sofya', 'Ankara'], correctAnswer: 3,
    explanation: 'Selanik (doğduğu şehir), Manastır (askeri idadi), İstanbul (harp okulu/akademisi) ve Sofya (askeri ataşelik) Mustafa Kemal\'in fikir hayatının gelişiminde önemli rol oynamıştır. Ankara, Milli Mücadele\'nin merkezi olmasıyla önemlidir ancak fikir hayatının ilk şekillendiği şehirlerden değildir.'
  },
  {
    id: 'rev_yeni_4', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'easy',
    question: 'I. Dünya Savaşı sonunda Osmanlı Devleti ile İtilaf Devletleri arasında imzalanan ateşkes antlaşması hangisidir?',
    options: ['Sevr Antlaşması', 'Lozan Antlaşması', 'Mondros Ateşkes Antlaşması', 'Mudanya Ateşkes Antlaşması'], correctAnswer: 2,
    explanation: 'Osmanlı Devleti, I. Dünya Savaşı\'ndan Mondros Ateşkes Antlaşması\'nı (30 Ekim 1918) imzalayarak çekilmiştir.'
  },
  {
    id: 'rev_yeni_5', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'medium',
    question: 'Mondros Ateşkes Antlaşması\'nın 7. maddesinin İtilaf Devletleri açısından önemi nedir?',
    options: ['Osmanlı ordusunun terhis edilmesi', 'Boğazların kontrolünün İtilaf Devletleri\'ne geçmesi', 'İşgallere hukuki zemin hazırlaması', 'Osmanlı haberleşmesine el konulması'], correctAnswer: 2,
    explanation: '7. madde ("İtilaf Devletleri, güvenliklerini tehdit edecek bir durum ortaya çıkarsa herhangi bir stratejik noktayı işgal etme hakkına sahip olacaktır.") İtilaf Devletleri\'nin Anadolu\'yu işgal etmelerine hukuki bir gerekçe oluşturmuştur.'
  },
  {
    id: 'rev_yeni_6', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'medium',
    question: 'İzmir\'in Yunanlılar tarafından işgaline ilk tepki olarak "Hukuk-u Beşer" gazetesinde yazdığı yazıyla tanınan ve işgal sırasında şehit edilen gazeteci kimdir?',
    options: ['Hasan Tahsin', 'Ali Kemal', 'Refik Halit Karay', 'Ahmet Emin Yalman'], correctAnswer: 0,
    explanation: 'Gerçek adı Osman Nevres olan Hasan Tahsin, İzmir\'in işgaline ilk kurşunu atarak direnişi başlatan ve orada şehit edilen gazetecidir.'
  },
  {
    id: 'rev_yeni_7', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'hard',
    question: 'Mustafa Kemal Paşa\'nın Samsun\'a gönderilmesindeki resmi görevi neydi?',
    options: ['Milli Mücadele\'yi başlatmak', 'Kongreler düzenlemek', '9. Ordu Müfettişi olarak bölgedeki asayişi sağlamak', 'Padişah adına İtilaf Devletleri ile görüşmek'], correctAnswer: 2,
    explanation: 'Mustafa Kemal Paşa, İstanbul Hükümeti tarafından resmi olarak 9. Ordu Müfettişi sıfatıyla, Karadeniz Bölgesi\'ndeki karışıklıkları önlemek ve Mondros Ateşkesi\'nin hükümlerini uygulamak üzere görevlendirilmiştir.'
  },
  {
    id: 'rev_yeni_8', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi Erzurum Kongresi\'nde alınan kararlardan biridir?',
    options: ['TBMM\'nin açılması', 'Milli sınırlar içinde vatanın bir bütün olduğu', 'Saltanatın kaldırılması', 'Tekalif-i Milliye emirlerinin yayınlanması'], correctAnswer: 1,
    explanation: '"Milli sınırlar içinde vatan bir bütündür, parçalanamaz." ilkesi ilk kez Erzurum Kongresi\'nde kabul edilmiştir.'
  },
  {
    id: 'rev_yeni_9', subjectId: 'revolution', topic: 'Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar', difficulty: 'medium',
    question: 'Temsil Heyeti\'nin yürütme gücünü kullanarak Ali Fuat Paşa\'yı Batı Cephesi Komutanlığı\'na ataması hangi kongreden sonra gerçekleşmiştir?',
    options: ['Amasya Genelgesi', 'Erzurum Kongresi', 'Sivas Kongresi', 'Alaşehir Kongresi'], correctAnswer: 2,
    explanation: 'Sivas Kongresi\'nde Temsil Heyeti\'nin yetkileri tüm yurdu kapsayacak şekilde genişletilmiş ve Heyet, hükümet gibi hareket ederek Ali Fuat Paşa\'yı Batı Cephesi Komutanlığı\'na atamıştır.'
  },
  {
    id: 'rev_yeni_10', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'easy',
    question: 'Kurtuluş Savaşı\'nda Güney Cephesi\'nde hangi devlete karşı mücadele edilmiştir?',
    options: ['İngiltere', 'Yunanistan', 'İtalya', 'Fransa'], correctAnswer: 3,
    explanation: 'Güney Cephesi\'nde (Antep, Maraş, Urfa savunmaları) Fransızlara ve onlarla işbirliği yapan Ermeni çetelerine karşı Kuva-yı Milliye birlikleri mücadele etmiştir.'
  },
  {
    id: 'rev_yeni_11', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'medium',
    question: 'Düzenli ordunun kurulmasından sonra Batı Cephesi\'nde Yunanlılara karşı kazanılan ilk zafer hangisidir?',
    options: ['I. İnönü Muharebesi', 'II. İnönü Muharebesi', 'Sakarya Meydan Muharebesi', 'Büyük Taarruz'], correctAnswer: 0,
    explanation: 'TBMM tarafından kurulan düzenli ordunun Batı Cephesi\'ndeki ilk askeri başarısı I. İnönü Muharebesi\'dir.'
  },
  {
    id: 'rev_yeni_12', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'hard',
    question: 'Mustafa Kemal Paşa\'ya "Mareşal" rütbesi ve "Gazi" unvanı hangi savaştan sonra verilmiştir?',
    options: ['I. İnönü Muharebesi', 'Kütahya-Eskişehir Muharebeleri', 'Sakarya Meydan Muharebesi', 'Büyük Taarruz'], correctAnswer: 2,
    explanation: 'Sakarya Meydan Muharebesi\'nin kazanılmasından sonra TBMM tarafından Başkomutan Mustafa Kemal Paşa\'ya Mareşal rütbesi ve Gazi unvanı verilmiştir.'
  },
  {
    id: 'rev_yeni_13', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'medium',
    question: 'Kurtuluş Savaşı\'nın askeri safhasını sona erdiren ve diplomatik sürecini başlatan antlaşma hangisidir?',
    options: ['Mondros Ateşkes Antlaşması', 'Mudanya Ateşkes Antlaşması', 'Lozan Barış Antlaşması', 'Ankara Antlaşması'], correctAnswer: 1,
    explanation: 'Büyük Taarruz\'un ardından imzalanan Mudanya Ateşkes Antlaşması (11 Ekim 1922) ile Kurtuluş Savaşı\'nın silahlı mücadele dönemi sona ermiş ve Lozan Barış Konferansı\'na giden yol açılmıştır.'
  },
  {
    id: 'rev_yeni_14', subjectId: 'revolution', topic: 'Atatürkçülük ve Çağdaşlaşan Türkiye', difficulty: 'easy',
    question: '"Akıl ve bilimi rehber edinme" hangi Atatürk ilkesinin temelini oluşturur?',
    options: ['Cumhuriyetçilik', 'Milliyetçilik', 'Laiklik', 'Devletçilik'], correctAnswer: 2,
    explanation: 'Laiklik, devlet yönetiminde ve toplumsal yaşamda din kuralları yerine akıl ve bilimin temel alınmasını ifade eder.'
  },
  {
    id: 'rev_yeni_15', subjectId: 'revolution', topic: 'Atatürkçülük ve Çağdaşlaşan Türkiye', difficulty: 'medium',
    question: 'Halkçılık ilkesi doğrultusunda yapılan inkılaplardan hangisi, toplumda ayrıcalık belirten unvanları kaldırmıştır?',
    options: ['Medeni Kanun\'un Kabulü', 'Soyadı Kanunu', 'Şapka Kanunu', 'Tekke ve Zaviyelerin Kapatılması'], correctAnswer: 1,
    explanation: 'Soyadı Kanunu (1934) ile Ağa, Hacı, Hafız, Hoca, Molla, Efendi, Bey, Beyefendi, Paşa, Hanım, Hanımefendi vb. lakap ve unvanlar kaldırılarak toplumsal eşitliğin sağlanması amaçlanmıştır.'
  },
  {
    id: 'rev_yeni_16', subjectId: 'revolution', topic: 'Atatürkçülük ve Çağdaşlaşan Türkiye', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi eğitim alanında yapılan inkılaplardan biri değildir?',
    options: ['Tevhid-i Tedrisat Kanunu', 'Harf İnkılabı', 'Türk Tarih Kurumu\'nun kurulması', 'Kabotaj Kanunu'], correctAnswer: 3,
    explanation: 'Kabotaj Kanunu, Türk karasularında denizcilik haklarının Türklere verilmesiyle ilgili olup ekonomi alanında yapılan bir inkılaptır.'
  },
  {
    id: 'rev_yeni_17', subjectId: 'revolution', topic: 'Atatürkçülük ve Çağdaşlaşan Türkiye', difficulty: 'hard',
    question: 'Türk Medeni Kanunu\'nun kabul edilmesiyle kadınlar aşağıdaki haklardan hangisini elde etmemiştir?',
    options: ['Miras hukukunda erkeklerle eşitlik', 'Resmi nikah zorunluluğu', 'İstediği mesleğe girebilme hakkı', 'Seçme ve seçilme hakkı'], correctAnswer: 3,
    explanation: 'Medeni Kanun (1926) kadınlara sosyal ve hukuki alanda önemli haklar tanımış ancak siyasi haklar (seçme ve seçilme) daha sonraki yıllarda (1930\'larda) verilmiştir.'
  },
  {
    id: 'rev_yeni_18', subjectId: 'revolution', topic: 'Demokratikleşme Çabaları', difficulty: 'medium',
    question: 'Cumhuriyet\'in ilk yıllarında kurulan Terakkiperver Cumhuriyet Fırkası\'nın kapatılmasında etkili olan olay hangisidir?',
    options: ['Menemen Olayı', 'Şeyh Sait İsyanı', 'İzmir Suikastı Girişimi', 'Bursa Olayı'], correctAnswer: 1,
    explanation: 'Doğu Anadolu\'da çıkan Şeyh Sait İsyanı\'nın ardından, isyanla bağlantısı olduğu gerekçesiyle Takrir-i Sükûn Kanunu\'na dayanılarak Terakkiperver Cumhuriyet Fırkası kapatılmıştır.'
  },
  {
    id: 'rev_yeni_19', subjectId: 'revolution', topic: 'Demokratikleşme Çabaları', difficulty: 'easy',
    question: 'Atatürk\'ün çok partili hayata geçiş denemeleri yapmasının temel nedeni nedir?',
    options: ['Kendi gücünü artırmak', 'Farklı fikirlerin yönetime yansımasını sağlamak', 'Tek parti yönetimini güçlendirmek', 'İnkılapları hızlandırmak'], correctAnswer: 1,
    explanation: 'Atatürk, demokrasinin tam olarak işleyebilmesi için farklı görüşlerin temsil edildiği çok partili sistemin gerekliliğine inanıyordu.'
  },
  {
    id: 'rev_yeni_20', subjectId: 'revolution', topic: 'Demokratikleşme Çabaları', difficulty: 'medium',
    question: 'Aşağıdaki partilerden hangisi Atatürk döneminde kurulmamıştır?',
    options: ['Cumhuriyet Halk Fırkası', 'Terakkiperver Cumhuriyet Fırkası', 'Serbest Cumhuriyet Fırkası', 'Demokrat Parti'], correctAnswer: 3,
    explanation: 'Demokrat Parti, Atatürk\'ün vefatından sonra, 1946 yılında kurulmuştur.'
  },
  {
    id: 'rev_yeni_21', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası', difficulty: 'medium',
    question: 'Türkiye\'nin Milletler Cemiyeti\'ne (Cemiyet-i Akvam) üye olması hangi dış politika ilkesiyle doğrudan ilgilidir?',
    options: ['Tam bağımsızlık', 'Barışçılık ve uluslararası işbirliği', 'Milli menfaatleri koruma', 'Yayılmacılık'], correctAnswer: 1,
    explanation: 'Türkiye\'nin Milletler Cemiyeti\'ne üye olması, dünya barışına katkıda bulunma ve diğer ülkelerle işbirliği yapma arzusunu gösterir.'
  },
  {
    id: 'rev_yeni_22', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası', difficulty: 'hard',
    question: 'Montrö Boğazlar Sözleşmesi (1936) ile Türkiye hangi hakkı elde etmiştir?',
    options: ['Musul\'u geri alma hakkı', 'Boğazlar üzerinde tam egemenlik hakkı', 'Hatay\'ı anavatana katma hakkı', 'Kapitülasyonları kaldırma hakkı'], correctAnswer: 1,
    explanation: 'Montrö Boğazlar Sözleşmesi ile Lozan\'da kurulan uluslararası Boğazlar Komisyonu kaldırılmış, Boğazların savunması ve kontrolü tamamen Türkiye\'ye bırakılmıştır.'
  },
  {
    id: 'rev_yeni_23', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası', difficulty: 'medium',
    question: 'Atatürk döneminde Hatay\'ın anavatana katılması sürecinde izlenen temel politika ne olmuştur?',
    options: ['Askeri müdahale', 'Uluslararası hukuka uygun barışçıl yollar', 'Milletler Cemiyeti\'nden ayrılma', 'Fransa ile savaşma'], correctAnswer: 1,
    explanation: 'Hatay sorunu, Atatürk\'ün diplomatik çabaları ve uluslararası hukuka uygun girişimleri sonucunda barışçıl yollarla çözülmüş ve Hatay 1939\'da Türkiye\'ye katılmıştır.'
  },
  {
    id: 'rev_yeni_24', subjectId: 'revolution', topic: 'Atatürk Dönemi Türk Dış Politikası', difficulty: 'medium',
    question: 'Balkan Antantı\'nın (1934) kurulmasının temel amacı nedir?',
    options: ['Sovyetler Birliği\'ne karşı birleşmek', 'Balkanlardaki sınırları karşılıklı olarak güvence altına almak', 'Ekonomik işbirliğini geliştirmek', 'Yayılmacı politikalara karşı ortak savunma yapmak'], correctAnswer: 1, // Düzeltme: D şıkkı da doğru sayılabilir. Ama temel amaç sınır güvenliği idi.
    explanation: 'Türkiye, Yunanistan, Yugoslavya ve Romanya arasında imzalanan Balkan Antantı, özellikle Almanya ve İtalya\'nın yayılmacı politikalarına karşı Balkan ülkelerinin sınırlarını karşılıklı olarak güvence altına almayı amaçlamıştır.'
  },
  {
    id: 'rev_yeni_25', subjectId: 'revolution', topic: 'Atatürk’ün Ölümü ve Sonrası', difficulty: 'easy',
    question: 'Atatürk\'ün naaşı, Etnografya Müzesi\'nden sonra hangi anıtsal yapıya nakledilmiştir?',
    options: ['Anıtkabir', 'Dolmabahçe Sarayı', 'Samsun Atatürk Anıtı', 'TBMM'], correctAnswer: 0,
    explanation: 'Atatürk\'ün naaşı, 1953 yılında yapımı tamamlanan Anıtkabir\'e nakledilmiştir.'
  },
  {
    id: 'rev_yeni_26', subjectId: 'revolution', topic: 'Atatürk’ün Ölümü ve Sonrası', difficulty: 'medium',
    question: 'II. Dünya Savaşı sırasında Türkiye\'nin izlediği temel dış politika ne olmuştur?',
    options: ['Almanya\'nın yanında savaşa girmek', 'Sovyetler Birliği ile ittifak yapmak', 'Tarafsız kalarak savaşa girmemeye çalışmak', 'İngiltere ve Fransa\'nın yanında savaşa girmek'], correctAnswer: 2,
    explanation: 'Türkiye, II. Dünya Savaşı boyunca aktif olarak savaşa katılmamış, denge politikası izleyerek tarafsız kalmaya çalışmıştır. Savaşın sonlarına doğru Müttefikler yanında sembolik olarak savaşa girmiştir.'
  },
  {
    id: 'rev_yeni_27', subjectId: 'revolution', topic: 'Atatürkçülük', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi Atatürkçü Düşünce Sistemi\'nin niteliklerinden biri değildir?',
    options: ['Akılcı ve bilimsel olması', 'Evrensel değerleri benimsemesi', 'Dogmatik ve değişmez olması', 'Milli birlik ve beraberliği esas alması'], correctAnswer: 2,
    explanation: 'Atatürkçülük, dogmatik (sorgulanamaz, değişmez) değildir; tam aksine akılcılığa, bilimselliğe ve çağın gereklerine göre kendini yenilemeye dayanır.'
  },
  {
    id: 'rev_yeni_28', subjectId: 'revolution', topic: 'Bir Kahraman Doğuyor', difficulty: 'medium',
    question: 'Mustafa Kemal\'in Çanakkale Cephesi\'ndeki başarısı onun hangi özelliğini ön plana çıkarmıştır?',
    options: ['İleri görüşlülüğü', 'Sanatseverliği', 'Askeri dehası ve liderliği', 'Eğitimciliği'], correctAnswer: 2,
    explanation: 'Mustafa Kemal\'in Anafartalar\'da ve diğer bölgelerdeki komutanlığı sırasındaki doğru stratejileri ve askerlerine verdiği "Size savaşmayı değil, ölmeyi emrediyorum!" emri, onun askeri dehasını ve liderlik vasıflarını göstermiştir.'
  },
  {
    id: 'rev_yeni_29', subjectId: 'revolution', topic: 'Milli Bir Destan; Ya İstiklal Ya Ölüm', difficulty: 'medium',
    question: 'Kütahya-Eskişehir Muharebeleri sonrasında ordunun ihtiyaçlarını karşılamak için çıkarılan emirler aşağıdakilerden hangisidir?',
    options: ['Teşkilat-ı Esasiye Kanunu', 'Takrir-i Sükûn Kanunu', 'Tekalif-i Milliye Emirleri', 'Hıyanet-i Vataniye Kanunu'], correctAnswer: 2,
    explanation: 'Sakarya Savaşı öncesinde, ordunun acil ihtiyaçlarını halkın yardımıyla karşılamak amacıyla Başkomutan Mustafa Kemal Paşa tarafından Tekalif-i Milliye (Milli Yükümlülükler) Emirleri yayınlanmıştır.'
  },
  {
    id: 'rev_yeni_30', subjectId: 'revolution', topic: 'Atatürkçülük ve Çağdaşlaşan Türkiye', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi, Atatürk\'ün "Hayatta en hakiki mürşit ilimdir, fendir." sözüyle doğrudan ilgilidir?',
    options: ['Milli egemenlik', 'Akılcılık ve bilimsellik', 'Tam bağımsızlık', 'Milli birlik'], correctAnswer: 1,
    explanation: 'Bu söz, hayatta yol gösterici olarak dogma ve hurafeler yerine aklı, bilimi ve teknolojiyi kabul etmenin önemini vurgular.'
  },
  // --- BİTİŞ ---
  // --- BİTİŞ ---
];