//skibidi
document.addEventListener('DOMContentLoaded', () => {
    const openCommentAreaButton = document.getElementById('openCommentArea');
    const commentArea = document.getElementById('commentArea');
    const closeCommentAreaButton = document.getElementById('closeCommentArea');
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');
    const submitCommentButton = document.getElementById('submitComment');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    let upvotedComments = new Set();

    openCommentAreaButton.addEventListener('click', () => {
        commentArea.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeCommentAreaButton.addEventListener('click', () => {
        commentArea.style.display = 'none';
        overlay.style.display = 'none';
    });

    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    dropdownContent.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            dropdownButton.textContent = e.target.textContent;
            dropdownContent.classList.remove('show');
        }
    });

    submitCommentButton.addEventListener('click', () => {
        const commentText = document.getElementById('commentText').value;
        const selectedCategory = dropdownButton.textContent.toLowerCase();
        if (commentText.trim() && selectedCategory) {
            const commentsSection = document.getElementById('commentsSection');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.dataset.category = selectedCategory;
            newComment.innerHTML = `
                <div class="comment-category">${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</div>
                <div class="comment-text">
                    <p>${commentText}</p>
                </div>
                <div class="comment-actions">
                    <button class="upvote-btn" data-id="${Date.now()}">&#9650;</button>
                    <span class="upvote-count" id="upvoteCount${Date.now()}">0</span>
                </div>
            `;
            commentsSection.appendChild(newComment);
            document.getElementById('commentText').value = '';
            commentArea.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    document.getElementById('commentsSection').addEventListener('click', (e) => {
        if (e.target.classList.contains('upvote-btn')) {
            const commentId = e.target.dataset.id;
            const upvoteCountElement = document.getElementById(`upvoteCount${commentId}`);
            const upvoteCount = parseInt(upvoteCountElement.textContent, 10);
            if (!upvotedComments.has(commentId)) {
                upvoteCountElement.textContent = upvoteCount + 1;
                upvotedComments.add(commentId);
            } else {
                upvoteCountElement.textContent = upvoteCount - 1;
                upvotedComments.delete(commentId);
            }
        }
    });
});
