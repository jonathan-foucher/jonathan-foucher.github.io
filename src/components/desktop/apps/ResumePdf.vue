<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isEntryExisting = (index: number, type: string) =>
  t(`resume-pdf.${type}.content-${index}.title`) !== `resume-pdf.${type}.content-${index}.title`

const experienceIndexes = ref<Array<number>>([])
const educationIndexes = ref<Array<number>>([])

onMounted(() => {
  let maxIndex = 0
  while (isEntryExisting(maxIndex + 1, 'education')) {
    maxIndex++
  }
  educationIndexes.value = [...Array(maxIndex).keys()].map((n) => n + 1).reverse()

  maxIndex = 0
  while (isEntryExisting(maxIndex + 1, 'experience')) {
    maxIndex++
  }
  experienceIndexes.value = [...Array(maxIndex).keys()].map((n) => n + 1).reverse()
})
</script>

<template>
  <q-timeline color="secondary" class="timeline q-px-xl">
    <q-timeline-entry heading>
      {{ t(`resume-pdf.experience.heading`) }}
    </q-timeline-entry>
    <q-timeline-entry
      v-for="index in experienceIndexes"
      :key="index"
      class="entry-item"
      color="green"
      :title="t(`resume-pdf.experience.content-${index}.title`)"
      :subtitle="t(`resume-pdf.experience.content-${index}.subtitle`)"
      :avatar="t(`resume-pdf.experience.content-${index}.avatar-path`) || undefined"
    >
      <div class="entry-content">
        {{ t(`resume-pdf.experience.content-${index}.content`) }}
      </div>
    </q-timeline-entry>

    <q-timeline-entry heading>
      {{ t(`resume-pdf.education.heading`) }}
    </q-timeline-entry>
    <q-timeline-entry
      v-for="index in educationIndexes"
      :key="index"
      class="entry-item"
      color="blue"
      :title="t(`resume-pdf.education.content-${index}.title`)"
      :subtitle="t(`resume-pdf.education.content-${index}.subtitle`)"
      :avatar="t(`resume-pdf.education.content-${index}.avatar-path`) || undefined"
    >
      <div class="entry-content">
        {{ t(`resume-pdf.education.content-${index}.content`) }}
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<style scoped>
.entry-content {
  white-space: pre-wrap;
}

.entry-item {
  white-space: pre-wrap;
}

.timeline {
  justify-content: center;
  max-width: 800px;
  padding-bottom: 50px;
  padding-top: 20px;
}

ul {
  margin: 0 auto;
}
</style>
