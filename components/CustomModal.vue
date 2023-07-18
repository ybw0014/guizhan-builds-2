<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from "@headlessui/vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    bgClose?: boolean;
  }>(),
  {
    open: false,
    bgClose: true
  }
);

const isOpen = ref<boolean>(props.open);

function openModal(callback?: () => void) {
  isOpen.value = true;
  callback && callback();
}

function closeModal(callback?: () => void) {
  isOpen.value = false;
  callback && callback();
}

function bgClick() {
  if (props.bgClose) {
    closeModal();
  }
}

defineExpose({ openModal, closeModal });
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" :open="isOpen" class="relative z-10">
      <TransitionChild as="template" name="modal-bg">
        <div class="fixed inset-0 bg-black !bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto" @click="bgClick">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" name="modal">
            <DialogPanel class="custom-modal-panel bg-default" @click.stop>
              <DialogTitle as="h3" class="text-lg font-semibold leading-6">
                <slot name="title"></slot>
              </DialogTitle>
              <div class="mt-2">
                <slot name="content"></slot>
              </div>
              <div class="mt-4">
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scroped lang="scss">
.custom-modal-panel {
  @apply w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all;
}
</style>
