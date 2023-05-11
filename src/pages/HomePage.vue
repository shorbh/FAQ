<template>
  <button
    @click="handleModal"
    class="fixed right-4 top-2 border border-black px-2 py-1 rounded-md ml-2"
  >
    Create FAQ
  </button>
  <section class="px-4">
    <header class="sm:text-center text-2xl">FAQ</header>
    <div
      v-for="(faq, index) in faqData"
      class="w-full rounded shadow-md h-full p-4 mb-1 flex justify-between"
    >
      <div class="w-11/12">
        <p>Q. {{ faq.question }}</p>
        <p>{{ faq.answer }}</p>
      </div>
      <div class="flex flex-col items-center">
        <button @click="openEditModal(index)">Edit</button>
        <button class="text-red-700" @click="openDeleteModal">x</button>
      </div>
    </div>
  </section>
  <Modal v-if="showFaqModal">
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
  <EditFaq v-if="showEditModal" :faq="editFaq" :close-edit="closeEditModal" />
  <DeleteFaq
    v-if="showDeleteModal"
    :faqId="delFaqId"
    :close-delete="closeDeleteModal"
  />
</template>

<script setup>
import Modal from '../components/modal/modal.vue';
import EditFaq from '../components/edit/editFaq.vue';
import DeleteFaq from '../components/delete/deleteFaq.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const showFaqModal = ref(false);
function handleModal() {
  showFaqModal.value = !showFaqModal.value;
}
function closeModal() {
  showFaqModal.value = false;
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

const faqData = computed(() => store.state.faqList);

const showEditModal = ref(false);
const editFaq = ref({});
function openEditModal(editPosition) {
  let curFaq = faqData.value.find((faq, i) => i == editPosition);
  curFaq.id = editPosition;
  editFaq.value = curFaq;
  showEditModal.value = true;
}
function closeEditModal() {
  showEditModal.value = false;
}

const showDeleteModal = ref(false);
const delFaqId = ref({});
function openDeleteModal(editPosition) {
  delFaqId.value = editPosition;
  showDeleteModal.value = true;
}
function closeDeleteModal() {
  showDeleteModal.value = false;
}
</script>
