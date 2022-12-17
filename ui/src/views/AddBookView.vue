<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { NButton, NSelect, NModal, NCard, NForm, NFormItem, NInput, useMessage, type SelectOption } from 'naive-ui';
import axios, { AxiosError } from 'axios';
import { handleRequestError } from '@/helpers';
import type {
  FormInst,
  FormValidationError,
  FormRules,
} from "naive-ui";
import { useDebounceFn } from '@vueuse/core'

export interface Author {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  firstName: string,
  secondName: null | string,
  lastName: string,
}

export interface BookData {
  name: null | string,
  author: null | string,
  category: null | string,
}

export interface AuthorData {
  firstName: null | string,
  secondName: null | string,
  lastName: null | string,
}

const authorData = ref<AuthorData>({
  firstName: 'Krzysztof',
  secondName: null,
  lastName: 'Janusz',
}
);

const message = useMessage();

const authorsData = ref<Array<Author[]>>([]);

const authors = ref<SelectOption[]>([]);
const authorsSelect = ref<SelectOption[]>([]);

watch(authorsData, (newValue) => {
  newValue.forEach(author => {
    authors.value.push({
      label: author.secondName ? `${author.firstName} ${author.secondName} ${author.lastName}` : `${author.firstName} ${author.lastName}`,
      value: author.id,
    });
  });
  authorsSelect.value = [...authors.value];
})

const bookData = ref<BookData>({
  name: null,
  author: null,
  category: null,
});

const authorsLoading = ref(true);

const loadAuthors = async () => {
  try {
    const response = await axios.get('author');
    if (response.status === 200) {
      authorsData.value = response.data.authors;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleRequestError(error);
    }
  }
  authorsLoading.value = false;
}

onMounted(async () => {
  await loadAuthors();
});

const showCreateAuthorModal = ref(false);

const rules: FormRules = {
  firstName: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Imię jest wymagane",
    },
  ],
  secondName: [
    {
      trigger: ["input", "blur"],
    },
  ],
  lastName: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Nazwisko jest wymagane",
    },
  ],
};

const creatingAuthorInProgress = ref(false);
const authorForm = ref<FormInst | null>(null);

const createAuthor = () => {
  if (!creatingAuthorInProgress.value) {
    authorForm.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
      creatingAuthorInProgress.value = true;
      if (!errors) {
        const createAuthorMessage = message.create("Dodawanie autora", {
          type: "loading",
          duration: 0,
        });
        try {
          const response = await axios.post('author', authorData.value);
          if (response.status === 200) {
            createAuthorMessage.type = 'success';
            createAuthorMessage.content = 'Pomyślnie dodano autora';
            creatingAuthorInProgress.value = false;
            showCreateAuthorModal.value = false;
            await loadAuthors();
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            createAuthorMessage.type = 'error';
            if (response) {
              createAuthorMessage.content = `Nie udało się dodać autora (status: ${response.status}, ${response.data?.message!})`;
            } else {
              createAuthorMessage.content = 'Nie udało się dodać autora (status: nieznany)';
            }
          }
          creatingAuthorInProgress.value = false;
        }
        setTimeout(() => {
          createAuthorMessage.destroy();
        }, 2000);
      } else {
        message.error("Najpierw należy poprawnie uzupełnić formularz");
        creatingAuthorInProgress.value = false;
      }
    });
  }
}

const debouncedSearch = useDebounceFn((query) => {
  authorsLoading.value = true;
  authorsSelect.value = authors.value.filter((author) => {
    return author.label?.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
  authorsLoading.value = false;
}, 400);

const handleAuthorSearch = (query: string) => {
  debouncedSearch(query);
}

</script>

<template>
  <div class="dashboard-page add-book">
    <p class='text-accent heading'>Wybierz autora książki:</p>
    <n-select v-model:value="bookData.author" filterable placeholder="Wyszukaj autora"
      :options="authorsSelect" :loading="authorsLoading" remote @search="handleAuthorSearch" />

    <n-button type="primary" size="large" @click="showCreateAuthorModal = true">
      Dodaj autora
    </n-button>
    <n-modal v-model:show="showCreateAuthorModal">
      <n-card style="width: 600px" title="Dodaj autora" :bordered="false" size="huge" role="dialog"
        aria-modal="true">
        <p class='text-accent heading'>Podaj dane autora:</p>
        <n-form ref="authorForm" :model="authorData" :rules="rules">
          <n-form-item path="firstName" label="Imię">
            <n-input v-model:value="authorData.firstName" type="text" placeholder="Adam" />
          </n-form-item>
          <n-form-item path="secondName" label="Drugie imię">
            <n-input v-model:value="authorData.secondName" type="text"
              placeholder="user@example.com" />
          </n-form-item>
          <n-form-item path="lastName" label="Nazwisko">
            <n-input v-model:value="authorData.lastName" type="text" placeholder="Mickiewicz" />
          </n-form-item>
          <div class="button-wrapper">
            <n-button round type="primary" @click.prevent="createAuthor">
              Dodaj autora
            </n-button>
          </div>
        </n-form>
      </n-card>
    </n-modal>
    <p class='text-accent heading'>Wybierz kategorię książki:</p>
    <n-select v-model:value="bookData.author" filterable placeholder="Wyszukaj autora"
      :options="authors" :loading="authorsLoading" remote @search="handleAuthorSearch" />

    <n-button type="primary" size="large" @click="showCreateAuthorModal = true">
      Dodaj kategorię
    </n-button>
    <n-modal v-model:show="showCreateAuthorModal">
      <n-card style="width: 600px" title="Dodaj autora" :bordered="false" size="huge" role="dialog"
        aria-modal="true">
        <p class='text-accent heading'>Podaj dane autora:</p>
        <n-form ref="authorForm" :model="authorData" :rules="rules">
          <n-form-item path="firstName" label="Imię">
            <n-input v-model:value="authorData.firstName" type="text" placeholder="Adam" />
          </n-form-item>
          <n-form-item path="secondName" label="Drugie imię">
            <n-input v-model:value="authorData.secondName" type="text"
              placeholder="user@example.com" />
          </n-form-item>
          <n-form-item path="lastName" label="Nazwisko">
            <n-input v-model:value="authorData.lastName" type="text" placeholder="Mickiewicz" />
          </n-form-item>
          <div class="button-wrapper">
            <n-button round type="primary" @click.prevent="createAuthor">
              Dodaj autora
            </n-button>
          </div>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>


<style lang="scss">
.add-book {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20rem;
}

.n-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
