<template>
  <DefaultLayout>
    <main class="flex-1 p-6 bg-gray-50 min-h-screen"> <div class="max-w-7xl mx-auto mb-8"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-red-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Clients en retard</h3>
                <p class="text-3xl font-extrabold text-red-600 mt-2">{{ kpis.clientsEnRetard }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Dernière mise à jour : il y a 5 min</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-yellow-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Montant à recouvrer</h3>
                <p class="text-3xl font-extrabold text-yellow-600 mt-2">{{ formatCurrency(kpis.montantARecouvrer) }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Potentiel de recouvrement</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-green-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Montant recouvré</h3>
                <p class="text-3xl font-extrabold text-green-600 mt-2">{{ formatCurrency(kpis.montantRecouvre) }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Objectif atteint à 70%</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 class="text-2xl font-bold text-gray-800">Gestion des Clients</h2>
          <button 
            @click="showAddClientModal = true"
            class="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Ajouter Client
          </button>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-center">
          <div class="max-w-xl w-full"> <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Rechercher un client par nom, email ou téléphone..."
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-gray-700"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Téléphone</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100"> <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-sky-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ client.nom }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-blue-100 text-blue-800': client.type === 'Particulier',
                      'bg-purple-100 text-purple-800': client.type === 'Entreprise',
                      'bg-green-100 text-green-800': client.type === 'Morale'
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ client.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ client.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ client.telephone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewClient(client)" class="text-sky-600 hover:text-sky-800 mr-4 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    Voir
                  </button>
                  <button @click="editClient(client)" class="text-indigo-600 hover:text-indigo-800 mr-4 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.232z"></path></svg>
                    Modifier
                  </button>
                  <button @click="deleteClient(client.id)" class="text-red-600 hover:text-red-800 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Supprimer
                  </button>
                </td>
              </tr>
              <tr v-if="filteredClients.length === 0">
                <td colspan="5" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">Aucun client trouvé.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="showAddClientModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div class="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
          <button @click="showAddClientModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Ajouter un nouveau client</h3>
          
          <form @submit.prevent="addClient">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="nom">Nom du client</label>
              <input
                v-model="newClient.nom"
                type="text"
                id="nom"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="type">Type de client</label>
              <select
                v-model="newClient.type"
                id="type"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 bg-white"
              >
                <option value="">Sélectionner un type</option>
                <option value="Particulier">Particulier</option>
                <option value="Entreprise">Entreprise</option>
                <option value="Morale">Morale</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Adresse Email</label>
              <input
                v-model="newClient.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="telephone">Numéro de Téléphone</label>
              <input
                v-model="newClient.telephone"
                type="tel"
                id="telephone"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
            </div>

            <div class="flex items-center justify-end space-x-3">
              <button
                type="button"
                @click="showAddClientModal = false"
                class="px-5 py-2.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200"
              >
                Ajouter Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/default.vue'
import { ref, reactive, computed } from 'vue'

// KPIs data
const kpis = reactive({
  clientsEnRetard: 5,
  montantARecouvrer: 1250000,
  montantRecouvre: 875000
})

// Search functionality
const searchTerm = ref('')

// Modal state
const showAddClientModal = ref(false)

// Clients data
const clients = ref([
  {
    id: 1,
    nom: 'Entreprise ABC',
    type: 'Morale',
    email: 'abc@entreprise.com',
    telephone: '+228 90 12 34 56'
  },
  {
    id: 2,
    nom: 'Jean Dupont',
    type: 'Particulier',
    email: 'jean.dupont@email.com',
    telephone: '+228 91 23 45 67'
  },
  {
    id: 3,
    nom: 'SARL Martin',
    type: 'Entreprise',
    email: 'contact@sarl-martin.com',
    telephone: '+228 92 34 56 78'
  },
  {
    id: 4,
    nom: 'Cabinet Digital',
    type: 'Morale',
    email: 'info@digital.com',
    telephone: '+228 93 45 67 89'
  },
  {
    id: 5,
    nom: 'Sophie Laurent',
    type: 'Particulier',
    email: 'sophie.l@email.com',
    telephone: '+228 94 56 78 90'
  },
  {
    id: 6,
    nom: 'Ets. Dubois',
    type: 'Entreprise',
    email: 'ets.dubois@email.com',
    telephone: '+228 95 67 89 01'
  }
])

// New client form
const newClient = reactive({
  nom: '',
  type: '',
  email: '',
  telephone: ''
})

// Computed properties
const filteredClients = computed(() => {
  if (!searchTerm.value) {
    return clients.value
  }
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
  return clients.value.filter(client =>
    client.nom.toLowerCase().includes(lowerCaseSearchTerm) ||
    client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
    client.telephone.includes(searchTerm.value) ||
    client.type.toLowerCase().includes(lowerCaseSearchTerm) // Ajout de la recherche par type
  )
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA'
}

const addClient = () => {
  const client = {
    id: clients.value.length + 1,
    ...newClient
  }
  clients.value.push(client)
  
  // Reset form
  Object.keys(newClient).forEach(key => {
    newClient[key] = ''
  })
  
  showAddClientModal.value = false
  alert('Client ajouté avec succès!')
}

const viewClient = (client) => {
  console.log('Viewing client:', client)
  // Implémenter la logique pour afficher les détails du client
  alert(`Détails de ${client.nom}:\nEmail: ${client.email}\nTéléphone: ${client.telephone}`)
}

const editClient = (client) => {
  console.log('Editing client:', client)
  // Implémenter la logique pour ouvrir un formulaire de modification pré-rempli
  alert(`Préparer la modification pour ${client.nom}`)
}

const deleteClient = (clientId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce client? Cette action est irréversible.')) {
    clients.value = clients.value.filter(c => c.id !== clientId)
    alert('Client supprimé avec succès!')
  }
}
</script>

<style scoped>
/* Pas de styles scoped supplémentaires nécessaires car Tailwind CSS est utilisé */
</style>