<template>
  <div>
    <PageHero
      :title="t.rooms.title"
      :kicker="t.rooms.kicker"
      :lead="t.rooms.lead"
      image="/images/zimmer-1-1.jpg"
      position="center 65%"
    />

    <section class="section">
      <div class="container">
        <div class="rooms-grid">
          <RoomCard v-for="(room, i) in rooms" :key="room.slug" :room="room" :index="i" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const t = useMessages()
const rooms = useRooms()

usePageSeo({
  title: t.value.rooms.seoTitle,
  description: t.value.rooms.seoDescription,
  image: '/images/zimmer-1-1.jpg',
})
</script>

<style scoped>
.rooms-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16) clamp(var(--space-6), 3vw, var(--space-12));
}

@media (min-width: 720px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1080px) {
  .rooms-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
