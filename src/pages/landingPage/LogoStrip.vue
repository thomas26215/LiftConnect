<template>
  <div class="logo-strip">
    <p class="strip-label">Rejoins des milliers d'athlètes</p>
    <div class="track-wrapper">
      <div class="track">
        <span v-for="(s, i) in [...sports, ...sports]" :key="s + i" class="sport-tag">
          {{ s }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const sports = [
  'Musculation', 'CrossFit', 'Running', 'Natation', 'Cyclisme',
  'Yoga', 'Boxe', 'Calisthenics', 'Triathlon', 'HIIT',
  'Escalade', 'Football', 'Basketball', 'Tennis', 'Surf',
]
</script>

<style scoped>
.logo-strip {
  padding: 48px 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--primary-cont);
  overflow: hidden;
}

.strip-label {
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 24px;
}

.track-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.track {
  display: flex;
  gap: 10px;
  width: max-content;
  animation: scroll 30s linear infinite;
}

/* badge() Flutter style */
.sport-tag {
  padding: 8px 18px;
  background: rgba(186,242,216,0.07);
  border: 1px solid var(--border-mid);
  border-radius: 100px;
  font-size: 0.8rem;
  color: rgba(186,242,216,0.7);
  white-space: nowrap;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  cursor: default;
}
.sport-tag:hover {
  background: rgba(186,242,216,0.12);
  color: var(--secondary);
  border-color: var(--secondary);
}

@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
