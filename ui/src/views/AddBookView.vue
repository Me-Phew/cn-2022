<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  NButton,
  NSelect,
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  useMessage,
  NSlider,
  NInputNumber,
  NDatePicker,
  NUpload,
  type UploadFileInfo,
  type SelectOption,
  type FormItemRule,
  type UploadInst,
} from 'naive-ui';
import axios, { AxiosError } from 'axios';
import { handleRequestError } from '@/helpers';
import type {
  FormInst,
  FormValidationError,
  FormRules,
} from "naive-ui";
import { useDebounceFn } from '@vueuse/core';

export interface Author {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  firstName: string,
  secondName: null | string,
  lastName: string,
}

export interface Category {
  id: number,
  name: string,
}

export interface CategoryData {
  name: string | null,
}

export interface BookData {
  title: string | null,
  author: number | null,
  category: number | null,
  amount: number | null,
  quantity: number | null,
  price: number | null,
  publishYear: number | null,
}

export interface AuthorData {
  firstName: null | string,
  secondName: null | string,
  lastName: null | string,
}

const authorData = ref<AuthorData>({
  firstName: 'Carl_',
  secondName: null,
  lastName: 'Sagan',
});

const categoryData = ref<CategoryData>({
  name: 'Popularnonaukowe',
});

const message = useMessage();

const authorsData = ref<Array<Author[]>>([]);
const categoriesData = ref<Array<Category[]>>([]);

const authors = ref<SelectOption[]>([]);
const categories = ref<SelectOption[]>([]);
const authorsSelect = ref<SelectOption[]>([]);
const categoriesSelect = ref<SelectOption[]>([]);

watch(authorsData, (newValue) => {
  newValue.forEach(author => {
    authors.value.push({
      label: author.secondName ? `${author.firstName} ${author.secondName} ${author.lastName}` : `${author.firstName} ${author.lastName}`,
      value: author.id,
    });
  });
  authorsSelect.value = [...authors.value];
});

watch(categoriesData, (newValue) => {
  newValue.forEach(category => {
    categories.value.push({
      label: category.name,
      value: category.id,
    });
  });
  categoriesSelect.value = [...categories.value];
})

const bookData = ref<BookData>({
  title: 'Pale Blue Dot',
  author: 1,
  category: 1,
  amount: 40,
  quantity: 40,
  price: 18,
  publishYear: 757378800000,
});

const authorsLoading = ref(true);
const categoriesLoading = ref(false);

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

const loadCategories = async () => {
  try {
    const response = await axios.get('category');
    if (response.status === 200) {
      categoriesData.value = response.data.categories;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleRequestError(error);
    }
  }
  categoriesLoading.value = false;
}


onMounted(async () => {
  await loadAuthors();
  await loadCategories();
});

const showCreateAuthorModal = ref(false);
const showCreateCategoryModal = ref(false);

const authorFormRules: FormRules = {
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

const bookFormRules: FormRules = {
  title: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Tytuł jest wymagany",
    },
  ],
  author: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Autor jest wymagany",
      validator(_rule: FormItemRule, value: string) {
        if (!value) return false;
      }
    },
  ],
  category: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Kategoria jest wymagana",
      validator(_rule: FormItemRule, value: string) {
        if (!value) return false;
      }
    },
  ],
  amount: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Ilość jest wymagana",
      validator(_rule: FormItemRule, value: string) {
        if (!value) return false;
      }
    },
  ],
  price: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Cena jest wymagana",
      validator(_rule: FormItemRule, value: string) {
        if (!value) return false;
      }
    },
  ],
  publishYear: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Rok wydania jest wymagana",
      validator(_rule: FormItemRule, value: string) {
        if (!value) return false;
      }
    },
  ],
};

const categoryFormRules: FormRules = {
  name: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Nazwa kategorii jest wymagana",
    },
  ],
};

const creatingAuthorInProgress = ref(false);
const creatingCategoryInProgress = ref(false);
const authorForm = ref<FormInst | null>(null);
const categoryForm = ref<FormInst | null>(null);

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

const createCategory = () => {
  if (!creatingCategoryInProgress.value) {
    categoryForm.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
      creatingCategoryInProgress.value = true;
      if (!errors) {
        const createCategoryMessage = message.create("Dodawanie kategorii", {
          type: "loading",
          duration: 0,
        });
        try {
          const response = await axios.post('category', categoryData.value);
          if (response.status === 200) {
            createCategoryMessage.type = 'success';
            createCategoryMessage.content = 'Pomyślnie dodano kategorię';
            creatingCategoryInProgress.value = false;
            showCreateCategoryModal.value = false;
            await loadCategories();
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            createCategoryMessage.type = 'error';
            if (response) {
              createCategoryMessage.content = `Nie udało się dodać kategorii (status: ${response.status}, ${response.data?.message!})`;
            } else {
              createCategoryMessage.content = 'Nie udało się dodać kategorii (status: nieznany)';
            }
          }
          creatingCategoryInProgress.value = false;
        }
        setTimeout(() => {
          createCategoryMessage.destroy();
        }, 2000);
      } else {
        message.error("Najpierw należy poprawnie uzupełnić formularz");
        creatingCategoryInProgress.value = false;
      }
    });
  }
}

const bookForm = ref<FormInst | null>(null);
const uploadPhoto = ref<UploadInst | null>(null);

const files: Array<UploadFileInfo> = [];

const handleUpdateFileList = (fileList: UploadFileInfo[]) => {
  console.log(fileList);
}

const creatingBookInProgress = ref(false);
const createBook = () => {
  if (!creatingBookInProgress.value) {
    bookForm.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
      creatingBookInProgress.value = true;
      if (!errors) {
        const createBookMessage = message.create("Dodawanie książki", {
          type: "loading",
          duration: 0,
        });
        try {
          console.log(uploadPhoto.value);
          const response = await axios.post('book', {
            title: bookData.value.title,
            author: bookData.value.author,
            amount: bookData.value.amount?.toString(),
            quantity: bookData.value.amount?.toString(),
            price: bookData.value.price?.toString(),
            publishYear: new Date(bookData.value.publishYear).getFullYear().toString(),
            category: bookData.value.category?.toString(),
          });
          if (response.status === 200) {
            createBookMessage.type = 'success';
            createBookMessage.content = 'Pomyślnie dodano książkę';
            creatingBookInProgress.value = false;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            createBookMessage.type = 'error';
            if (response) {
              createBookMessage.content = `Nie udało się dodać książki (status: ${response.status}, ${response.data?.message!})`;
            } else {
              createBookMessage.content = 'Nie udało się dodać książki (status: nieznany)';
            }
          }
          creatingBookInProgress.value = false;
        }
        setTimeout(() => {
          createBookMessage.destroy();
        }, 2000);
      } else {
        message.error("Najpierw należy poprawnie uzupełnić formularz");
        creatingBookInProgress.value = false;
      }
    });
  }
}

const debouncedAuthorSearch = useDebounceFn((query) => {
  authorsLoading.value = true;
  authorsSelect.value = authors.value.filter((author) => {
    return author.label?.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
  authorsLoading.value = false;
}, 400);

const debouncedCategorySearch = useDebounceFn((query) => {
  categoriesLoading.value = true;
  categoriesSelect.value = categories.value.filter((category) => {
    return category.label?.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
  categoriesLoading.value = false;
}, 400);

const handleAuthorSearch = (query: string) => {
  debouncedAuthorSearch(query);
}

const handleCategorySearch = (query: string) => {
  debouncedCategorySearch(query);
}

const showThumbnailPreviewModal = ref(false)
const thumbnailPreviewUrlRef = ref('')
const thumbnailFileName = ref('');

const handleThumbnailPreview = (file: UploadFileInfo) => {
  const { url } = file;
  thumbnailPreviewUrlRef.value = url as string;
  showThumbnailPreviewModal.value = true;
  thumbnailFileName.value = file.name;
}

</script>

<template>
  <div class="dashboard-page add-book">
    <h1 class="text-accent">Dodawanie książki</h1>
    <n-form ref="bookForm" :model="bookData" :rules="bookFormRules">
      <n-form-item path="author" label="Autor">
        <n-select v-model:value="bookData.author" filterable placeholder="Wyszukaj autora" :options="authorsSelect"
          :loading="authorsLoading" remote @search="handleAuthorSearch" />
        <n-button type="primary" size="large" @click="showCreateAuthorModal = true">
          Dodaj autora
        </n-button>
        <n-modal v-model:show="showCreateAuthorModal">
          <n-card style="width: 600px" title="Dodaj autora" :bordered="false" size="huge" role="dialog"
            aria-modal="true">
            <n-form ref="authorForm" :model="authorData" :rules="authorFormRules">
              <n-form-item path="firstName" label="Imię">
                <n-input v-model:value="authorData.firstName" type="text" placeholder="Adam" />
              </n-form-item>
              <n-form-item path="secondName" label="Drugie imię">
                <n-input v-model:value="authorData.secondName" type="text" placeholder="user@example.com" />
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
      </n-form-item>

      <n-form-item path="category" label="Kategoria">
        <n-select v-model:value="bookData.category" filterable placeholder="Wyszukaj kategorię"
          :options="categoriesSelect" :loading="categoriesLoading" remote @search="handleCategorySearch" />

        <n-button type="primary" size="large" @click="showCreateCategoryModal = true">
          Dodaj kategorię
        </n-button>
        <n-modal v-model:show="showCreateCategoryModal">
          <n-card style="width: 600px" title="Dodaj kategorię" :bordered="false" size="huge" role="dialog"
            aria-modal="true">
            <p class='text-accent heading'>Podaj dane kategorii:</p>
            <n-form ref="categoryForm" :model="categoryData" :rules="categoryFormRules">
              <n-form-item path="firstName" label="Nazwa">
                <n-input v-model:value="categoryData.name" type="text" placeholder="Lektury szkolne" />
              </n-form-item>
              <div class="button-wrapper">
                <n-button round type="primary" @click.prevent="createCategory">
                  Dodaj kategorię
                </n-button>
              </div>
            </n-form>
          </n-card>
        </n-modal>
      </n-form-item>

      <n-form-item path="title" label="Tytuł">
        <n-input v-model:value="bookData.title" type="text" placeholder="Tytuł książki" />
      </n-form-item>

      <n-form-item path="amount" label="Ilość">
        <n-slider v-model:value="bookData.amount" :step="1" :min="1" :max="1000" />
        <n-input-number v-model:value="bookData.amount" size="small" :min="1" :max="1000"
          placeholder="Ilość egzemplarzy" />
      </n-form-item>

      <n-form-item path="price" label="Cena">
        <n-slider v-model:value="bookData.price" :step="1" :min="1" :max="100" />
        <n-input-number v-model:value="bookData.price" size="small" :min="1" :max="100" placeholder="Cena" />
      </n-form-item>

      <n-form-item path="publishYear" label="Rok wydania">
        <n-date-picker v-model:value="bookData.publishYear" type="year" clearable placeholder="Rok wydania" />
      </n-form-item>

      <n-form-item path="image" label="Zdjęcie okładki">
        <n-upload :default-upload="false" ref="uploadPhoto" list-type="image-card" :max="1"
          @preview="handleThumbnailPreview" @update-file-list="handleUpdateFileList">
          Załącz zdjęcie
        </n-upload>
        <n-modal v-model:show="showThumbnailPreviewModal" preset="card" style="width: 600px" :title="thumbnailFileName">
          <img :src="thumbnailPreviewUrlRef" style="width: 100%">
        </n-modal>
      </n-form-item>

      <n-button round type="primary" @click.prevent="createBook">
        Dodaj książkę
      </n-button>
    </n-form>
  </div>
</template>


<style lang="scss">
.add-book {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.n-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 400px;

  .n-form-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .n-input-wrapper {
    width: 400px;
  }

  .n-button {
    width: 50%;
    align-self: center;
  }
}
</style>
