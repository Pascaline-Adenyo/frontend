<template>
  <DefaultLayout>
    <div class="min-h-screen bg-ice-50 p-6">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Gestion des Contacts Associés</h1>

      <!-- Barre de recherche et bouton Ajouter -->
      <div class="flex items-center justify-between mb-6">
        <div class="relative w-64">
          <input 
            type="text" 
            placeholder="Rechercher un contact..." 
            class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Ajouter Contact
        </button>
      </div>

      <div class="border-t border-gray-300 my-4"></div>

      <!-- Tableau des contacts -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#BFDBFE]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Nom Prénom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Fonction</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Client Associé</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Jean Doe</td>
              <td class="px-6 py-4 whitespace-nowrap">RH</td>
              <td class="px-6 py-4 whitespace-nowrap">+228 90000000</td>
              <td class="px-6 py-4 whitespace-nowrap">j.doe@gmail.com</td>
              <td class="px-6 py-4 whitespace-nowrap">Société ABC</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-blue-600 hover:text-blue-800 mr-3">Modifier</button>
                <button class="text-red-600 hover:text-red-800">Supprimer</button>
              </td>
            </tr>
            <!-- Ligne vide pour montrer la structure -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap"></td>
              <td class="px-6 py-4 whitespace-nowrap"></td>
              <td class="px-6 py-4 whitespace-nowrap"></td>
              <td class="px-6 py-4 whitespace-nowrap"></td>
              <td class="px-6 py-4 whitespace-nowrap"></td>
              <td class="px-6 py-4 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'

export default {
  name: 'ContactsPage',
  components: {
    DefaultLayout
  }
}
</script>

<style>
/* Couleur ice personnalisée */
.bg-ice-50 {
  background-color: #f0f9ff;
}
</style>