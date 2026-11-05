<template>
  <div
    class="cursor"
    :class="{ 'cursor--active': label, 'cursor--hover': hovering && !label, 'cursor--hidden': !visible }"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    aria-hidden="true"
  >
    <span class="cursor__dot"></span>
    <span class="cursor__label">{{ shownLabel }}</span>
  </div>
</template>

<script setup lang="ts">
// A soft follower that names what a click will do over media
// (data-cursor="Ansehen"). Decorative only: the native cursor stays, and it
// never renders for touch, coarse pointers or reduced motion.
const x = ref(-100)
const y = ref(-100)
const label = ref('')
const shownLabel = ref('')
const hovering = ref(false)
const visible = ref(false)

let targetX = -100
let targetY = -100
let frame = 0

// Ease toward the pointer; stop scheduling frames once it has caught up.
function loop() {
  const dx = targetX - x.value
  const dy = targetY - y.value
  x.value += dx * 0.2
  y.value += dy * 0.2
  frame = Math.abs(dx) + Math.abs(dy) > 0.2 ? requestAnimationFrame(loop) : 0
}

function onMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  targetX = event.clientX
  targetY = event.clientY
  if (!frame) frame = requestAnimationFrame(loop)
  visible.value = true
  const el = event.target instanceof Element ? event.target : null
  const labelled = el?.closest<HTMLElement>('[data-cursor]')
  label.value = labelled?.dataset.cursor ?? ''
  if (label.value) shownLabel.value = label.value
  hovering.value = !!el?.closest('a, button')
}

function onLeave() {
  visible.value = false
}

onMounted(() => {
  const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  if (!ok.matches) return
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('pointerleave', onLeave)
})
</script>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  pointer-events: none;
  transition: opacity var(--dur-base) var(--ease);
}

.cursor--hidden {
  opacity: 0;
}

.cursor__dot,
.cursor__label {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  translate: -50% -50%;
}

.cursor__dot {
  width: 8px;
  height: 8px;
  background: var(--gold);
  transition: scale var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease);
}

.cursor--hover .cursor__dot {
  scale: 5;
  opacity: 0.35;
}

.cursor--active .cursor__dot {
  opacity: 0;
}

.cursor__label {
  display: grid;
  place-items: center;
  width: 6.5rem;
  height: 6.5rem;
  background: var(--ink);
  color: var(--text-on-dark);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  scale: 0;
  transition: scale var(--dur-slow) var(--ease-out);
}

.cursor--active .cursor__label {
  scale: 1;
}
</style>
