const blogUrl = "https://primdev.alwaysdata.net/api"; //Ganti dengan URL API-mu

// Fungsi untuk mengambil semua postingan
async function getPosts() {
  const response = await fetch(${blogUrl}/);
  const data = await response.json();
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = data
    .map((post) => <div><h3>${post.title}</h3><p>${post.content}</p></div>)
    .join("");
}

// Fungsi untuk mendapatkan postingan acak
async function getRandomPost() {
  const response = await fetch(${blogUrl}/random);
  const post = await response.json();
  const randomContainer = document.getElementById("random-result");
  randomContainer.innerHTML = <h3>${post.title}</h3><p>${post.content}</p>;
}

// Fungsi untuk menambahkan postingan baru
async function addPost(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  const response = await fetch(${blogUrl}/store, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    alert("Postingan berhasil ditambahkan!");
    document.getElementById("add-post-form").reset();
    getPosts(); // Refresh daftar postingan
  } else {
    alert("Gagal menambahkan postingan.");
  }
}
//Fetch Blogs
async function fetchBlogs() {
  const response = await fetch(${blogUrl}/);
  const blogs = await response.json();

  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = blogs
    .map(
      (blog) => `
        <div>
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>ID: ${blog.id}</small>
        </div>
    `
    )
    .join("");
}

// Update Blog
async function updateBlog(event) {
  event.preventDefault();
  const id = document.getElementById("update-blog-id").value;
  const title = document.getElementById("update-blog-title").value;
  const content = document.getElementById("update-blog-content").value;

  const response = await fetch(${blogUrl}/${id}, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token},
    },
    body: JSON.stringify({ _method: "put", title, content }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Blog berhasil diupdate!");
    fetchBlogs();
  } else {
    alert(result.message || "Update gagal");
  }
}

// Delete Blog
async function deleteBlog(event) {
  event.preventDefault();
  const id = document.getElementById("delete-blog-id").value;

  const response = await fetch(${blogUrl}/${id}, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token},
    },
    body: JSON.stringify({ _method: "delete" }),
  });

  if (response.ok) {
    alert("Blog berhasil dihapus!");
    fetchBlogs();
  } else {
    alert("Delete gagal");
  }
}

// Event Listener
document.getElementById("load-posts").addEventListener("click", getPosts);
document.getElementById("get-random").addEventListener("click", getRandomPost);
document.getElementById("add-post-form").addEventListener("submit", addPost);