<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type TechStack from '@/types/TechStack.ts'
import { useRedirection } from '@/composables/redirection.ts'

const { t } = useI18n()
const { openInNewTab, GITHUB_PROFILE_URL, ROOT_ME_PROFILE_URL, LINKED_IN_PROFILE_URL } = useRedirection()

const techStacks: Array<TechStack> = [
  {
    name: 'Java',
    filePath: '/tech-stack/java.svg',
  },
  {
    name: 'Spring',
    filePath: '/tech-stack/spring.svg',
  },
  {
    name: 'Maven',
    filePath: '/tech-stack/maven.svg',
  },
  {
    name: 'JUnit',
    filePath: '/tech-stack/junit.svg',
  },
  {
    name: 'JavaScript',
    filePath: '/tech-stack/javascript.svg',
  },
  {
    name: 'TypeScript',
    filePath: '/tech-stack/typescript.svg',
  },
  {
    name: 'Node.js',
    filePath: '/tech-stack/nodejs.svg',
  },
  {
    name: 'Bun',
    filePath: '/tech-stack/bun.svg',
  },
  {
    name: 'Yarn',
    filePath: '/tech-stack/yarn.svg',
  },
  {
    name: 'Vue.js',
    filePath: '/tech-stack/vue.svg',
  },
  {
    name: 'Pinia',
    filePath: '/tech-stack/pinia.png',
  },
  {
    name: 'Vite',
    filePath: '/tech-stack/vite.svg',
  },
  {
    name: 'Vitest',
    filePath: '/tech-stack/vitest.svg',
  },
  {
    name: 'Vuetify',
    filePath: '/tech-stack/vuetify.svg',
  },
  {
    name: 'Quasar',
    filePath: '/tech-stack/quasar.svg',
  },
  {
    name: 'Docker',
    filePath: '/tech-stack/docker.svg',
  },
  {
    name: 'Git',
    filePath: '/tech-stack/git.svg',
  },
  {
    name: 'GitHub',
    filePath: '/tech-stack/github.svg',
  },
  {
    name: 'GitHub Actions',
    filePath: '/tech-stack/github-actions.svg',
  },
  {
    name: 'Kubernetes',
    filePath: '/tech-stack/kubernetes.svg',
  },
  {
    name: 'Google Cloud Platform',
    filePath: '/tech-stack/gcp.svg',
  },
  {
    name: 'PostgreSQL',
    filePath: '/tech-stack/postgresql.svg',
  },
  {
    name: 'Kafka',
    filePath: '/tech-stack/kafka.svg',
  },
  {
    name: 'Redis',
    filePath: '/tech-stack/redis.svg',
  },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    logoFilePath: '/icons/linkedin.png',
    linkToOpen: LINKED_IN_PROFILE_URL,
  },
  {
    name: 'GitHub',
    logoFilePath: '/icons/github.svg',
    linkToOpen: GITHUB_PROFILE_URL,
  },
  {
    name: 'RootMe',
    logoFilePath: '/icons/rootme.svg',
    linkToOpen: ROOT_ME_PROFILE_URL,
  },
]
</script>

<template>
  <div class="row summary q-px-md q-py-sm full-width justify-center">
    <div class="flex items-center">
      <q-avatar size="60px">
        <img src="@/assets/images/my-avatar.png" alt="avatar" />
      </q-avatar>
    </div>

    <span class="q-pl-md">{{ t('introduction-pdf.summary') }}</span>

    <q-separator vertical class="q-mx-md" />
    <div class="q-gutter-md q-pa-sm flex items-center">
      <span v-for="socialLink in socialLinks" :key="socialLink.name">
        <q-img
          :src="socialLink.logoFilePath"
          class="redirect-icon"
          loading="eager"
          width="40px"
          height="40px"
          @click="openInNewTab(socialLink.linkToOpen)"
        />
        <q-tooltip :delay="200">
          {{ socialLink.name }}
        </q-tooltip>
      </span>
    </div>
  </div>

  <q-separator />
  <div class="row q-pt-sm q-px-md full-width justify-center">
    <span class="q-pb-md">{{ t('introduction-pdf.tools-worked-with') }} :</span>
  </div>
  <div class="row full-width justify-center q-pb-md">
    <div class="row tech-stack q-gutter-md q-pb-sm q-px-lg justify-center">
      <div v-for="techStack in techStacks" :key="techStack.name">
        <q-img :src="techStack.filePath" loading="eager" width="50px" height="50px" />
        <q-tooltip :delay="200">
          {{ techStack.name }}
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary {
  white-space: pre-wrap;
}

.tech-stack {
  max-width: 900px;
}

.redirect-icon {
  cursor: pointer;
}
</style>
