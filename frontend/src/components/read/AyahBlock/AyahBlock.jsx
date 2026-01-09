import { useState } from 'react'

/**
 * AyahBlock Component - Display individual ayah with translations
 * @param {object} ayah - Ayah data
 * @param {number} index - Ayah index in list
 * @param {string} selectedLang - 'english' or 'urdu'
 * @param {boolean} showWordByWord - Show word-by-word mode
 */
function AyahBlock({ ayah, index, selectedLang, showWordByWord }) {
    const [hoveredWordIndex, setHoveredWordIndex] = useState(null)

    const translation = selectedLang === 'urdu'
        ? ayah.translationUrdu
        : ayah.translationEnglish

    return (
        <div className="glass p-6 rounded-2xl relative">
            {/* Ayah Number Badge */}
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-lime-neon rounded-full flex items-center justify-center text-black font-bold text-sm">
                <span className="arabic-text text-xs">{ayah.number}</span>
            </div>

            {/* Arabic Text */}
            <div className="text-right mb-6 pt-4">
                {showWordByWord ? (
                    <div className="flex flex-wrap justify-end gap-4">
                        {ayah.words?.map((word, idx) => (
                            <div
                                key={idx}
                                className="relative cursor-pointer"
                                onMouseEnter={() => setHoveredWordIndex(idx)}
                                onMouseLeave={() => setHoveredWordIndex(null)}
                            >
                                <span className="arabic-text text-3xl text-text-primary hover:text-lime-neon transition-colors">
                                    {word.arabic}
                                </span>
                                {hoveredWordIndex === idx && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-dark-primary border border-lime-neon/30 rounded-lg shadow-glow-sm z-10 whitespace-nowrap animate-fade-in">
                                        <span className="block text-lime-neon font-medium text-sm">
                                            {word.translation}
                                        </span>
                                        <span className="block text-text-tertiary text-xs mt-1">
                                            {word.transliteration}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="arabic-text text-3xl text-text-primary leading-loose">
                        {ayah.textArabic}
                    </p>
                )}
            </div>

            {/* Translation */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-text-secondary leading-relaxed">
                    {translation}
                </p>
            </div>

            {/* Audio Placeholder */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <button className="px-4 py-2 bg-dark-tertiary text-text-secondary rounded-lg text-sm cursor-not-allowed opacity-50" disabled title="Audio coming soon">
                    🔊 Play Audio
                </button>
            </div>
        </div>
    )
}

export default AyahBlock
