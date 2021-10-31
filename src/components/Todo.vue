<template>
  <h1>TODO - Indexed DB</h1>
  <div>
    <AppInput title="name" v-model="record.name" />
    <AppInput title="email" v-model="record.email" />
    <button @click="addTodo()">Add Todo</button>
  </div>
  <hr />
  Total : {{ totalRecords }}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>name</th>
        <th>email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in items" :key="record.id">
        <td>{{ record.id }}</td>
        <td v-if="!record.isEdit">{{ record.name }}</td>
        <td v-else><AppInput v-model="record.name" /></td>
        <td v-if="!record.isEdit">{{ record.email }}</td>
        <td v-else><AppInput v-model="record.email" /></td>
        <td>
          <button v-if="!record.isEdit" @click="onEdit(index)">Edit</button>
          <button v-else @click="onUpdate(record)">Save</button>
          <button @click="onRemove(index, record.id)">Remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { Todo } from '../types/types';
import useIndexedDB from '../composables/useIndexedDB';
import AppInput from './AppInput.vue';

export default defineComponent({
  components: {
    AppInput,
  },
  setup() {
    const TABLE_INDEXED = 'users';
    const { count, create, get, set, remove } = useIndexedDB(TABLE_INDEXED);
    const items = ref<Todo[]>([]);
    const record = ref<Todo>({});
    const totalRecords = ref<number>(0);

    const addTodo = async () => {
      const result = (await create(record.value)) as Todo;
      items.value.push(result);
      totalRecords.value = await count();
      record.value = {};
    };

    const onEdit = (index: number) => {
      items.value[index].isEdit = true;
    };

    const onUpdate = (record: Todo) => {
      record.isEdit = false;
      set(record);
    };

    const onRemove = async (index: number, id: number) => {
      items.value.splice(index, 1);
      remove(id);
      totalRecords.value = await count();
    };

    onBeforeMount(async () => {
      [items.value, totalRecords.value] = await Promise.all([get(), count()]);
    });

    return {
      record,
      items,
      totalRecords,

      addTodo,
      onRemove,
      onUpdate,
      onEdit,
    };
  },
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: violet;
  color: white;
}

button {
  margin-right: 5px;
}

:deep(td > input) {
  border: none;
}
</style>
