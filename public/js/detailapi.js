async function loadPost() {
    const postId = window.location.pathname.split('/').pop();
    try {
        const response = await fetch(`/post/api/detail/${postId}`);
        const post = await response.json();
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-location').innerText = post.location;
        document.getElementById('post-price').innerText = post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' triệu/tháng';
        document.getElementById('post-area').innerText = post.area + 'm²';
        document.getElementById('post-description').innerText = post.description;
        document.getElementById('post-amenities').innerText = post.amenities ? post.amenities.join(', ') : 'Không có';
        document.getElementById('post-username').innerText = post.username;
        document.getElementById('post-email').innerText = post.email;
        document.getElementById('post-createdAt').innerText = new Date(post.createdAt).toLocaleDateString('vi-VN');
    } catch (err) {
        console.error('Load post error:', err);
    }
}
window.onload = loadPost;