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
        <button class="text-red-700" @click="openDeleteModal(index)">x</button>
      </div>
    </div>
  </section>
  <CreateFaq v-if="showCreateModal" :close-create="closeCreateModal" />
  <EditFaq v-if="showEditModal" :faq="editFaq" :close-edit="closeEditModal" />
  <DeleteFaq
    v-if="showDeleteModal"
    :faqId="delFaqId"
    :close-delete="closeDeleteModal"
  />
</template>

<script setup>
import Modal from '../components/modal/modal.vue';
import CreateFaq from '../components/create/createFaq.vue';
import EditFaq from '../components/edit/editFaq.vue';
import DeleteFaq from '../components/delete/deleteFaq.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const showCreateModal = ref(false);
function handleModal() {
  showCreateModal.value = true;
}
function closeCreateModal() {
  showCreateModal.value = false;
}

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
