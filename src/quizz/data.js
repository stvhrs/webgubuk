export const quizData = [
  {
    id: 1,
    type: 'multiple_choice',
    question: 'Siapakah presiden pertama Republik Indonesia? <br/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Presiden_Sukarno.jpg/800px-Presiden_Sukarno.jpg" width="150" alt="Soekarno"/>',
    options: ['Soeharto', 'Joko Widodo', 'Soekarno', 'B.J. Habibie'],
    answer: 'Soekarno',
    pembahasan: '<b>Soekarno</b>, yang biasa dipanggil Bung Karno, adalah Presiden pertama Indonesia yang menjabat pada periode 1945–1967. Ia memainkan peranan penting dalam memerdekakan bangsa Indonesia dari penjajahan Belanda.'
  },
  {
    id: 2,
    type: 'multiple_select', // TIPE SOAL BARU
    question: 'Dari daftar berikut, manakah yang tergolong sebagai <b>hewan mamalia</b>? (Pilih semua yang benar)',
    options: [
        'Paus Biru', 
        'Hiu Martil', 
        'Lumba-lumba', 
        'Penyu'
    ],
    answer: ['Paus Biru', 'Lumba-lumba'], // Jawaban benar dalam bentuk array
    pembahasan: '<b>Paus Biru</b> dan <b>Lumba-lumba</b> adalah mamalia laut. Mereka bernapas dengan paru-paru dan menyusui anaknya. Hiu adalah ikan, dan Penyu adalah reptil.'
  },
  {
    id: 3,
    type: 'multiple_true_false',
    question: 'Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan tentang tata surya berikut:',
    statements: [
      { text: 'Merkurius adalah planet terpanas di tata surya.', answer: false },
      { text: 'Jupiter adalah planet terbesar di tata surya.', answer: true },
      { text: 'Pluto masih dianggap sebagai sebuah planet.', answer: false },
    ],
    pembahasan: '<b>Penjelasan:</b><br/>- Venus adalah planet terpanas, bukan Merkurius, karena atmosfernya yang tebal memerangkap panas.<br/>- Jupiter adalah raksasa gas dan merupakan planet terbesar.<br/>- Sejak 2006, Pluto diklasifikasikan sebagai <i>planet kerdil</i> (dwarf planet).'
  },
  {
    id: 4,
    type: 'essay',
    question: 'Jelaskan secara singkat apa yang dimaksud dengan <i>"Teks Proklamasi"</i> Indonesia?',
    keywords: ['kemerdekaan', 'soekarno', 'hatta', '17 agustus 1945', 'bangsa indonesia'],
    maxScore: 10,
    pembahasan: '<b>Teks Proklamasi</b> adalah naskah yang menyatakan kemerdekaan Bangsa Indonesia. Teks ini dibacakan oleh <b>Soekarno</b>, didampingi oleh Mohammad <b>Hatta</b>, pada tanggal <b>17 Agustus 1945</b>. Isinya merupakan pernyataan resmi kepada seluruh dunia mengenai kemerdekaan Indonesia.'
  },
];
