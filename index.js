const vid = document.querySelector("video");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("button");

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((localMediaStream) => {
    console.log(localMediaStream);
    vid.srcObject = localMediaStream;
    vid.play();
  })
  .catch((err) => console.error("error", err));

vid.addEventListener("canplay", function () {
  const width = vid.videoWidth;
  const height = vid.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(vid, 0, 0, width, height);
  }, 16);
});

function takePhoto() {
  // take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.innerHTML = `<img src="${data}"/>`;
  document.body.insertAdjacentElement("beforeEnd", link);
}

btn.addEventListener("click", takePhoto);
