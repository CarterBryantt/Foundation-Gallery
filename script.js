let returnButton = document.getElementById('return');
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let imagesDiv = document.getElementById('images')

let galleryImages = [];
let currentImgIndex = 0;

let xhr = new XMLHttpRequest();
xhr.open("GET", "./images/", true); // Initialize new request for folder we want to access
xhr.responseType = 'document';
xhr.onload = () => {
	if (xhr.status === 200) {
		let elements = xhr.response.getElementsByTagName("a");
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].href.match(/\.(jpe?g|png|gif|JPE?G|PNG|GIF)$/)) {
				galleryImages.push(elements[i].href);
			}
		}
		for (let i = 0; i < galleryImages.length; i++) {
			let img = document.createElement("img");
			img.src = galleryImages[i];
			img.style.display = i == 0 ? "block" : "none";
			imagesDiv.appendChild(img);
		}
	} else {
		console.log(xhr.status);
	}
} // What to do when request is recieved
xhr.send(); // Send the new request

returnButton.onclick = () => window.location.href = 'https://www.thefoundationfamily.com/';

prevButton.onclick = () => {
	imagesDiv.children[currentImgIndex].style.display = "none"; // Hide previous image
	currentImgIndex = currentImgIndex - 1 < 0 ? imagesDiv.children.length - 1 : currentImgIndex - 1;
	imagesDiv.children[currentImgIndex].style.display = "block"; // Show new image
}

nextButton.onclick = () => {
	imagesDiv.children[currentImgIndex].style.display = "none"; // Hide previous image
	currentImgIndex = currentImgIndex + 1 == imagesDiv.children.length ? 0 : currentImgIndex + 1;
	imagesDiv.children[currentImgIndex].style.display = "block"; // Show new image
}
