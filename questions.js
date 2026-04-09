const STRUCTURES = [
  { id: 1,  name: "have/has ↔ there is/are" },
  { id: 2,  name: "a few ↔ not many" },
  { id: 3,  name: "want + O + to V ↔ lời nhờ vả lịch sự" },
  { id: 4,  name: "enjoy + V-ing ↔ be interested in + V-ing" },
  { id: 5,  name: "not very adj ↔ tính từ trái nghĩa" },
  { id: 6,  name: "not very adj ↔ a/an + tính từ trái nghĩa + danh từ" },
  { id: 7,  name: "never ↔ not ... any" },
  { id: 8,  name: "walk ↔ go on foot" },
  { id: 9,  name: "work as ↔ be (a/an)" },
  { id: 10, name: "would like ↔ want" },
  { id: 11, name: "can ↔ be able to / know how to" },
  { id: 12, name: "adj + noun ↔ verb + adverb" },
  { id: 13, name: "so ↔ because" },
  { id: 14, name: "find it adj ↔ it is adj" },
  { id: 15, name: "there is no point in ↔ it is useless to" },
  { id: 16, name: "spend time ↔ it takes" },
  { id: 17, name: "would (quá khứ) ↔ used to" },
  { id: 18, name: "because ↔ to V (mục đích)" },
  { id: 19, name: "despite/in spite of ↔ although" },
];

const QUESTIONS = [
  // ─────────────────────────────────────────────
  // STRUCTURE 1: have/has ↔ there is/are
  // ─────────────────────────────────────────────
  {
    id: 1, structure: 1, difficulty: "easy",
    original: "My school has a large library.",
    question: "Viết lại câu dùng 'There...'",
    correct: "There is a large library in my school.",
    wrong: ["There are a large library in my school.", "There have a large library in my school.", "There has a large library in my school."]
  },
  {
    id: 2, structure: 1, difficulty: "easy",
    original: "Our town has two hospitals.",
    question: "Viết lại câu dùng 'There...'",
    correct: "There are two hospitals in our town.",
    wrong: ["There is two hospitals in our town.", "There have two hospitals in our town.", "There has two hospitals in our town."]
  },
  {
    id: 3, structure: 1, difficulty: "easy",
    original: "There is a new café near my house.",
    question: "Viết lại câu dùng 'My house...'",
    correct: "My house has a new café near it.",
    wrong: ["My house have a new café near it.", "My house there a new café near it.", "My house is a new café near it."]
  },
  {
    id: 4, structure: 1, difficulty: "medium",
    original: "There are three bookshops on this street.",
    question: "Viết lại câu dùng 'This street...'",
    correct: "This street has three bookshops.",
    wrong: ["This street have three bookshops.", "This street there are three bookshops.", "This street is three bookshops."]
  },
  {
    id: 5, structure: 1, difficulty: "medium",
    original: "The classroom has forty desks.",
    question: "Viết lại câu dùng 'There...'",
    correct: "There are forty desks in the classroom.",
    wrong: ["There is forty desks in the classroom.", "There have forty desks in the classroom.", "There were forty desks in the classroom."]
  },
  {
    id: 6, structure: 1, difficulty: "hard",
    original: "There were many old trees in front of the school.",
    question: "Viết lại câu dùng 'The school...'",
    correct: "The school had many old trees in front of it.",
    wrong: ["The school has many old trees in front of it.", "The school have many old trees in front of it.", "The school was many old trees in front of it."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 2: a few ↔ not many
  // ─────────────────────────────────────────────
  {
    id: 7, structure: 2, difficulty: "easy",
    original: "There are a few apples in the basket.",
    question: "Viết lại câu dùng 'not many'",
    correct: "There are not many apples in the basket.",
    wrong: ["There are not much apples in the basket.", "There are no apples in the basket.", "There are a little apples in the basket."]
  },
  {
    id: 8, structure: 2, difficulty: "easy",
    original: "She has a few close friends at school.",
    question: "Viết lại câu dùng 'not many'",
    correct: "She does not have many close friends at school.",
    wrong: ["She does not have much close friends at school.", "She has not many close friends at school.", "She doesn't have any close friends at school."]
  },
  {
    id: 9, structure: 2, difficulty: "medium",
    original: "He does not have many books on his shelf.",
    question: "Viết lại câu dùng 'a few'",
    correct: "He has a few books on his shelf.",
    wrong: ["He has a little books on his shelf.", "He has few books on his shelf.", "He has some books on his shelf."]
  },
  {
    id: 10, structure: 2, difficulty: "medium",
    original: "There are not many students in the library right now.",
    question: "Viết lại câu dùng 'a few'",
    correct: "There are a few students in the library right now.",
    wrong: ["There are a little students in the library right now.", "There are few students in the library right now.", "There are some students in the library right now."]
  },
  {
    id: 11, structure: 2, difficulty: "hard",
    original: "Only a few people attended the meeting yesterday.",
    question: "Viết lại câu dùng 'not many'",
    correct: "Not many people attended the meeting yesterday.",
    wrong: ["Not much people attended the meeting yesterday.", "A few people didn't attend the meeting yesterday.", "Not many people attends the meeting yesterday."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 3: want + O + to V ↔ polite request
  // ─────────────────────────────────────────────
  {
    id: 12, structure: 3, difficulty: "easy",
    original: "I want you to close the door.",
    question: "Viết lại câu thành câu nhờ vả lịch sự dùng 'Could you...'",
    correct: "Could you close the door, please?",
    wrong: ["Could you closes the door, please?", "Could you closing the door, please?", "Could you to close the door, please?"]
  },
  {
    id: 13, structure: 3, difficulty: "easy",
    original: "She wants him to turn off the TV.",
    question: "Viết lại câu thành câu nhờ vả lịch sự dùng 'Would you...'",
    correct: "Would you turn off the TV, please?",
    wrong: ["Would you to turn off the TV, please?", "Would you turning off the TV, please?", "Would you turned off the TV, please?"]
  },
  {
    id: 14, structure: 3, difficulty: "medium",
    original: "Can you help me carry these bags?",
    question: "Viết lại câu dùng 'I want you to...'",
    correct: "I want you to help me carry these bags.",
    wrong: ["I want you help me carry these bags.", "I want you to helping me carry these bags.", "I want you to helped me carry these bags."]
  },
  {
    id: 15, structure: 3, difficulty: "medium",
    original: "My teacher wants me to practise speaking English daily.",
    question: "Viết lại câu thành câu nhờ vả lịch sự dùng 'Could you...'",
    correct: "Could you practise speaking English daily, please?",
    wrong: ["Could you to practise speaking English daily, please?", "Could you practise speak English daily, please?", "Could you practising speaking English daily, please?"]
  },
  {
    id: 16, structure: 3, difficulty: "hard",
    original: "Would you lend me your dictionary for a moment?",
    question: "Viết lại câu dùng 'I want you to...'",
    correct: "I want you to lend me your dictionary for a moment.",
    wrong: ["I want you lend me your dictionary for a moment.", "I want you to lends me your dictionary for a moment.", "I want you to lending me your dictionary for a moment."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 4: enjoy + V-ing ↔ be interested in + V-ing
  // ─────────────────────────────────────────────
  {
    id: 17, structure: 4, difficulty: "easy",
    original: "She enjoys painting watercolours.",
    question: "Viết lại câu dùng 'be interested in'",
    correct: "She is interested in painting watercolours.",
    wrong: ["She is interested in paint watercolours.", "She is interested to paint watercolours.", "She is interested to painting watercolours."]
  },
  {
    id: 18, structure: 4, difficulty: "easy",
    original: "He is interested in learning chess.",
    question: "Viết lại câu dùng 'enjoy'",
    correct: "He enjoys learning chess.",
    wrong: ["He enjoy learning chess.", "He enjoys to learn chess.", "He enjoys learned chess."]
  },
  {
    id: 19, structure: 4, difficulty: "medium",
    original: "My parents enjoy gardening on weekends.",
    question: "Viết lại câu dùng 'be interested in'",
    correct: "My parents are interested in gardening on weekends.",
    wrong: ["My parents are interested in garden on weekends.", "My parents is interested in gardening on weekends.", "My parents are interested to gardening on weekends."]
  },
  {
    id: 20, structure: 4, difficulty: "medium",
    original: "They are interested in collecting vintage stamps.",
    question: "Viết lại câu dùng 'enjoy'",
    correct: "They enjoy collecting vintage stamps.",
    wrong: ["They enjoy to collect vintage stamps.", "They enjoys collecting vintage stamps.", "They enjoyed collecting vintage stamps."]
  },
  {
    id: 21, structure: 4, difficulty: "hard",
    original: "The children are not interested in doing homework after school.",
    question: "Viết lại câu dùng 'enjoy'",
    correct: "The children do not enjoy doing homework after school.",
    wrong: ["The children does not enjoy doing homework after school.", "The children do not enjoy to do homework after school.", "The children are not enjoy doing homework after school."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 5: not very adj ↔ opposite adjective
  // ─────────────────────────────────────────────
  {
    id: 22, structure: 5, difficulty: "easy",
    original: "This soup is not very hot.",
    question: "Viết lại câu dùng tính từ trái nghĩa",
    correct: "This soup is cold.",
    wrong: ["This soup is not cold.", "This soup is very cold.", "This soup isn't very cold."]
  },
  {
    id: 23, structure: 5, difficulty: "easy",
    original: "He is not very tall.",
    question: "Viết lại câu dùng tính từ trái nghĩa",
    correct: "He is short.",
    wrong: ["He is not short.", "He is quite short.", "He is very short."]
  },
  {
    id: 24, structure: 5, difficulty: "medium",
    original: "The weather today is not very warm.",
    question: "Viết lại câu dùng tính từ trái nghĩa",
    correct: "The weather today is cool.",
    wrong: ["The weather today is hot.", "The weather today is not cool.", "The weather today is very cool."]
  },
  {
    id: 25, structure: 5, difficulty: "medium",
    original: "Her answer was not very correct.",
    question: "Viết lại câu dùng tính từ trái nghĩa",
    correct: "Her answer was wrong.",
    wrong: ["Her answer was not wrong.", "Her answer was quite wrong.", "Her answer wasn't right."]
  },
  {
    id: 26, structure: 5, difficulty: "hard",
    original: "The road to the village is not very wide.",
    question: "Viết lại câu dùng tính từ trái nghĩa",
    correct: "The road to the village is narrow.",
    wrong: ["The road to the village is not narrow.", "The road to the village is thin.", "The road to the village is small."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 6: not very adj ↔ a/an + opposite adj + noun
  // ─────────────────────────────────────────────
  {
    id: 27, structure: 6, difficulty: "easy",
    original: "This room is not very big.",
    question: "Viết lại câu dùng 'a/an + tính từ trái nghĩa + danh từ'",
    correct: "This is a small room.",
    wrong: ["This is a big room.", "This is an small room.", "This is a not big room."]
  },
  {
    id: 28, structure: 6, difficulty: "easy",
    original: "The film was not very interesting.",
    question: "Viết lại câu dùng 'a/an + tính từ trái nghĩa + danh từ'",
    correct: "It was a boring film.",
    wrong: ["It was an boring film.", "It was an interesting film.", "It was a not interesting film."]
  },
  {
    id: 29, structure: 6, difficulty: "medium",
    original: "Her handwriting is not very good.",
    question: "Viết lại câu dùng 'a/an + tính từ trái nghĩa + danh từ'",
    correct: "She has bad handwriting.",
    wrong: ["She has a bad handwriting.", "She has good handwriting.", "She has not good handwriting."]
  },
  {
    id: 30, structure: 6, difficulty: "hard",
    original: "The road near the school is not very safe.",
    question: "Viết lại câu dùng 'a/an + tính từ trái nghĩa + danh từ'",
    correct: "It is a dangerous road near the school.",
    wrong: ["It is an dangerous road near the school.", "It is a safe road near the school.", "It is a danger road near the school."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 7: never ↔ not ... any
  // ─────────────────────────────────────────────
  {
    id: 31, structure: 7, difficulty: "easy",
    original: "She never drinks coffee.",
    question: "Viết lại câu dùng 'not ... any'",
    correct: "She does not drink any coffee.",
    wrong: ["She does not drink some coffee.", "She did not drink any coffee.", "She has not drunk any coffee."]
  },
  {
    id: 32, structure: 7, difficulty: "easy",
    original: "He never reads comic books.",
    question: "Viết lại câu dùng 'not ... any'",
    correct: "He does not read any comic books.",
    wrong: ["He does not reads any comic books.", "He did not read any comic books.", "He does not read some comic books."]
  },
  {
    id: 33, structure: 7, difficulty: "medium",
    original: "My grandmother does not eat any spicy food.",
    question: "Viết lại câu dùng 'never'",
    correct: "My grandmother never eats spicy food.",
    wrong: ["My grandmother never eat spicy food.", "My grandmother never ate spicy food.", "My grandmother doesn't never eat spicy food."]
  },
  {
    id: 34, structure: 7, difficulty: "medium",
    original: "They never arrive late to class.",
    question: "Viết lại câu dùng 'not ... any'",
    correct: "They do not arrive late to class at any time.",
    wrong: ["They does not arrive late to class at any time.", "They did not arrive late to class at any time.", "They do not arrive late to any class."]
  },
  {
    id: 35, structure: 7, difficulty: "hard",
    original: "The teacher did not give any homework last Friday.",
    question: "Viết lại câu dùng 'never'",
    correct: "The teacher never gave homework last Friday.",
    wrong: ["The teacher never gives homework last Friday.", "The teacher never given homework last Friday.", "The teacher didn't never give homework last Friday."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 8: walk ↔ go on foot
  // ─────────────────────────────────────────────
  {
    id: 36, structure: 8, difficulty: "easy",
    original: "Lan walks to school every day.",
    question: "Viết lại câu dùng 'go on foot'",
    correct: "Lan goes to school on foot every day.",
    wrong: ["Lan go to school on foot every day.", "Lan goes to school by foot every day.", "Lan goes to school with foot every day."]
  },
  {
    id: 37, structure: 8, difficulty: "easy",
    original: "My father goes to the market on foot.",
    question: "Viết lại câu dùng 'walk'",
    correct: "My father walks to the market.",
    wrong: ["My father walk to the market.", "My father walked to the market.", "My father is walking to the market."]
  },
  {
    id: 38, structure: 8, difficulty: "medium",
    original: "We walked to the post office yesterday.",
    question: "Viết lại câu dùng 'go on foot'",
    correct: "We went to the post office on foot yesterday.",
    wrong: ["We go to the post office on foot yesterday.", "We goed to the post office on foot yesterday.", "We gone to the post office on foot yesterday."]
  },
  {
    id: 39, structure: 8, difficulty: "medium",
    original: "The students went to the library on foot.",
    question: "Viết lại câu dùng 'walk'",
    correct: "The students walked to the library.",
    wrong: ["The students walk to the library.", "The students walking to the library.", "The students walks to the library."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 9: work as ↔ be (a/an)
  // ─────────────────────────────────────────────
  {
    id: 40, structure: 9, difficulty: "easy",
    original: "Mr. Nam works as a teacher at our school.",
    question: "Viết lại câu dùng 'be'",
    correct: "Mr. Nam is a teacher at our school.",
    wrong: ["Mr. Nam are a teacher at our school.", "Mr. Nam works a teacher at our school.", "Mr. Nam be a teacher at our school."]
  },
  {
    id: 41, structure: 9, difficulty: "easy",
    original: "Her mother is a nurse at the city hospital.",
    question: "Viết lại câu dùng 'work as'",
    correct: "Her mother works as a nurse at the city hospital.",
    wrong: ["Her mother work as a nurse at the city hospital.", "Her mother working as a nurse at the city hospital.", "Her mother is working as a nurse at the city hospital."]
  },
  {
    id: 42, structure: 9, difficulty: "medium",
    original: "My uncle works as an engineer for a big company.",
    question: "Viết lại câu dùng 'be'",
    correct: "My uncle is an engineer for a big company.",
    wrong: ["My uncle is a engineer for a big company.", "My uncle are an engineer for a big company.", "My uncle was an engineer for a big company."]
  },
  {
    id: 43, structure: 9, difficulty: "hard",
    original: "She worked as a journalist for fifteen years.",
    question: "Viết lại câu dùng 'be'",
    correct: "She was a journalist for fifteen years.",
    wrong: ["She is a journalist for fifteen years.", "She were a journalist for fifteen years.", "She has been a journalist for fifteen years."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 10: would like ↔ want
  // ─────────────────────────────────────────────
  {
    id: 44, structure: 10, difficulty: "easy",
    original: "I would like to visit Hoi An next month.",
    question: "Viết lại câu dùng 'want'",
    correct: "I want to visit Hoi An next month.",
    wrong: ["I want visiting Hoi An next month.", "I want visit Hoi An next month.", "I wants to visit Hoi An next month."]
  },
  {
    id: 45, structure: 10, difficulty: "easy",
    original: "She wants to learn how to play the piano.",
    question: "Viết lại câu dùng 'would like'",
    correct: "She would like to learn how to play the piano.",
    wrong: ["She would like learn how to play the piano.", "She would likes to learn how to play the piano.", "She would liked to learn how to play the piano."]
  },
  {
    id: 46, structure: 10, difficulty: "medium",
    original: "They would like to have dinner at a restaurant tonight.",
    question: "Viết lại câu dùng 'want'",
    correct: "They want to have dinner at a restaurant tonight.",
    wrong: ["They wants to have dinner at a restaurant tonight.", "They want having dinner at a restaurant tonight.", "They want to had dinner at a restaurant tonight."]
  },
  {
    id: 47, structure: 10, difficulty: "medium",
    original: "He wants to buy a new bicycle for his birthday.",
    question: "Viết lại câu dùng 'would like'",
    correct: "He would like to buy a new bicycle for his birthday.",
    wrong: ["He would like buying a new bicycle for his birthday.", "He would likes to buy a new bicycle for his birthday.", "He would to like to buy a new bicycle for his birthday."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 11: can ↔ be able to / know how to
  // ─────────────────────────────────────────────
  {
    id: 48, structure: 11, difficulty: "easy",
    original: "She can speak Japanese very well.",
    question: "Viết lại câu dùng 'be able to'",
    correct: "She is able to speak Japanese very well.",
    wrong: ["She is able speaking Japanese very well.", "She are able to speak Japanese very well.", "She is able to speaks Japanese very well."]
  },
  {
    id: 49, structure: 11, difficulty: "easy",
    original: "He is able to ride a motorbike.",
    question: "Viết lại câu dùng 'can'",
    correct: "He can ride a motorbike.",
    wrong: ["He can rides a motorbike.", "He can to ride a motorbike.", "He cans ride a motorbike."]
  },
  {
    id: 50, structure: 11, difficulty: "medium",
    original: "She can cook traditional Vietnamese food.",
    question: "Viết lại câu dùng 'know how to'",
    correct: "She knows how to cook traditional Vietnamese food.",
    wrong: ["She knows how to cooking traditional Vietnamese food.", "She know how to cook traditional Vietnamese food.", "She knows how cook traditional Vietnamese food."]
  },
  {
    id: 51, structure: 11, difficulty: "medium",
    original: "My little brother cannot read yet.",
    question: "Viết lại câu dùng 'be able to'",
    correct: "My little brother is not able to read yet.",
    wrong: ["My little brother is not able reading yet.", "My little brother are not able to read yet.", "My little brother not able to read yet."]
  },
  {
    id: 52, structure: 11, difficulty: "hard",
    original: "Does she know how to drive a car?",
    question: "Viết lại câu dùng 'can'",
    correct: "Can she drive a car?",
    wrong: ["Can she drives a car?", "Does she can drive a car?", "She can drive a car?"]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 12: adj + noun ↔ verb + adverb
  // ─────────────────────────────────────────────
  {
    id: 53, structure: 12, difficulty: "easy",
    original: "She is a careful driver.",
    question: "Viết lại câu dùng 'drive + adverb'",
    correct: "She drives carefully.",
    wrong: ["She drives careful.", "She drive carefully.", "She is drives carefully."]
  },
  {
    id: 54, structure: 12, difficulty: "easy",
    original: "He speaks beautiful English.",
    question: "Viết lại câu dùng 'His English...'",
    correct: "His English is beautiful.",
    wrong: ["His English is beautifully.", "He's English is beautiful.", "His English speaks beautifully."]
  },
  {
    id: 55, structure: 12, difficulty: "medium",
    original: "She sings beautifully.",
    question: "Viết lại câu dùng 'a/an + adj + singer'",
    correct: "She is a beautiful singer.",
    wrong: ["She is a beautifully singer.", "She is an beautiful singer.", "She is beautiful singer."]
  },
  {
    id: 56, structure: 12, difficulty: "medium",
    original: "He is a fast runner.",
    question: "Viết lại câu dùng 'run + adverb'",
    correct: "He runs fast.",
    wrong: ["He runs fastly.", "He run fast.", "He is running fast."]
  },
  {
    id: 57, structure: 12, difficulty: "hard",
    original: "My father is a hard worker.",
    question: "Viết lại câu dùng 'work + adverb'",
    correct: "My father works hard.",
    wrong: ["My father works hardly.", "My father work hard.", "My father is working hard."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 13: so ↔ because
  // ─────────────────────────────────────────────
  {
    id: 58, structure: 13, difficulty: "easy",
    original: "It was raining heavily, so we stayed inside.",
    question: "Viết lại câu dùng 'because'",
    correct: "We stayed inside because it was raining heavily.",
    wrong: ["We stayed inside because it rained heavily.", "We stayed inside so it was raining heavily.", "Because it was raining heavily so we stayed inside."]
  },
  {
    id: 59, structure: 13, difficulty: "easy",
    original: "He was very tired, so he went to bed early.",
    question: "Viết lại câu dùng 'because'",
    correct: "He went to bed early because he was very tired.",
    wrong: ["He went to bed early because he is very tired.", "He went to bed early so he was very tired.", "Because he was very tired, so he went to bed early."]
  },
  {
    id: 60, structure: 13, difficulty: "medium",
    original: "She missed the bus because she woke up late.",
    question: "Viết lại câu dùng 'so'",
    correct: "She woke up late, so she missed the bus.",
    wrong: ["She woke up late so she misses the bus.", "Because she woke up late, so she missed the bus.", "She woke up late, because she missed the bus."]
  },
  {
    id: 61, structure: 13, difficulty: "medium",
    original: "The exam was very hard, so many students failed.",
    question: "Viết lại câu dùng 'because'",
    correct: "Many students failed because the exam was very hard.",
    wrong: ["Many students failed because the exam is very hard.", "Many students failed so the exam was very hard.", "Because the exam was very hard so many students failed."]
  },
  {
    id: 62, structure: 13, difficulty: "hard",
    original: "She studied hard, so she got the highest mark in the class.",
    question: "Viết lại câu dùng 'because'",
    correct: "She got the highest mark in the class because she studied hard.",
    wrong: ["She got the highest mark in the class because she studies hard.", "She got the highest mark in the class so she studied hard.", "Because she studied hard so she got the highest mark in the class."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 14: find it adj ↔ it is adj
  // ─────────────────────────────────────────────
  {
    id: 63, structure: 14, difficulty: "easy",
    original: "It is easy to learn English grammar.",
    question: "Viết lại câu dùng 'I find it...'",
    correct: "I find it easy to learn English grammar.",
    wrong: ["I find it easily to learn English grammar.", "I find it easy learning English grammar.", "I find to learn English grammar easy."]
  },
  {
    id: 64, structure: 14, difficulty: "easy",
    original: "I find it boring to watch this programme.",
    question: "Viết lại câu dùng 'It is...'",
    correct: "It is boring to watch this programme.",
    wrong: ["It is boringly to watch this programme.", "It is bore to watch this programme.", "It is bored to watch this programme."]
  },
  {
    id: 65, structure: 14, difficulty: "medium",
    original: "It is difficult to wake up early every morning.",
    question: "Viết lại câu dùng 'I find it...'",
    correct: "I find it difficult to wake up early every morning.",
    wrong: ["I find it difficultly to wake up early every morning.", "I find it is difficult to wake up early every morning.", "I find to wake up early every morning difficult."]
  },
  {
    id: 66, structure: 14, difficulty: "hard",
    original: "She finds it impossible to finish all the work in one day.",
    question: "Viết lại câu dùng 'It is...'",
    correct: "It is impossible for her to finish all the work in one day.",
    wrong: ["It is impossible to her to finish all the work in one day.", "It is impossible she to finish all the work in one day.", "It is impossible for her finishing all the work in one day."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 15: there is no point in ↔ it is useless to
  // ─────────────────────────────────────────────
  {
    id: 67, structure: 15, difficulty: "easy",
    original: "There is no point in crying over spilt milk.",
    question: "Viết lại câu dùng 'It is useless to'",
    correct: "It is useless to cry over spilt milk.",
    wrong: ["It is useless crying over spilt milk.", "It is useless to crying over spilt milk.", "It is no point to cry over spilt milk."]
  },
  {
    id: 68, structure: 15, difficulty: "medium",
    original: "It is useless to argue with him about this matter.",
    question: "Viết lại câu dùng 'There is no point in'",
    correct: "There is no point in arguing with him about this matter.",
    wrong: ["There is no point to argue with him about this matter.", "There is no point arguing with him about this matter.", "There is not point in arguing with him about this matter."]
  },
  {
    id: 69, structure: 15, difficulty: "medium",
    original: "There is no point in trying to change his mind.",
    question: "Viết lại câu dùng 'It is useless to'",
    correct: "It is useless to try to change his mind.",
    wrong: ["It is useless to trying to change his mind.", "It is useless trying to change his mind.", "It is no use to try to change his mind."]
  },
  {
    id: 70, structure: 15, difficulty: "hard",
    original: "It is useless to complain about the weather.",
    question: "Viết lại câu dùng 'There is no point in'",
    correct: "There is no point in complaining about the weather.",
    wrong: ["There is no point to complaining about the weather.", "There is no point in complaint about the weather.", "There is no pointing in complaining about the weather."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 16: spend time ↔ it takes
  // ─────────────────────────────────────────────
  {
    id: 71, structure: 16, difficulty: "easy",
    original: "I spend one hour doing my homework every night.",
    question: "Viết lại câu dùng 'It takes...'",
    correct: "It takes me one hour to do my homework every night.",
    wrong: ["It takes me one hour doing my homework every night.", "It takes one hour for me to do my homework every night.", "It takes me an hour do my homework every night."]
  },
  {
    id: 72, structure: 16, difficulty: "easy",
    original: "It takes her twenty minutes to walk to school.",
    question: "Viết lại câu dùng 'She spends...'",
    correct: "She spends twenty minutes walking to school.",
    wrong: ["She spends twenty minutes to walk to school.", "She spends twenty minutes walk to school.", "She spending twenty minutes walking to school."]
  },
  {
    id: 73, structure: 16, difficulty: "medium",
    original: "My brother spends two hours playing video games after school.",
    question: "Viết lại câu dùng 'It takes...'",
    correct: "It takes my brother two hours to play video games after school.",
    wrong: ["It takes my brother two hours playing video games after school.", "It takes two hours for my brother playing video games after school.", "It take my brother two hours to play video games after school."]
  },
  {
    id: 74, structure: 16, difficulty: "hard",
    original: "It took the builders three months to finish the new bridge.",
    question: "Viết lại câu dùng 'The builders spent...'",
    correct: "The builders spent three months finishing the new bridge.",
    wrong: ["The builders spent three months to finish the new bridge.", "The builders spent three months finish the new bridge.", "The builders spends three months finishing the new bridge."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 17: would (past habit) ↔ used to
  // ─────────────────────────────────────────────
  {
    id: 75, structure: 17, difficulty: "easy",
    original: "When I was a child, I would play outside every evening.",
    question: "Viết lại câu dùng 'used to'",
    correct: "When I was a child, I used to play outside every evening.",
    wrong: ["When I was a child, I used to playing outside every evening.", "When I was a child, I use to play outside every evening.", "When I was a child, I am used to play outside every evening."]
  },
  {
    id: 76, structure: 17, difficulty: "easy",
    original: "She used to walk to school when she was younger.",
    question: "Viết lại câu dùng 'would'",
    correct: "She would walk to school when she was younger.",
    wrong: ["She would walking to school when she was younger.", "She would to walk to school when she was younger.", "She would walked to school when she was younger."]
  },
  {
    id: 77, structure: 17, difficulty: "medium",
    original: "My grandfather would tell us stories every night before bed.",
    question: "Viết lại câu dùng 'used to'",
    correct: "My grandfather used to tell us stories every night before bed.",
    wrong: ["My grandfather used to telling us stories every night before bed.", "My grandfather use to tell us stories every night before bed.", "My grandfather is used to tell us stories every night before bed."]
  },
  {
    id: 78, structure: 17, difficulty: "hard",
    original: "People used to travel by horse and cart before cars were invented.",
    question: "Viết lại câu dùng 'would'",
    correct: "People would travel by horse and cart before cars were invented.",
    wrong: ["People would traveled by horse and cart before cars were invented.", "People would to travel by horse and cart before cars were invented.", "People would travelling by horse and cart before cars were invented."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 18: because ↔ to V (purpose)
  // ─────────────────────────────────────────────
  {
    id: 79, structure: 18, difficulty: "easy",
    original: "He went to the library because he wanted to study.",
    question: "Viết lại câu dùng 'to V' (mục đích)",
    correct: "He went to the library to study.",
    wrong: ["He went to the library for study.", "He went to the library to studying.", "He went to the library for studying."]
  },
  {
    id: 80, structure: 18, difficulty: "easy",
    original: "She saved money to travel to Europe.",
    question: "Viết lại câu dùng 'because she wanted to'",
    correct: "She saved money because she wanted to travel to Europe.",
    wrong: ["She saved money because she wants to travel to Europe.", "She saved money because she want to travel to Europe.", "She saved money because she was wanting to travel to Europe."]
  },
  {
    id: 81, structure: 18, difficulty: "medium",
    original: "They went to the shop because they needed to buy some milk.",
    question: "Viết lại câu dùng 'to V' (mục đích)",
    correct: "They went to the shop to buy some milk.",
    wrong: ["They went to the shop to buying some milk.", "They went to the shop for buy some milk.", "They went to the shop for buying some milk."]
  },
  {
    id: 82, structure: 18, difficulty: "hard",
    original: "She woke up early to catch the first bus to the city.",
    question: "Viết lại câu dùng 'because she wanted to'",
    correct: "She woke up early because she wanted to catch the first bus to the city.",
    wrong: ["She woke up early because she wants to catch the first bus to the city.", "She woke up early because she want to catch the first bus to the city.", "She woke up early because she wanted catching the first bus to the city."]
  },

  // ─────────────────────────────────────────────
  // STRUCTURE 19: despite/in spite of ↔ although
  // ─────────────────────────────────────────────
  {
    id: 83, structure: 19, difficulty: "easy",
    original: "Although it was raining, we went for a walk.",
    question: "Viết lại câu dùng 'Despite' hoặc 'In spite of'",
    correct: "Despite the rain, we went for a walk.",
    wrong: ["Despite it was raining, we went for a walk.", "Despite of the rain, we went for a walk.", "Despite it rained, we went for a walk."]
  },
  {
    id: 84, structure: 19, difficulty: "easy",
    original: "Despite feeling unwell, she went to school.",
    question: "Viết lại câu dùng 'Although'",
    correct: "Although she felt unwell, she went to school.",
    wrong: ["Although she feels unwell, she went to school.", "Although she feeling unwell, she went to school.", "Although feeling unwell, she went to school."]
  },
  {
    id: 85, structure: 19, difficulty: "medium",
    original: "In spite of the heavy traffic, he arrived on time.",
    question: "Viết lại câu dùng 'Although'",
    correct: "Although the traffic was heavy, he arrived on time.",
    wrong: ["Although the traffic is heavy, he arrived on time.", "Although it was heavy traffic, he arrived on time.", "Although heavy traffic, he arrived on time."]
  },
  {
    id: 86, structure: 19, difficulty: "medium",
    original: "Although he was very nervous, he gave an excellent speech.",
    question: "Viết lại câu dùng 'In spite of'",
    correct: "In spite of being very nervous, he gave an excellent speech.",
    wrong: ["In spite of he was very nervous, he gave an excellent speech.", "In spite of very nervous, he gave an excellent speech.", "Despite he was very nervous, he gave an excellent speech."]
  },
  {
    id: 87, structure: 19, difficulty: "hard",
    original: "Despite studying very hard, she could not pass the final exam.",
    question: "Viết lại câu dùng 'Although'",
    correct: "Although she studied very hard, she could not pass the final exam.",
    wrong: ["Although she studies very hard, she could not pass the final exam.", "Although she had studied very hard, she could not pass the final exam.", "Although studying very hard, she could not pass the final exam."]
  },
  {
    id: 88, structure: 19, difficulty: "hard",
    original: "Although the price was very high, the restaurant was always full.",
    question: "Viết lại câu dùng 'Despite'",
    correct: "Despite the very high price, the restaurant was always full.",
    wrong: ["Despite the price was very high, the restaurant was always full.", "Despite of the very high price, the restaurant was always full.", "Despite the very highly price, the restaurant was always full."]
  },

  // ────── BONUS MIXED HARD QUESTIONS ──────
  {
    id: 89, structure: 16, difficulty: "hard",
    original: "It takes the students forty minutes to get to school by bus.",
    question: "Viết lại câu dùng 'The students spend...'",
    correct: "The students spend forty minutes getting to school by bus.",
    wrong: ["The students spend forty minutes to get to school by bus.", "The students spend forty minutes get to school by bus.", "The students spending forty minutes getting to school by bus."]
  },
  {
    id: 90, structure: 13, difficulty: "hard",
    original: "She didn't sleep well, so she felt very tired in the morning.",
    question: "Viết lại câu dùng 'because'",
    correct: "She felt very tired in the morning because she didn't sleep well.",
    wrong: ["She felt very tired in the morning because she doesn't sleep well.", "She felt very tired in the morning so she didn't sleep well.", "Because she didn't sleep well so she felt very tired in the morning."]
  },
  {
    id: 91, structure: 4, difficulty: "hard",
    original: "Most teenagers are not interested in reading long novels.",
    question: "Viết lại câu dùng 'enjoy'",
    correct: "Most teenagers do not enjoy reading long novels.",
    wrong: ["Most teenagers does not enjoy reading long novels.", "Most teenagers do not enjoy to read long novels.", "Most teenagers are not enjoy reading long novels."]
  },
  {
    id: 92, structure: 11, difficulty: "hard",
    original: "She knows how to play chess, but she rarely practises.",
    question: "Viết lại câu dùng 'can'",
    correct: "She can play chess, but she rarely practises.",
    wrong: ["She can plays chess, but she rarely practises.", "She can to play chess, but she rarely practises.", "She cans play chess, but she rarely practises."]
  },
  {
    id: 93, structure: 3, difficulty: "hard",
    original: "Would you mind turning down the music a little, please?",
    question: "Viết lại câu dùng 'I want you to...'",
    correct: "I want you to turn down the music a little.",
    wrong: ["I want you turning down the music a little.", "I want you to turned down the music a little.", "I want you to turning down the music a little."]
  },
  {
    id: 94, structure: 17, difficulty: "hard",
    original: "My family used to have a small farm in the countryside when I was young.",
    question: "Viết lại câu dùng 'would'",
    correct: "My family would have a small farm in the countryside when I was young.",
    wrong: ["My family would had a small farm in the countryside when I was young.", "My family would to have a small farm in the countryside when I was young.", "My family would having a small farm in the countryside when I was young."]
  },
  {
    id: 95, structure: 18, difficulty: "hard",
    original: "She practised every day because she wanted to improve her pronunciation.",
    question: "Viết lại câu dùng 'to V' (mục đích)",
    correct: "She practised every day to improve her pronunciation.",
    wrong: ["She practised every day to improving her pronunciation.", "She practised every day for improve her pronunciation.", "She practised every day for improving her pronunciation."]
  },
  {
    id: 96, structure: 15, difficulty: "hard",
    original: "There is no point in waiting for a bus that never comes.",
    question: "Viết lại câu dùng 'It is useless to'",
    correct: "It is useless to wait for a bus that never comes.",
    wrong: ["It is useless waiting for a bus that never comes.", "It is useless to waiting for a bus that never comes.", "It is uselessly to wait for a bus that never comes."]
  },
];
