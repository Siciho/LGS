// src/data/english.ts
import { Question } from "@/types";

export const englishQuestions: Question[] = [
  {
    id: 'og_ing_1', subjectId: 'english', topic: 'Friendship', difficulty: 'easy',
    question: 'A: Shall we watch a sci-fi movie tonight? B: ____. I don\'t like them. How about a comedy?',
    options: ['That sounds great!','I\'d love to, but I can\'t.','No, thanks.','Awesome!'], correctAnswer: 2,
    explanation: '"I don\'t like them" (Onları sevmiyorum) ifadesi, B\'nin teklifi reddettiğini gösterir. "No, thanks." (Hayır, teşekkürler) en uygun cevaptır.'
  },// --- EKİM AYI İÇİN YENİ EKLENEN SORULAR ---
  {
    id: 'eng_ekim_1', subjectId: 'english', topic: 'Teen Life', difficulty: 'medium',
    question: 'Which phrase is commonly used to express preference?',
    options: ['I am fond of...', 'I prefer...', 'I can\'t stand...', 'I am crazy about...'], correctAnswer: 1,
    explanation: '"I prefer..." (Tercih ederim...) is directly used to state a preference between options. "Fond of" and "crazy about" express liking, while "can\'t stand" expresses dislike.'
  },
  {
    id: 'eng_ekim_2', subjectId: 'english', topic: 'Teen Life', difficulty: 'easy',
    question: 'Your friend suggests listening to heavy metal music, but you don\'t like it. What can you say politely?',
    options: ['That sounds terrific!', 'No way! It\'s unbearable.', 'I\'m sorry, but I\'m not really into heavy metal.', 'Heavy metal? Awesome!'], correctAnswer: 2,
    explanation: '"I\'m sorry, but I\'m not really into..." is a polite way to refuse or state that you don\'t like something. Options A and D accept the offer. Option B is impolite.'
  },
  // --- BİTİŞ ---
  {
    id: 'og_ing_2', subjectId: 'english', topic: 'In the Kitchen', difficulty: 'medium',
    question: 'Which tool do you use to peel a potato?',
    options: ['A grater', 'A peeler', 'A whisk', 'A rolling pin'], correctAnswer: 1,
    explanation: 'A peeler, patates soymak için kullanılan araçtır. Diğerleri: grater (rende), whisk (çırpıcı), rolling pin (oklava).'
  },
  {
    id: 'og_ing_3', subjectId: 'english', topic: 'General Grammar', difficulty: 'medium', // Mapped to General Grammar
    question: 'I ____ my homework yesterday, so I can relax now.',
    options: ['finish', 'finishes', 'finished', 'am finishing'], correctAnswer: 2,
    explanation: '"Yesterday" (dün) kelimesi cümlenin geçmiş zamanda olduğunu gösterir. Bu yüzden fiilin geçmiş zaman hali olan "finished" doğru cevaptır.'
  },
  {
    id: 'og_ing_4', subjectId: 'english', topic: 'The Internet', difficulty: 'easy', // Re-mapped to The Internet based on content
    question: "Sandra believes that the Internet is useful but Mark doesn't think so. According to the information above, which of the following would Mark say?",
    options: ['It is the easiest way of contacting our classmates.','Students spend too much time on social media.','Shopping and paying the bills online make my life easier.','It helps us to find a lot of information.'], correctAnswer: 1,
    explanation: 'Sandra internetin faydalı olduğunu düşünürken, Mark aksini düşünüyor. Bu yüzden Mark\'ın internetin olumsuz yönünü belirten bir şey söylemesi gerekir. "Students spend too much time on social media." (Öğrenciler sosyal medyada çok fazla zaman harcıyor) olumsuz bir ifadedir.'
  },
  {
    id: 'og_ing_5', subjectId: 'english', topic: 'Friendship', difficulty: 'easy',
    question: "Read the opinions of four people about their friends. Who says something POSITIVE? Alex: 'Tim doesn't forget to organize parties for my birthdays.' Fred: 'I don't like spending time with Joe.' Jill: 'I don't trust Betty.' Sally: 'Ashley doesn't support me.'",
    options: ['Alex', 'Fred', 'Jill', 'Sally'], correctAnswer: 0,
    explanation: 'Olumlu bir şey söyleyen Alex\'tir. Fred, Jill ve Sally olumsuz ifadeler kullanmıştır.'
  },
  {
    id: 'og_ing_6', subjectId: 'english', topic: 'In the Kitchen', difficulty: 'medium',
    question: 'What do you use a "whisk" for in the kitchen?',
    options: ['To chop vegetables.','To slice bread.','To beat eggs.','To peel potatoes.'], correctAnswer: 2,
    explanation: 'A whisk is used to beat eggs or other ingredients, like cream or sauces.'
  },
  {
    id: 'og_ing_7', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Tom: “What do you usually do after school?”\n\nJack: “_____”',
    options: ['I usually play basketball.', 'I never eat breakfast.', 'I went to the cinema yesterday.', 'It is raining outside.'],
    correctAnswer: 0,
    explanation: 'Genel bir soruya, bir alışkanlığı anlatan Present Simple (Geniş Zaman) ile cevap verilmelidir.'
  },
  {
    id: 'og_ing_8', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which one is an invitation?',
    options: ['Let’s go to the park this afternoon.', 'I usually have lunch at school.', 'I watched TV last night.', 'It is very cold today.'],
    correctAnswer: 0,
    explanation: '"Let’s" kalıbı, bir davet veya öneri ifade etmek için kullanılır.'
  },
  {
    id: 'og_ing_9', subjectId: 'english', topic: 'General Grammar', difficulty: 'medium',
    question: '“Mary is interested in _____ books.”',
    options: ['read', 'reading', 'reads', 'to read'],
    correctAnswer: 1,
    explanation: '"interested in" ifadesi bir edat (preposition) ile kullanıldığından, fiil "-ing" takısı alarak gerund haline gelir.'
  },
  {
    id: 'og_ing_10', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which option completes the dialogue?\n\nA: “Would you like some tea?”\nB: “_____”',
    options: ['Yes, please.', 'I don’t like football.', 'It’s on the table.', 'She is my sister.'],
    correctAnswer: 0,
    explanation: '"Would you like...?" şeklinde yapılan bir teklife kibar bir şekilde "Yes, please." (Evet, lütfen) diye cevap verilir.'
  },
  {
    id: 'og_ing_11', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Ali: “How often do you go swimming?”\n\nEce: “_____”',
    options: ['In the swimming pool.', 'Twice a week.', 'Because I like it.', 'Yesterday.'],
    correctAnswer: 1,
    explanation: '"How often" (Ne sıklıkla) sorusu, bir eylemin sıklığını sorar. Cevap, sıklık belirten bir ifade olmalıdır.'
  },
  {
    id: 'og_ing_12', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“_____ is the capital city of Turkey.”',
    options: ['Ankara', 'İstanbul', 'İzmir', 'Bursa'],
    correctAnswer: 0,
    explanation: 'Türkiye\'nin başkenti Ankara\'dır.'
  },
  {
    id: 'og_ing_13', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“Look! The children _____ football in the garden.”',
    options: ['play', 'are playing', 'played', 'will play'],
    correctAnswer: 1,
    explanation: '"Look!" (Bak!) ifadesi, eylemin konuşma anında devam ettiğini gösterir. Bu yüzden Present Continuous Tense kullanılır.'
  },
  {
    id: 'og_ing_14', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Choose the correct sentence.',
    options: ['She can sings very well.', 'She cans sing very well.', 'She can sing very well.', 'She sing can very well.'],
    correctAnswer: 2,
    explanation: '"can" modal fiili, fiilin yalın haliyle kullanılır ve tekil üçüncü şahıs (She) için "-s" takısı almaz.'
  },
  {
    id: 'og_ing_15', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which one is NOT a means of transportation?',
    options: ['Train', 'Bicycle', 'Elephant', 'Bus'],
    correctAnswer: 2,
    explanation: 'Train (tren), Bicycle (bisiklet) ve Bus (otobüs) birer ulaşım aracıdır, ancak Elephant (fil) değildir.'
  },
  {
    id: 'og_ing_16', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“_____ you like to come to my birthday party?”',
    options: ['Do', 'Would', 'Are', 'Is'],
    correctAnswer: 1,
    explanation: 'Birini bir şeye davet ederken "Would you like to...?" kalıbı kullanılır.'
  },
  {
    id: 'og_ing_17', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“Yesterday” is used with which tense?',
    options: ['Present Continuous', 'Past Simple', 'Future Simple', 'Present Perfect'],
    correctAnswer: 1,
    explanation: '"Yesterday" (dün) kelimesi, tamamlanmış bir geçmiş zaman eylemini ifade eder. Bu yüzden Past Simple Tense ile kullanılır.'
  },
  {
    id: 'og_ing_18', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which sentence is correct?',
    options: ['He doesn’t likes pizza.', 'He don’t like pizza.', 'He doesn’t like pizza.', 'He not like pizza.'],
    correctAnswer: 2,
    explanation: 'Tekil üçüncü şahıs (He) ile olumsuz cümle kurarken "doesn\'t" kullanılır ve fiil yalın halde ("like") kalır.'
  },
  {
    id: 'og_ing_19', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which of the following is a question?',
    options: ['I am fine.', 'Are you okay?', 'She is at home.', 'They are students.'],
    correctAnswer: 1,
    explanation: 'Cümle sonunda soru işareti (?) olan ve soru kalıbıyla başlayan tek seçenek "Are you okay?"dir.'
  },
  {
    id: 'og_ing_20', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which one is a hobby?',
    options: ['Reading books', 'Sleeping', 'Eating lunch', 'Going to school'],
    correctAnswer: 0,
    explanation: 'Reading books (kitap okumak) bir hobi veya boş zaman aktivitesidir.'
  },
  {
    id: 'og_ing_21', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Choose the correct answer.\n\nA: “What’s the weather like today?”\nB: “_____”',
    options: ['It’s sunny.', 'It’s Tuesday.', 'It’s mine.', 'It’s five o’clock.'],
    correctAnswer: 0,
    explanation: '"What\'s the weather like...?" (Hava nasıl?) sorusuna hava durumuyla ilgili bir cevap verilir.'
  },
  {
    id: 'og_ing_22', subjectId: 'english', topic: 'General Grammar', difficulty: 'medium',
    question: '“Ali is taller than Ayşe.” means:',
    options: ['Ayşe is shorter than Ali.', 'Ali is not tall.', 'Ayşe is taller than Ali.', 'Ali and Ayşe are the same height.'], correctAnswer: 0,
    explanation: '"Ali, Ayşe\'den daha uzundur" demek, "Ayşe, Ali\'den daha kısadır" ile aynı anlama gelir.'
  },
  {
    id: 'og_ing_23', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which one is correct?',
    options: ['There is some apples on the table.', 'There are some apples on the table.', 'There is any apples on the table.', 'There are a apple on the table.'],
    correctAnswer: 1,
    explanation: 'Çoğul bir isim ("apples") ile "some" kullanılırken "There are" kalıbı kullanılır.'
  },
  {
    id: 'og_ing_24', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“Can you open the window, please?” is a:',
    options: ['Offer', 'Request', 'Refusal', 'Suggestion'],
    correctAnswer: 1,
    explanation: '"Can you... please?" kalıbı, birinden bir şey yapmasını rica ederken kullanılır.'
  },
  {
    id: 'og_ing_25', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which of the following is NOT a fruit?',
    options: ['Apple', 'Banana', 'Carrot', 'Orange'],
    correctAnswer: 2,
    explanation: 'Apple (elma), Banana (muz) ve Orange (portakal) meyvedir. Carrot (havuç) bir sebzedir.'
  },
  {
    id: 'og_ing_26', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“Ali and his friends _____ going to play football tomorrow.”',
    options: ['are', 'is', 'am', 'was'],
    correctAnswer: 0,
    explanation: 'Özne çoğul olduğu için ("Ali and his friends") ve gelecek zaman planı ("going to") belirtildiği için "are" kullanılır.'
  },
  {
    id: 'og_ing_27', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which sentence is in the Future tense?',
    options: ['I go to school every day.', 'I am watching TV now.', 'I will visit my grandmother tomorrow.', 'I played football yesterday.'],
    correctAnswer: 2,
    explanation: '"will" fiili, gelecek zamanı ifade etmek için kullanılır.'
  },
  {
    id: 'og_ing_28', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“_____ your name?”',
    options: ['How old', 'What’s', 'Where', 'Who'],
    correctAnswer: 1,
    explanation: 'Birinin adını sormak için "What\'s your name?" kalıbı kullanılır.'
  },
  {
    id: 'og_ing_29', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which option is correct?',
    options: ['I have got two sister.', 'I has got two sisters.', 'I have got two sisters.', 'I got have two sisters.'],
    correctAnswer: 2,
    explanation: '"I" öznesiyle "have got" kullanılır ve "sisters" kelimesi çoğul olmalıdır.'
  },
  {
    id: 'og_ing_30', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Choose the correct response.\n\nA: “Can I borrow your pencil?”\nB: “_____”',
    options: ['Yes, here you are.', 'Yes, I am.', 'No, it isn’t.', 'No, I don’t.'],
    correctAnswer: 0,
    explanation: 'Birinden bir şey istediğimizde, "Yes, here you are." (Evet, buyurun.) şeklinde cevap vermek yaygın bir kalıptır.'
  },
  {
    id: 'og_ing_31', subjectId: 'english', topic: 'General Grammar', difficulty: 'medium',
    question: '“Excuse me, how can I get to the bank?” is a:',
    options: ['Asking the time', 'Asking for direction', 'Giving permission', 'Making an offer'],
    correctAnswer: 1,
    explanation: '"How can I get to...?" kalıbı, bir yere nasıl gidileceğini sormak için kullanılır.'
  },
  {
    id: 'og_ing_32', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which sentence is correct?',
    options: ['She going to the park.', 'She go to the park.', 'She goes to the park.', 'She to go the park.'],
    correctAnswer: 2,
    explanation: 'Present Simple Tense\'de tekil üçüncü şahıs (She) için fiil "-es" takısı alır.'
  },
  {
    id: 'og_ing_33', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which one is NOT a school subject?',
    options: ['History', 'Geography', 'Swimming', 'Mathematics'],
    correctAnswer: 2,
    explanation: 'History (tarih), Geography (coğrafya) ve Mathematics (matematik) birer okul dersidir. Swimming (yüzme) bir spor veya aktivitedir.'
  },
  {
    id: 'og_ing_34', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“_____ you like coffee or tea?”',
    options: ['Do', 'Are', 'Is', 'Does'],
    correctAnswer: 0,
    explanation: 'Genel bir tercihi sormak için "Do you like...?" kalıbı kullanılır.'
  },
  {
    id: 'og_ing_35', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which of the following is correct?',
    options: ['There is a cat under the table.', 'There are a cat under the table.', 'There is some cats under the table.', 'There are cat under the table.'],
    correctAnswer: 0,
    explanation: 'Tekil bir isim ("a cat") için "There is" kalıbı kullanılır.'
  },
  {
    id: 'og_ing_36', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: '“What time is it?” → “It’s _____.”',
    options: ['in the park', 'a dog', 'seven o’clock', 'sunny'],
    correctAnswer: 2,
    explanation: '"What time is it?" (Saat kaç?) sorusuna saatle ilgili bir cevap verilir.'
  },
  {
    id: 'og_ing_37', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Choose the correct sentence.',
    options: ['She don’t like chocolate.', 'She doesn’t like chocolate.', 'She doesn’t likes chocolate.', 'She not likes chocolate.'],
    correctAnswer: 1,
    explanation: 'Tekil üçüncü şahıs (She) ile olumsuz cümle kurarken "doesn\'t" kullanılır ve fiil yalın halde ("like") kalır.'
  },
  {
    id: 'og_ing_38', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which word is an adjective?',
    options: ['Beautiful', 'Quickly', 'Running', 'Teacher'],
    correctAnswer: 0,
    explanation: 'Beautiful (güzel) bir isimden önce veya sonra gelerek onu niteleyen bir sıfattır.'
  },
  {
    id: 'og_ing_39', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Which of the following is NOT a fruit?',
    options: ['Apple', 'Banana', 'Carrot', 'Orange'],
    correctAnswer: 2,
    explanation: 'Apple (elma), Banana (muz) ve Orange (portakal) meyvedir. Carrot (havuç) bir sebzedir.'
  },
  {
    id: 'og_ing_40', subjectId: 'english', topic: 'General Grammar', difficulty: 'easy',
    question: 'Ali: “How are you today?”\n\nVeli: “_____”',
    options: ['I’m fine, thank you.', 'I’m reading a book.', 'I’m at school.', 'I’m ten years old.'],
    correctAnswer: 0,
    explanation: '"How are you?" (Nasılsın?) sorusuna "I\'m fine, thank you." (İyiyim, teşekkür ederim.) şeklinde cevap verilir.'
  },
  // --- YIL BOYU İÇİN YENİ EKLENEN SORULAR (30 ADET) ---

  // Unit 1: Friendship
  {
    id: 'eng_yeni_1', subjectId: 'english', topic: 'Friendship', difficulty: 'easy',
    question: 'A: Would you like to come over for dinner tonight? B: ____. I have to study for my exam.',
    options: ['That sounds awesome!', 'Yeah, why not?', 'I\'d love to, but I can\'t.', 'Sure, it sounds fun.'], correctAnswer: 2,
    explanation: 'B refuses the invitation because of an exam. "I\'d love to, but I can\'t." is the appropriate polite refusal.'
  },
  {
    id: 'eng_yeni_2', subjectId: 'english', topic: 'Friendship', difficulty: 'medium',
    question: 'Which quality is important for a good friend? A good friend should ____.',
    options: ['always argue with you', 'never keep your secrets', 'back you up when you need help', 'be laid-back and never serious'], correctAnswer: 2,
    explanation: '"Back you up" means to support someone. Good friends support each other.'
  },
  {
    id: 'eng_yeni_3', subjectId: 'english', topic: 'Friendship', difficulty: 'medium',
    question: 'Tom: "Do you get on well with your classmates?" Jerry: "Yes, ____."',
    options: ['we often argue', 'they never support me', 'we have a lot in common', 'I don\'t trust them'], correctAnswer: 2,
    explanation: '"Get on well with" means having a good relationship. "Having a lot in common" (çok ortak yönümüz var) explains why they get on well.'
  },

  // Unit 2: Teen Life
  {
    id: 'eng_yeni_4', subjectId: 'english', topic: 'Teen Life', difficulty: 'easy',
    question: 'Which type of music is usually described as loud and energetic?',
    options: ['Classical', 'Jazz', 'Pop', 'Heavy Metal'], correctAnswer: 3,
    explanation: 'Heavy Metal music is known for being loud and having high energy.'
  },
  {
    id: 'eng_yeni_5', subjectId: 'english', topic: 'Teen Life', difficulty: 'medium',
    question: 'Lisa prefers watching comedies ____ watching horror movies because she thinks horror movies are unbearable.',
    options: ['than', 'to', 'or', 'and'], correctAnswer: 1,
    explanation: 'When expressing preference using "prefer + verb-ing", the structure is "prefer doing something TO doing something else".'
  },
  {
    id: 'eng_yeni_6', subjectId: 'english', topic: 'Teen Life', difficulty: 'medium',
    question: 'My sister always follows the latest fashion trends. She loves wearing ____ clothes.',
    options: ['serious', 'ridiculous', 'trendy', 'unbearable'], correctAnswer: 2,
    explanation: '"Trendy" means fashionable or related to the latest trends.'
  },

  // Unit 3: In the Kitchen
  {
    id: 'eng_yeni_7', subjectId: 'english', topic: 'In the Kitchen', difficulty: 'easy',
    question: 'What is the first step when making pasta according to most recipes?',
    options: ['Fry the onions', 'Boil the water', 'Chop the tomatoes', 'Mix the ingredients'], correctAnswer: 1,
    explanation: 'Usually, the first step to cook pasta is to boil water in a saucepan.'
  },
  {
    id: 'eng_yeni_8', subjectId: 'english', topic: 'In the Kitchen', difficulty: 'medium',
    question: 'Which ingredient makes a dish taste sour?',
    options: ['Sugar', 'Salt', 'Lemon juice', 'Black pepper'], correctAnswer: 2,
    explanation: 'Lemon juice has a characteristic sour taste.'
  },
  {
    id: 'eng_yeni_9', subjectId: 'english', topic: 'In the Kitchen', difficulty: 'hard',
    question: 'Before you ____ the cake into the oven, you should ____ the ingredients well.',
    options: ['pour / peel', 'put / mix', 'slice / boil', 'bake / chop'], correctAnswer: 1,
    explanation: 'You "put" a cake into the oven to bake it. Before baking, you need to "mix" the ingredients.'
  },

  // Unit 4: On the Phone
  {
    id: 'eng_yeni_10', subjectId: 'english', topic: 'On the Phone', difficulty: 'easy',
    question: 'Secretary: "Good morning. XYZ Company. How can I help you?" Caller: "Hello. Can I speak to Mr. Smith, please?" Secretary: "____ a moment, please. I\'ll put you through."',
    options: ['Hang up', 'Dial', 'Hold on', 'Call back'], correctAnswer: 2,
    explanation: '"Hold on" is used to ask someone to wait on the phone.'
  },
  {
    id: 'eng_yeni_11', subjectId: 'english', topic: 'On the Phone', difficulty: 'medium',
    question: 'A: "I tried calling you yesterday, but the line was always ____." B: "Oh, sorry. My sister was talking to her friend for hours."',
    options: ['available', 'engaged', 'polite', 'clear'], correctAnswer: 1,
    explanation: 'If someone is using the phone line, it is "engaged" or "busy".'
  },
  {
    id: 'eng_yeni_12', subjectId: 'english', topic: 'On the Phone', difficulty: 'medium',
    question: 'If the person you want to talk to isn\'t available, you can leave a ____.',
    options: ['contact', 'message', 'line', 'dial'], correctAnswer: 1,
    explanation: 'When someone is not available, you can leave a message for them.'
  },

  // Unit 5: The Internet
  {
    id: 'eng_yeni_13', subjectId: 'english', topic: 'The Internet', difficulty: 'easy',
    question: 'To use most websites and online services, you first need to ____ with a username and password.',
    options: ['download', 'upload', 'register', 'delete'], correctAnswer: 2,
    explanation: '"Register" or "sign up" means creating an account.'
  },
  {
    id: 'eng_yeni_14', subjectId: 'english', topic: 'The Internet', difficulty: 'medium',
    question: 'A: "Did you receive the photos I sent?" B: "No, I didn\'t see any email from you." A: "Oh, maybe I forgot to add the ____."',
    options: ['account', 'browser', 'comment', 'attachment'], correctAnswer: 3,
    explanation: 'Files sent with an email are called attachments.'
  },
  {
    id: 'eng_yeni_15', subjectId: 'english', topic: 'The Internet', difficulty: 'hard',
    question: 'Which action should you take for online safety?',
    options: ['Share your password with friends.', 'Click on links in emails from unknown senders.', 'Use different, strong passwords for different accounts.', 'Log in to your bank account using public Wi-Fi.'], correctAnswer: 2,
    explanation: 'Using strong and unique passwords for each account is a crucial online safety measure.'
  },

  // Unit 6: Adventures
  {
    id: 'eng_yeni_16', subjectId: 'english', topic: 'Adventures', difficulty: 'easy',
    question: 'Which of these is generally considered an extreme sport?',
    options: ['Swimming', 'Walking', 'Chess', 'Hang-gliding'], correctAnswer: 3,
    explanation: 'Hang-gliding involves flying with a large kite-like structure and is considered an extreme sport due to the risks involved.'
  },
  {
    id: 'eng_yeni_17', subjectId: 'english', topic: 'Adventures', difficulty: 'medium',
    question: 'A: "Why do you like rafting?" B: "Because it\'s so ____! Going down the river fast is amazing."',
    options: ['disappointing', 'boring', 'relaxing', 'exciting'], correctAnswer: 3,
    explanation: '"Exciting" means causing great enthusiasm and eagerness.'
  },
  {
    id: 'eng_yeni_18', subjectId: 'english', topic: 'Adventures', difficulty: 'medium',
    question: 'People who enjoy adventures often like to ____ and try new, potentially dangerous activities.',
    options: ['play it safe', 'take risks', 'stay home', 'watch movies'], correctAnswer: 1,
    explanation: '"Take risks" means doing things that involve danger or the possibility of failure.'
  },

  // Unit 7: Tourism
  {
    id: 'eng_yeni_19', subjectId: 'english', topic: 'Tourism', difficulty: 'easy',
    question: 'Ephesus in Turkey is a famous ____ site with ruins from Roman times.',
    options: ['modern', 'rural', 'ancient', 'urban'], correctAnswer: 2,
    explanation: '"Ancient" refers to things belonging to the very distant past, especially the period before the end of the Western Roman Empire.'
  },
  {
    id: 'eng_yeni_20', subjectId: 'english', topic: 'Tourism', difficulty: 'medium',
    question: 'If you stay at a ____ hotel, the price usually includes accommodation, meals, and drinks.',
    options: ['bed and breakfast', 'historic', 'all-inclusive', 'cultural'], correctAnswer: 2,
    explanation: '"All-inclusive" means including everything, especially all the costs, charges, and services.'
  },
  {
    id: 'eng_yeni_21', subjectId: 'english', topic: 'Tourism', difficulty: 'medium',
    question: 'Tourists often visit Paris to admire its beautiful ____, like the Eiffel Tower and Notre Dame Cathedral.',
    options: ['countryside', 'architecture', 'resorts', 'destination'], correctAnswer: 1,
    explanation: '"Architecture" refers to the design and style of buildings.'
  },

  // Unit 8: Chores
  {
    id: 'eng_yeni_22', subjectId: 'english', topic: 'Chores', difficulty: 'easy',
    question: 'Which chore involves cleaning clothes?',
    options: ['Making the bed', 'Taking out the trash', 'Doing the laundry', 'Setting the table'], correctAnswer: 2,
    explanation: '"Doing the laundry" means washing clothes.'
  },
  {
    id: 'eng_yeni_23', subjectId: 'english', topic: 'Chores', difficulty: 'medium',
    question: 'It\'s important to ____ the rules at school and at home.',
    options: ['break', 'forget', 'obey', 'ignore'], correctAnswer: 2,
    explanation: '"Obey" means to comply with a command, direction, or request.'
  },
  {
    id: 'eng_yeni_24', subjectId: 'english', topic: 'Chores', difficulty: 'medium',
    question: 'My mum asked me to ____ the dishwasher because the dishes were clean.',
    options: ['load', 'empty', 'wash', 'set'], correctAnswer: 1,
    explanation: '"Empty the dishwasher" means taking the clean dishes out.'
  },

  // Unit 9: Science
  {
    id: 'eng_yeni_25', subjectId: 'english', topic: 'Science', difficulty: 'easy',
    question: 'Scientists often work in a ____ to conduct experiments.',
    options: ['kitchen', 'library', 'lab', 'gym'], correctAnswer: 2,
    explanation: '"Lab" is short for laboratory, a place equipped for scientific experiments.'
  },
  {
    id: 'eng_yeni_26', subjectId: 'english', topic: 'Science', difficulty: 'medium',
    question: 'Thomas Edison is famous for ____ the light bulb.',
    options: ['discovering', 'exploring', 'inventing', 'processing'], correctAnswer: 2,
    explanation: '"Invent" means to create or design something that has not existed before.'
  },
  {
    id: 'eng_yeni_27', subjectId: 'english', topic: 'Science', difficulty: 'hard',
    question: 'Before starting an experiment, it is crucial to follow all ____ precautions to avoid accidents.',
    options: ['safety', 'result', 'process', 'cure'], correctAnswer: 0,
    explanation: '"Safety precautions" are measures taken to protect against possible dangers or accidents.'
  },

  // Unit 10: Natural Forces
  {
    id: 'eng_yeni_28', subjectId: 'english', topic: 'Natural Forces', difficulty: 'easy',
    question: 'A sudden shaking of the ground is called an ____.',
    options: ['avalanche', 'earthquake', 'flood', 'hurricane'], correctAnswer: 1,
    explanation: 'An earthquake is a sudden violent shaking of the ground.'
  },
  {
    id: 'eng_yeni_29', subjectId: 'english', topic: 'Natural Forces', difficulty: 'medium',
    question: 'Global warming causes the ice caps to ____, leading to rising sea levels.',
    options: ['freeze', 'explode', 'suffer', 'melt'], correctAnswer: 3,
    explanation: '"Melt" means to change from a solid to a liquid state due to heat.'
  },
  {
    id: 'eng_yeni_30', subjectId: 'english', topic: 'Natural Forces', difficulty: 'medium',
    question: 'After the flood disaster, rescue teams searched for ____.',
    options: ['precautions', 'survivors', 'droughts', 'volcanoes'], correctAnswer: 1,
    explanation: '"Survivors" are people who have managed to stay alive in a situation where others have died.'
  },
  // --- BİTİŞ ---
];