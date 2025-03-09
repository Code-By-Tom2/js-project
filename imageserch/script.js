const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const imageGallery = document.getElementById('image-gallery');
const loader = document.getElementById('loader');

// Replace these with your actual API key and CSE ID
const API_KEY = 'YOUR_API_KEY';
const CSE_ID = 'YOUR_CSE_ID';

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query === '') {
        alert('Please enter a search query');
        return;
    }

    // Clear previous images
    imageGallery.innerHTML = '';
    // Show loader
    loader.style.display = 'block';

    try {
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&searchType=image`
        );
        loader.style.display = 'none';

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const img = document.createElement('img');
                img.src = item.image.thumbnailLink;
                img.alt = item.title;
                img.loading = 'lazy'; // Enable lazy loading
                const a = document.createElement('a');
                a.href = item.link;
                a.target = '_blank';
                a.appendChild(img);
                imageGallery.appendChild(a);
            });
        } else {
            imageGallery.innerHTML = '<p>No images found</p>';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        loader.style.display = 'none';
        imageGallery.innerHTML = '<p>Error fetching images</p>';
    }
});