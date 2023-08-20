<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const { t } = useI18n();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true
});

useHead({
  titleTemplate: (titleChunk) => {
    const siteTitle = t("title");
    return titleChunk ? `${titleChunk} - ${siteTitle}` : siteTitle;
  }
});
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
  </Html>
  <main :data-page="route.name">
    <LayoutHeader />
    <LayoutContainer>
      <slot />
    </LayoutContainer>
    <LayoutFooter />
  </main>
</template>
