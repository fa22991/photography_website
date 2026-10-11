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
  scale: 0.7, opacity: 0.5, ease: "none",
  scrollTrigger: { trigger: "#gallery", start: "top bottom", end: "top top", scrub: true }
});