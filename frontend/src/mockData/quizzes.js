// Mock quiz generator for ayah-by-ayah learning

export const generateAyahQuiz = (ayahId) => {
    // Sample quiz for testing
    return {
        id: `quiz_ayah_${ayahId}`,
        type: 'ayah',
        ayahId,
        questions: [
            {
                id: 1,
                word: 'بِسْمِ',
                translation: 'In the name',
                options: [
                    'In the name',
                    'All praise',
                    'The Most Gracious',
                    'Master'
                ],
                correctAnswer: 'In the name'
            },
            {
                id: 2,
                word: 'اللَّهِ',
                translation: 'of Allah',
                options: [
                    'of the Day',
                    'of Allah',
                    'of Judgment',
                    'Lord'
                ],
                correctAnswer: 'of Allah'
            },
            {
                id: 3,
                word: 'الرَّحْمَٰنِ',
                translation: 'the Most Gracious',
                options: [
                    'the Most Merciful',
                    'the Most Gracious',
                    'All praise',
                    'Master'
                ],
                correctAnswer: 'the Most Gracious'
            },
            {
                id: 4,
                word: 'الرَّحِيمِ',
                translation: 'the Most Merciful',
                options: [
                    'the Most Gracious',
                    'Lord',
                    'the Most Merciful',
                    'Master'
                ],
                correctAnswer: 'the Most Merciful'
            }
        ]
    }
}

export const generateWordQuiz = (wordId) => {
    // Placeholder for FYP-2
    return {
        id: `quiz_word_${wordId}`,
        type: 'word',
        wordId,
        questions: [
            {
                id: 1,
                word: 'Sample',
                translation: 'Sample translation',
                options: ['Option 1', 'Option 2', 'Option 3', 'Sample translation'],
                correctAnswer: 'Sample translation'
            }
        ]
    }
}

export default { generateAyahQuiz, generateWordQuiz }
