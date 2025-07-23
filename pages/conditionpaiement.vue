<template>
  <DefaultLayout>
    <div class="flex-1 p-6 bg-ice-50">
      <!-- Section titre avec fond ice -->
      <div class="bg-ice-50 pb-6">
        <h1 class="text-3xl font-bold text-blue-600 text-center">Conditions de Paiement Spécifiques</h1>
      </div>

      <!-- Section filtres avec fond ice -->
      <div class="bg-ice-50 mb-8">
        <div class="container mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par client..."
              class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
            />
            <button 
              @click="addCondition"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 w-full md:w-auto"
            >
              Ajouter une condition
            </button>
          </div>
        </div>
      </div>

      <!-- Tableau avec fond blanc et en-tête bleu -->
      <div class="container mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="bg-[#BFDBFE] text-left text-gray-800 uppercase text-sm leading-normal">
                <th class="py-3 px-6">Client</th>
                <th class="py-3 px-6">Type de Paiement</th>
                <th class="py-3 px-6">Délais (jours)</th>
                <th class="py-3 px-6">Mode</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 text-sm">
              <tr 
                v-for="(condition, index) in filteredConditions" 
                :key="index"
                class="hover:bg-gray-50 transition duration-150 border-b border-gray-200"
              >
                <td class="py-3 px-6">{{ condition.client }}</td>
                <td class="py-3 px-6">{{ condition.type }}</td>
                <td class="py-3 px-6">{{ condition.delayDays }}</td>
                <td class="py-3 px-6">{{ condition.mode }}</td>
                <td class="py-3 px-6 text-center space-x-2">
                  <button 
                    @click="editCondition(condition)"
                    class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200 text-xs md:text-sm"
                  >
                    Modifier
                  </button>
                  <button 
                    @click="deleteCondition(condition)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 text-xs md:text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'

export default {
  name: 'ConditionsPaiementPage',
  components: {
    DefaultLayout
  },
  data() {
    return {
      searchQuery: '',
      paymentConditions: [
        { client: 'Entreprise X', type: 'Paiement différé', delayDays: 30, mode: 'Virement' },
        { client: 'Client ABC', type: 'Paiement à la livraison', delayDays: 0, mode: 'Cash' },
      ],
    };
  },
  computed: {
    filteredConditions() {
      return this.paymentConditions.filter(condition => 
        condition.client.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addCondition() {
      console.log('Add new condition clicked');
      // Implémentez l'ouverture d'un modal ou formulaire
    },
    editCondition(condition) {
      console.log('Edit condition:', condition);
      // Implémentez l'édition
    },
    deleteCondition(condition) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette condition de paiement ?')) {
        console.log('Delete condition:', condition);
        // Implémentez la suppression
      }
    },
  },
};
</script>

<style>
.bg-ice-50 {
  background-color: #f0f9ff;
}
</style>