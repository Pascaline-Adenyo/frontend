<template>
  <DefaultLayout>
    <div class="flex-1 p-6 bg-ice-50">
      <!-- Section titre avec fond ice -->
      <div class="bg-ice-50 pb-6">
        <h1 class="text-3xl font-bold text-blue-600 text-center">Historique des ventes et interventions</h1>
      </div>

      <!-- Section filtres avec fond ice -->
      <div class="bg-ice-50 mb-8">
        <div class="container mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-4">
            <input
              v-model="searchClient"
              type="text"
              placeholder="Rechercher par client..."
              class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
            />
            <input
              v-model="filterDate"
              type="date"
              class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button 
              @click="applyFilters"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 w-full md:w-auto"
            >
              Filtrer
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
                <th class="py-3 px-6">Type</th>
                <th class="py-3 px-6">Date</th>
                <th class="py-3 px-6">Montant</th>
                <th class="py-3 px-6">Statut</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 text-sm">
              <tr 
                v-for="(sale, index) in filteredSales" 
                :key="index"
                class="hover:bg-gray-50 transition duration-150 border-b border-gray-200"
              >
                <td class="py-3 px-6">{{ sale.client }}</td>
                <td class="py-3 px-6">{{ sale.type }}</td>
                <td class="py-3 px-6">{{ formatDate(sale.date) }}</td>
                <td class="py-3 px-6">{{ sale.amount }}</td>
                <td class="py-3 px-6">
                  <span :class="statusClasses(sale.status)">{{ sale.status }}</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <button class="text-blue-500 hover:text-blue-700 font-medium">Voir</button>
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
  name: 'HistoriqueVentesPage',
  components: {
    DefaultLayout
  },
  data() {
    return {
      salesData: [
        { client: 'Société X', type: 'Vente', date: '2025-07-10', amount: '350 000 FCFA', status: 'Payé' },
        { client: 'Client Y', type: 'Service', date: '2025-07-05', amount: '120 000 FCFA', status: 'En attente' },
        { client: 'Société Z', type: 'Vente', date: '2025-06-20', amount: '500 000 FCFA', status: 'Payé' },
      ],
      searchClient: '',
      filterDate: '',
    };
  },
  computed: {
    filteredSales() {
      return this.salesData.filter(sale => {
        const matchesClient = sale.client.toLowerCase().includes(this.searchClient.toLowerCase());
        const matchesDate = this.filterDate ? sale.date === this.filterDate : true;
        return matchesClient && matchesDate;
      });
    }
  },
  methods: {
    applyFilters() {
      console.log('Filtres appliqués');
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR');
    },
    statusClasses(status) {
      return {
        'bg-green-200 text-green-800': status === 'Payé',
        'bg-yellow-200 text-yellow-800': status === 'En attente',
        'bg-red-200 text-red-800': status === 'Annulé',
        'py-1 px-3 rounded-full text-xs font-semibold': true
      };
    }
  }
}
</script>

<style>
.bg-ice-50 {
  background-color: #f0f9ff;
}
</style>