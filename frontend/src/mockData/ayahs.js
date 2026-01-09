// Mock Ayah data - Sample from Surah Al-Fatihah (1) and Al-Ikhlas (112)
// In production, this would contain all ayahs from all surahs

export const MOCK_AYAHS = {
    1: [ // Surah Al-Fatihah
        {
            id: 1,
            surahId: 1,
            number: 1,
            textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            translationEnglish: 'In the name of Allah, the Most Gracious, the Most Merciful',
            translationUrdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے',
            words: [
                { id: 1, arabic: 'بِسْمِ', translation: 'In the name', transliteration: 'Bismi' },
                { id: 2, arabic: 'اللَّهِ', translation: 'of Allah', transliteration: 'Allahi' },
                { id: 3, arabic: 'الرَّحْمَٰنِ', translation: 'the Most Gracious', transliteration: 'Ar-Rahmani' },
                { id: 4, arabic: 'الرَّحِيمِ', translation: 'the Most Merciful', transliteration: 'Ar-Rahimi' }
            ]
        },
        {
            id: 2,
            surahId: 1,
            number: 2,
            textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            translationEnglish: 'All praise is for Allah—Lord of all worlds',
            translationUrdu: 'سب تعریف اللہ ہی کے لیے ہے جو تمام جہانوں کا پروردگار ہے',
            words: [
                { id: 1, arabic: 'الْحَمْدُ', translation: 'All praise', transliteration: 'Al-Hamdu' },
                { id: 2, arabic: 'لِلَّهِ', translation: 'for Allah', transliteration: 'Lillahi' },
                { id: 3, arabic: 'رَبِّ', translation: 'Lord', transliteration: 'Rabbi' },
                { id: 4, arabic: 'الْعَالَمِينَ', translation: 'of all worlds', transliteration: 'Al-Alamina' }
            ]
        },
        {
            id: 3,
            surahId: 1,
            number: 3,
            textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
            translationEnglish: 'The Most Gracious, the Most Merciful',
            translationUrdu: 'بڑا مہربان نہایت رحم والا',
            words: [
                { id: 1, arabic: 'الرَّحْمَٰنِ', translation: 'The Most Gracious', transliteration: 'Ar-Rahmani' },
                { id: 2, arabic: 'الرَّحِيمِ', translation: 'The Most Merciful', transliteration: 'Ar-Rahimi' }
            ]
        },
        {
            id: 4,
            surahId: 1,
            number: 4,
            textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
            translationEnglish: 'Master of the Day of Judgment',
            translationUrdu: 'روزِ جزا کا مالک',
            words: [
                { id: 1, arabic: 'مَالِكِ', translation: 'Master', transliteration: 'Maliki' },
                { id: 2, arabic: 'يَوْمِ', translation: 'of the Day', transliteration: 'Yawmi' },
                { id: 3, arabic: 'الدِّينِ', translation: 'of Judgment', transliteration: 'Ad-Dini' }
            ]
        },
        {
            id: 5,
            surahId: 1,
            number: 5,
            textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
            translationEnglish: 'You alone we worship, and You alone we ask for help',
            translationUrdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں',
            words: [
                { id: 1, arabic: 'إِيَّاكَ', translation: 'You alone', transliteration: 'Iyyaka' },
                { id: 2, arabic: 'نَعْبُدُ', translation: 'we worship', transliteration: 'Nabudu' },
                { id: 3, arabic: 'وَإِيَّاكَ', translation: 'and You alone', transliteration: 'Wa-iyyaka' },
                { id: 4, arabic: 'نَسْتَعِينُ', translation: 'we ask for help', transliteration: 'Nastainu' }
            ]
        },
        {
            id: 6,
            surahId: 1,
            number: 6,
            textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
            translationEnglish: 'Guide us along the Straight Path',
            translationUrdu: 'ہمیں سیدھے راستے کی ہدایت فرما',
            words: [
                { id: 1, arabic: 'اهْدِنَا', translation: 'Guide us', transliteration: 'Ihdina' },
                { id: 2, arabic: 'الصِّرَاطَ', translation: 'to the Path', transliteration: 'As-Sirata' },
                { id: 3, arabic: 'الْمُسْتَقِيمَ', translation: 'the Straight', transliteration: 'Al-Mustaqima' }
            ]
        },
        {
            id: 7,
            surahId: 1,
            number: 7,
            textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
            translationEnglish: 'The Path of those You have blessed—not those You are displeased with, or those who are astray',
            translationUrdu: 'ان لوگوں کا راستہ جن پر تو نے انعام کیا، جو معتوب نہیں ہوئے، نہ گمراہ ہوئے',
            words: [
                { id: 1, arabic: 'صِرَاطَ', translation: 'The Path', transliteration: 'Sirata' },
                { id: 2, arabic: 'الَّذِينَ', translation: 'of those', transliteration: 'Alladhina' },
                { id: 3, arabic: 'أَنْعَمْتَ', translation: 'You have blessed', transliteration: 'Anamta' },
                { id: 4, arabic: 'عَلَيْهِمْ', translation: 'upon them', transliteration: 'Alayhim' },
                { id: 5, arabic: 'غَيْرِ', translation: 'not', transliteration: 'Ghayri' },
                { id: 6, arabic: 'الْمَغْضُوبِ', translation: 'those displeased with', transliteration: 'Al-Maghdubi' },
                { id: 7, arabic: 'عَلَيْهِمْ', translation: 'upon them', transliteration: 'Alayhim' },
                { id: 8, arabic: 'وَلَا', translation: 'and not', transliteration: 'Wala' },
                { id: 9, arabic: 'الضَّالِّينَ', translation: 'those astray', transliteration: 'Ad-Dallina' }
            ]
        }
    ],
    112: [ // Surah Al-Ikhlas
        {
            id: 446,
            surahId: 112,
            number: 1,
            textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
            translationEnglish: 'Say, "He is Allah—One and Indivisible',
            translationUrdu: 'کہو وہ اللہ ایک ہے',
            words: [
                { id: 1, arabic: 'قُلْ', translation: 'Say', transliteration: 'Qul' },
                { id: 2, arabic: 'هُوَ', translation: 'He is', transliteration: 'Huwa' },
                { id: 3, arabic: 'اللَّهُ', translation: 'Allah', transliteration: 'Allahu' },
                { id: 4, arabic: 'أَحَدٌ', translation: 'One', transliteration: 'Ahad' }
            ]
        },
        {
            id: 447,
            surahId: 112,
            number: 2,
            textArabic: 'اللَّهُ الصَّمَدُ',
            translationEnglish: 'Allah—the Sustainer needed by all',
            translationUrdu: 'اللہ بے نیاز ہے',
            words: [
                { id: 1, arabic: 'اللَّهُ', translation: 'Allah', transliteration: 'Allahu' },
                { id: 2, arabic: 'الصَّمَدُ', translation: 'the Sustainer', transliteration: 'As-Samadu' }
            ]
        },
        {
            id: 448,
            surahId: 112,
            number: 3,
            textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
            translationEnglish: 'He has never had offspring, nor was He born',
            translationUrdu: 'نہ اس سے کوئی پیدا ہوا نہ وہ کسی سے پیدا ہوا',
            words: [
                { id: 1, arabic: 'لَمْ', translation: 'Never', transliteration: 'Lam' },
                { id: 2, arabic: 'يَلِدْ', translation: 'He begets', transliteration: 'Yalid' },
                { id: 3, arabic: 'وَلَمْ', translation: 'and never', transliteration: 'Walam' },
                { id: 4, arabic: 'يُولَدْ', translation: 'was He born', transliteration: 'Yulad' }
            ]
        },
        {
            id: 449,
            surahId: 112,
            number: 4,
            textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
            translationEnglish: 'And there is none comparable to Him',
            translationUrdu: 'اور کوئی اس کا ہمسر نہیں',
            words: [
                { id: 1, arabic: 'وَلَمْ', translation: 'And never', transliteration: 'Walam' },
                { id: 2, arabic: 'يَكُن', translation: 'is', transliteration: 'Yakun' },
                { id: 3, arabic: 'لَّهُ', translation: 'to Him', transliteration: 'Lahu' },
                { id: 4, arabic: 'كُفُوًا', translation: 'equivalent', transliteration: 'Kufuwan' },
                { id: 5, arabic: 'أَحَدٌ', translation: 'any one', transliteration: 'Ahad' }
            ]
        }
    ]
}

// Helper functions
export const getAyahsBySurah = (surahId) => {
    return MOCK_AYAHS[surahId] || []
}

export const getAyahById = (ayahId) => {
    for (const surahId in MOCK_AYAHS) {
        const ayah = MOCK_AYAHS[surahId].find(a => a.id === parseInt(ayahId))
        if (ayah) return ayah
    }
    return null
}

export const getAllWords = (ayahId) => {
    const ayah = getAyahById(ayahId)
    return ayah?.words || []
}

export default MOCK_AYAHS
