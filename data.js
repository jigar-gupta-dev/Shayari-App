// Poetry data in JSON format
const poetryDataJson = `
[
    {
        "id": 1,
        "text": "मोहब्बत के शहर में हम साथ चल रहे थे,\\nउनकी यादों की गलियाँ हैं अब तन्हा हम हैं।",
        "author": "गुलज़ार",
        "language": "hindi",
        "category": "love"
    },
    {
        "id": 2,
        "text": "میں اپنی محبت کا پرچم کہاں تک لے جاؤں\\nہر دل میں سمندر ہے اور کشتیاں جلتی ہیں",
        "author": "फ़ैज़ अहमद फ़ैज़",
        "language": "urdu",
        "category": "love"
    },
    {
        "id": 3,
        "text": "Two roads diverged in a wood, and I—\\nI took the one less traveled by,\\nAnd that has made all the difference.",
        "author": "Robert Frost",
        "language": "english",
        "category": "life"
    },
    {
        "id": 4,
        "text": "ये इश्क़ नहीं आसान, बस इतना समझ लीजिए,\\nएक आग का दरिया है और डूब के जाना है।",
        "author": "दुष्यंत कुमार",
        "language": "hindi",
        "category": "love"
    },
    {
        "id": 5,
        "text": "کچھ تو ہے تیری انکھوں میں\\nجو میں بھی دیکھنا چاہتا ہوں",
        "author": "जौन एलिया",
        "language": "urdu",
        "category": "philosophy"
    },
    {
        "id": 6,
        "text": "Hope is the thing with feathers\\nThat perches in the soul,\\nAnd sings the tune without the words,\\nAnd never stops at all.",
        "author": "Emily Dickinson",
        "language": "english",
        "category": "life"
    },
    {
        "id": 7,
        "text": "जिंदगी बहुत कुछ सिखाती है, दोस्त\\nबशर्ते कि आप सीखने को तैयार हों।",
        "author": "निदा फ़ाज़ली",
        "language": "hindi",
        "category": "philosophy"
    },
    {
        "id": 8,
        "text": "میں نے مانا کہ کچھ نہیں اس میں\\nجو نہیں ہے اسے شعر کہتے ہیں",
        "author": "मिर्ज़ा ग़ालिब",
        "language": "urdu",
        "category": "philosophy"
    },
    {
        "id": 9,
        "text": "Nature's first green is gold,\\nHer hardest hue to hold.\\nHer early leaf's a flower;\\nBut only so an hour.",
        "author": "Robert Frost",
        "language": "english",
        "category": "nature"
    },
    {
        "id": 10,
        "text": "मैं अकेला ही चला था जानिब-ए-मंजिल मगर\\nलोग साथ आते गए और कारवां बनता गया।",
        "author": "मजरूह सुल्तानपुरी",
        "language": "hindi",
        "category": "life"
    },
    {
        "id": 11,
        "text": "ہنسی تیرا پیشہ صحیح، مگر شام کے بعد\\nرات گزارنے کا بھی کوئی طریقہ سوچ",
        "author": "परवेज़ शाहदी",
        "language": "urdu",
        "category": "philosophy"
    },
    {
        "id": 12,
        "text": "I wandered lonely as a cloud\\nThat floats on high o'er vales and hills,\\nWhen all at once I saw a crowd,\\nA host, of golden daffodils.",
        "author": "William Wordsworth",
        "language": "english",
        "category": "nature"
    },
    {
        "id": 13,
        "text": "जिंदगी एक सफर है सुहाना,\\nयहाँ कल क्या हो किसने जाना।",
        "author": "साहिर लुधियानवी",
        "language": "hindi",
        "category": "life"
    },
    {
        "id": 14,
        "text": "میں اور میرا غم ایک ہی گھر کے ہیں\\nلوگ سمجھتے ہیں ہم دو ہیں",
        "author": "अहमद फ़राज़",
        "language": "urdu",
        "category": "philosophy"
    },
    {
        "id": 15,
        "text": "Because I could not stop for Death –\\nHe kindly stopped for me –\\nThe Carriage held but just Ourselves –\\nAnd Immortality.",
        "author": "Emily Dickinson",
        "language": "english",
        "category": "philosophy"
    },
    {
        "id": 16,
        "text": "ज़िंदगी के सफर में गुज़र जाते हैं जो मकाम,\\nवो फिर नहीं आते।",
        "author": "साहिर लुधियानवी",
        "language": "hindi",
        "category": "life"
    },
    {
        "id": 17,
        "text": "محبت ایک کہانی ہے جس کے دو کردار ہیں\\nایک کی تلاش ہر دم ہے ایک بیزار ہے",
        "author": "फ़राज़",
        "language": "urdu",
        "category": "love"
    },
    {
        "id": 18,
        "text": "The woods are lovely, dark and deep,\\nBut I have promises to keep,\\nAnd miles to go before I sleep,\\nAnd miles to go before I sleep.",
        "author": "Robert Frost",
        "language": "english",
        "category": "nature"
    },
    {
        "id": 19,
        "text": "कौन कहता है आसमान में सुराख नहीं हो सकता,\\nएक पत्थर तो तबीयत से उछालो यारों।",
        "author": "दुष्यंत कुमार",
        "language": "hindi",
        "category": "philosophy"
    },
    {
        "id": 20,
        "text": "عشق کی تکمیل پہ روتا ہے یہ آسماں\\nسو بار سجدہ کیا زمانے نے میری طرف",
        "author": "मिर्ज़ा ग़ालिब",
        "language": "urdu",
        "category": "love"
    },
    {
        "id": 21,
        "text": "Do not go gentle into that good night,\\nOld age should burn and rave at close of day;\\nRage, rage against the dying of the light.",
        "author": "Dylan Thomas",
        "language": "english",
        "category": "life"
    }
]`;

// Function to fetch more content from Rekhta (proxy implementation)
// In production, you would implement proper scraping with a proxy server to avoid CORS
async function fetchRekhtaContent() {
    // This is a proxy function that would scrape content from Rekhta
    // Since we can't implement actual scraping here, we'll return additional dummy data
    
    return [
        {
            "id": 22,
            "text": "ख़्वाब में देखा था जो कुछ, हक़ीक़त में पा लिया,\\nपहले भी मेरा ईमान था, अब यक़ीन हो गया।",
            "author": "वसीम बरेलवी",
            "language": "hindi",
            "category": "philosophy"
        },
        {
            "id": 23,
            "text": "غم اسی کو کہتے ہیں جو دل سے گزر جائے\\nورنہ افسردگیاں تو ہر آن ہوا کرتی ہیں",
            "author": "अहमद फ़राज़",
            "language": "urdu",
            "category": "philosophy"
        },
        {
            "id": 24,
            "text": "The future belongs to those who believe in the beauty of their dreams.",
            "author": "Eleanor Roosevelt",
            "language": "english",
            "category": "life"
        }
    ];
}