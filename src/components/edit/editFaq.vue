<template>
  <Modal>
    <template #content>
      <input
        type="text"
        placeholder="Enter Question"
        class="border-b border-black outline-none pb-1 mb-3"
        v-model="question"
      />
      <input
        type="text"
        placeholder="Enter Answer"
        class="border-b border-black outline-none pb-1 mb-3"
        v-model="answer"
      />
    </template>
    <template #footer>
      <button class="border border-black px-2 rounded" @click="closeModal">
        Cancel
      </button>
      <button
        class="border border-black px-2 rounded ml-2"
        @click="handleEditFaq"
      >
        Edit
      </button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '../modal/modal.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
const { faq, closeEdit } = defineProps(['faq', 'closeEdit']);
const store = useStore();

function closeModal() {
  closeEdit();
}

const question = ref(faq.question);
const answer = ref(faq.answer);
function handleEditFaq() {
  store.dispatch('editFaq', {
    id: faq.id,
    faq: {
      question,
      answer,
    },
  });
  closeModal();
}
</script>
