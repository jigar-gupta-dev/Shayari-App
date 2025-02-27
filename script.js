// Poetry data store
let poetryData = [];
let currentPage = 1;
let itemsPerPage = 9;
let selectedLanguage = 'all';
let selectedCategory = 'all';
let searchQuery = '';

// DOM elements
const poetryContainer = document.getElementById('poetry-container');
const loadingIndicator = document.getElementById('loading-indicator');
const paginationContainer = document.getElementById('pagination');
const languageSelector = document.getElementById('language-selector');
const categorySelector = document.getElementById('category-selector');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const themeToggle = document.getElementById('theme-toggle');
const modal = document.getElementById('poetry-modal');
const modalPoetry = document.getElementById('modal-poetry');
const modalAuthor = document.getElementById('modal-author');
const closeModal = document.getElementById('close-modal');
const copyButton = document.getElementById('copy-button');
const shareButton = document.getElementById('share-button');
const downloadButton = document.getElementById('download-button');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Parse the initial JSON data
    poetryData = JSON.parse(poetryDataJson);
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize Unity Ads
    initializeUnityAds();
    
    // Display the poetry
    displayPoetry();
    
    // Try to fetch additional content (might be implemented with a proxy server to avoid CORS)
    try {
        const additionalContent = await fetchRekhtaContent();
        if (additionalContent && additionalContent.length) {
            poetryData = [...poetryData, ...additionalContent];
            displayPoetry();
        }
    } catch (error) {
        console.log('Error fetching additional content:', error);
    }
});

// Set up event listeners for UI controls
function setupEventListeners() {
    // Language filter change
    languageSelector.addEventListener('change', () => {
        selectedLanguage = languageSelector.value;
        currentPage = 1;
        displayPoetry();
    });
    
    // Category filter change
    categorySelector.addEventListener('change', () => {
        selectedCategory = categorySelector.value;
        currentPage = 1;
        displayPoetry();
    });
    
    // Search button click
    searchButton.addEventListener('click', () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        displayPoetry();
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchQuery = searchInput.value.trim().toLowerCase();
            currentPage = 1;
            displayPoetry();
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Modal close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Copy button
    copyButton.addEventListener('click', () => {
        const textToCopy = modalPoetry.textContent + '\n- ' + modalAuthor.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });
    
    // Share button
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            const textToShare = modalPoetry.textContent + '\n- ' + modalAuthor.textContent;
            navigator.share({
                title: 'Shayari & Poetry',
                text: textToShare,
                url: window.location.href
            })
            .catch(err => {
                console.error('Share failed:', err);
            });
        } else {
            alert('Web Share API not supported in your browser');
        }
    });
    
    // Download button
    downloadButton.addEventListener('click', () => {
        const textToDownload = modalPoetry.textContent + '\n- ' + modalAuthor.textContent;
        const element = document.createElement('a');
        const file = new Blob([textToDownload], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = 'shayari.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
}

// Toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

// Initialize Unity Ads
function initializeUnityAds() {
    // Replace these with your actual Unity Ads Game ID and Placement ID
    const gameId = "YOUR_UNITY_GAME_ID";
    const topBannerPlacementId = "TOP_BANNER_PLACEMENT_ID";
    const bottomBannerPlacementId = "BOTTOM_BANNER_PLACEMENT_ID";
    
    // Check if Unity Ads SDK is available
    if (typeof UnityAds !== 'undefined') {
        // Initialize Unity Ads
        UnityAds.initialize(gameId, false);
        
        // Load top banner ad
        UnityAds.load(topBannerPlacementId, {
            width: '320',
            height: '50'
        }, function(adInstance) {
            // Show the top banner ad
            adInstance.show({
                targetElement: 'unity-ad-container-top'
            });
        });
        
        // Load bottom banner ad
        UnityAds.load(bottomBannerPlacementId, {
            width: '320',
            height: '50'
        }, function(adInstance) {
            // Show the bottom banner ad
            adInstance.show({
                targetElement: 'unity-ad-container-bottom'
            });
        });
    } else {
        console.log('Unity Ads SDK not loaded');
        // Show placeholder for ads
        document.getElementById('unity-ad-container-top').innerHTML = 
            '<div style="background-color:#e0e0e0;height:50px;display:flex;align-items:center;justify-content:center;">Advertisement Banner</div>';
        document.getElementById('unity-ad-container-bottom').innerHTML = 
            '<div style="background-color:#e0e0e0;height:50px;display:flex;align-items:center;justify-content:center;">Advertisement Banner</div>';
    }
}

// Filter poetry based on selected filters and search query
function filterPoetry() {
    return poetryData.filter(poetry => {
        // Language filter
        const languageMatch = selectedLanguage === 'all' || poetry.language === selectedLanguage;
        
        // Category filter
        const categoryMatch = selectedCategory === 'all' || poetry.category === selectedCategory;
        
        // Search query
        const searchMatch = !searchQuery || 
            poetry.text.toLowerCase().includes(searchQuery) || 
            poetry.author.toLowerCase().includes(searchQuery);
        
        return languageMatch && categoryMatch && searchMatch;
    });
}

// Create Poetry Card
function createPoetryCard(poetry) {
    const card = document.createElement('div');
    card.className = 'poetry-card';
    
    let textClass = '';
    if (poetry.language === 'urdu') {
        textClass = 'urdu-text';
    } else if (poetry.language === 'hindi') {
        textClass = 'hindi-text';
    } else {
        textClass = 'english-text';
    }
    
    // Format the text to handle line breaks
    const formattedText = poetry.text.split('\\n').join('<br>');
    
    card.innerHTML = `
        <div class="poetry-text ${textClass}">${formattedText}</div>
        <div class="poetry-author">- ${poetry.author}</div>
        <div class="action-buttons">
            <button class="read-more-btn">Read More</button>
            <button class="favorite-btn">❤️</button>
        </div>
    `;
    
    // Add event listener for 'Read More' button
    card.querySelector('.read-more-btn').addEventListener('click', () => {
        openPoetryModal(poetry);
    });
    
    // Add event listener for favorite button
    card.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(poetry.id);
        
        // Update the favorite button
        const isFavorite = isPoetryFavorite(poetry.id);
        e.target.textContent = isFavorite ? '❤️' : '🤍';
    });
    
    // Set initial favorite status
    const isFavorite = isPoetryFavorite(poetry.id);
    card.querySelector('.favorite-btn').textContent = isFavorite ? '❤️' : '🤍';
    
    return card;
}

// Open poetry modal
function openPoetryModal(poetry) {
    let textClass = '';
    if (poetry.language === 'urdu') {
        textClass = 'urdu-text';
    } else if (poetry.language === 'hindi') {
        textClass = 'hindi-text';
    } else {
        textClass = 'english-text';
    }
    
    // Format the text to handle line breaks
    const formattedText = poetry.text.split('\\n').join('<br>');
    
    modalPoetry.className = `modal-poetry ${textClass}`;
    modalPoetry.innerHTML = formattedText;  
}