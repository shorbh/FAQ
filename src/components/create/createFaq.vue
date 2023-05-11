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
        @click="handleCreate"
      >
        Create
      </button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '../modal/modal.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
const { closeCreate } = defineProps(['closeCreate']);
const store = useStore();

function closeModal() {
  closeCreate();
}

const question = ref('');
const answer = ref('');
const handleCreate = () => {
  if (question.value.trim() && answer.value.trim()) {
    store.dispatch('createFaq', {
      question: question.value,
      answer: answer.value,
    });

    question.value = '';
    answer.value = '';
    closeModal();
  }
};
</script>
