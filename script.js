gsap.registerPlugin(SplitText);

let split = SplitText.create("#title",{
  type:"words"
});

gsap.from(split.words, {
  y:100,
  autoAlpha:0,
  stagger:0.3
})

gsap.from(".nav li", {
  y: 20,
  autoAlpha: 0,
  duration: 0.6,
  stagger: 0.12,
  ease: "power2.out"
});

for (let i = 1; i <= 4; i++) {
  gsap.fromTo(
    `#left${i}`,
    { scale: 0, y: -150, opacity: 0 },
    {
      duration: 0.8,
      scale: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.01 + 0.15 * i,
    }
  );
}

for (let i = 1; i <= 4; i++) {
  gsap.fromTo(
    `#right${i}`,
    { scale: 0, y: 150, opacity: 0 },
    {
      duration: 0.8,
      scale: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.01 + 0.15 * i,
    }
  );
}


gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero", {
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "#gallery",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
});

const imgs = gsap.utils.toArray("#gallery img");
  
gsap.from(imgs, {  
    y:150,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: { trigger: "#gallery", start: "top 40%", toggleActions: "play none none reverse", transformStyle:"preserve-3d",
  transform: "rotateX(90deg) rotateZ(-10deg) translateZ(0)"},
  });

const track = document.querySelector(".wrapper");
const distance = () => track.scrollWidth - innerWidth;

const horizontalScroll = gsap.to(track, {
  x: () => -distance(),
  ease: "none",
  scrollTrigger: {
    trigger: "#gallery",
    start: "top top",
    end: () => "+=" + distance(),
    pin: true,
    scrub: 1,
  },
});

imgs.forEach((image) => {
  gsap.fromTo(image, {y:0},{
    y:20,
    duration: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: image,
      containerAnimation: horizontalScroll,
      start: "left left",
      end: "right left",
      scrub: 1,
    },
  });
});

document.querySelectorAll("#gallery .category").forEach((group) => {
  const images = group.querySelectorAll("img");
  
  group.addEventListener("pointerenter", () => {
    images.forEach((image) => image.classList.add("is-hovered"));
    imgcategory = group.classList[0];
    category.innerHTML = imgcategory;
  });

  group.addEventListener("pointerleave", () => {
    images.forEach((image) => image.classList.remove("is-hovered"));
  });
  
  const gallery = document.querySelector("#gallery");
  const wrapper = document.querySelector("#gallery .wrapper");
  
  images.forEach((image) => image.addEventListener("click", () => {
    const wasEnlarged = image.classList.contains("enlarged");

    document.querySelectorAll("#gallery .enlarged").forEach((selectedImage) => {
      selectedImage.classList.remove("enlarged");
      gsap.to(selectedImage, { scale: 1, duration: 0.25 });
    });
    document.querySelectorAll("#gallery .category").forEach((categoryGroup) => {
      categoryGroup.classList.remove("image-focused");
    });

    gallery.classList.toggle("image-focused", !wasEnlarged);
    if (!wasEnlarged) {
      image.classList.add("enlarged");
      group.classList.add("image-focused");
      const imageCenter = image.getBoundingClientRect().left + image.getBoundingClientRect().width / 2;
      const horizontalTrigger = horizontalScroll.scrollTrigger;
      const scrollDistance = distance();
      const scrollAdjustment = (imageCenter - innerWidth / 2)
        * (horizontalTrigger.end - horizontalTrigger.start)
        / scrollDistance;
      const centeredScroll = gsap.utils.clamp(
        horizontalTrigger.start,
        horizontalTrigger.end,
        horizontalTrigger.scroll() + scrollAdjustment
      );
      
      horizontalTrigger.scroll(centeredScroll);
      horizontalTrigger.update();
      gsap.to(image, { scale: 2, duration: 0.25, ease: "power2.out" });
    }
  }));

});

document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("#gallery img")) return;

  document.querySelectorAll("#gallery .enlarged").forEach((image) => {
    image.classList.remove("enlarged");
    gsap.to(image, { scale: 1, duration: 0.25 });
  });
  document.querySelectorAll("#gallery .category").forEach((group) => {
    group.classList.remove("image-focused");
  });
  document.querySelector("#gallery").classList.remove("image-focused");
});