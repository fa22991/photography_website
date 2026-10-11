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
      delay: 0.01 + 0.1 * i,
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

gsap.to(track, {
  x: () => -distance(),
  ease: "none",
  scrollTrigger: { trigger: "#gallery", start: "top top", end: () => "+=" + distance(),
                   pin: true, scrub: 1},
});
