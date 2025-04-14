async function searchPosts() {
    const form = document.getElementById('search-form');
    const formData = new FormData(form);
    formData.append('searchText', document.getElementById('searchText').value);

    try {
        const response = await fetch('/search/api/search', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        const roomList = document.getElementById('room-list');
        roomList.innerHTML = '';

        if (data.posts && data.posts.length > 0) {
            data.posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'room-card';
                card.innerHTML = `
                    <a href="/post/detail/${post._id}">
                        <img src="${post.images && post.images.length > 0 ? post.images[0] : 'https://via.placeholder.com/300x150'}" alt="${post.title}">
                        <h3>${post.title}</h3>
                        <p>
                            Giá: ${post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } triệu/tháng - 
                            Diện tích: ${post.area}m² - 
                            ${post.amenities ? post.amenities.join(', ') : 'Không có tiện ích'}
                            ${post.distance ? ` - Khoảng cách: ${(post.distance / 1000).toFixed(2)} km` : ''}
                        </p>
                    </a>
                `;
                roomList.appendChild(card);
            });
        } else {
            roomList.innerHTML = '<p>Không tìm thấy nhà trọ nào phù hợp.</p>';
        }
    } catch (err) {
        console.error('Search error:', err);
        document.getElementById('room-list').innerHTML = '<p>Lỗi khi tải kết quả tìm kiếm.</p>';
    }
}

function searchNearMe() {
    if (!navigator.geolocation) {
        alert("Trình duyệt của bạn không hỗ trợ định vị!");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
            document.getElementById('useLocation').value = 'true';
            searchPosts();
        },
        (error) => {
            alert("Không thể lấy vị trí của bạn: " + error.message);
        }
    );
}