<template>
  <DefaultLayout>
    <main class="flex-1 p-6 bg-gray-50 min-h-screen">
      <!-- KPIs Cards -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-red-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Encours</h3>
                <p class="text-3xl font-extrabold text-red-600 mt-2">{{ formatCurrency(kpis.totalEncours) }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">{{ kpis.totalFactures }} factures</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-yellow-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Retards +30j</h3>
                <p class="text-3xl font-extrabold text-yellow-600 mt-2">{{ formatCurrency(kpis.retardsPlus30j) }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">{{ kpis.clientsEnRetard }} clients concernés</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-green-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Taux de Recouvrement</h3>
                <p class="text-3xl font-extrabold text-green-600 mt-2">{{ kpis.tauxRecouvrement }}%</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Ce mois-ci</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-blue-500 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Relances Envoyées</h3>
                <p class="text-3xl font-extrabold text-blue-600 mt-2">{{ kpis.relancesEnvoyees }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Cette semaine</p>
          </div>
        </div>
      </div>

      <!-- Filtres et Actions -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 class="text-2xl font-bold text-gray-800">Tableau de Bord Recouvrement</h2>
          <div class="flex gap-3">
            <button 
              @click="exportData"
              class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Exporter
            </button>
            <button 
              @click="showRelanceGroupee = true"
              class="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Relance Groupée
            </button>
          </div>
        </div>

        <!-- Filtres -->
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Commercial</label>
              <select v-model="filters.commercial" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="">Tous</option>
                <option value="Jean Dupont">Jean Dupont</option>
                <option value="Marie Martin">Marie Martin</option>
                <option value="Luc Bernard">Luc Bernard</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select v-model="filters.statut" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="">Tous</option>
                <option value="Payé">Payé</option>
                <option value="En retard">En retard</option>
                <option value="À venir">À venir</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Module</label>
              <select v-model="filters.module" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="">Tous</option>
                <option value="Vente">Vente</option>
                <option value="Appel d'offres">Appel d'offres</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Montant</label>
              <select v-model="filters.montant" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="">Tous</option>
                <option value="0-500">0 - 500€</option>
                <option value="500-2000">500 - 2000€</option>
                <option value="2000+">+ 2000€</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <input v-model="searchTerm" type="text" placeholder="Client, N° facture..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
            </div>
          </div>
        </div>

        <!-- Tableau des factures -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-2 py-3 text-left">
                  <input type="checkbox" @change="toggleSelectAll" class="rounded border-gray-300 text-sky-600 focus:ring-sky-500">
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Réf. Facture</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commercial</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Module</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Échéance</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Montant TTC</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="facture in filteredFactures" :key="facture.id" class="hover:bg-sky-50 transition-colors duration-150">
                <td class="px-2 py-4">
                  <input type="checkbox" v-model="selectedFactures" :value="facture.id" class="rounded border-gray-300 text-sky-600 focus:ring-sky-500">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ facture.reference }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ facture.client }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ facture.commercial }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-blue-100 text-blue-800': facture.module === 'Vente',
                      'bg-purple-100 text-purple-800': facture.module === 'Appel d\'offres',
                      'bg-green-100 text-green-800': facture.module === 'Maintenance'
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ facture.module }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ formatDate(facture.dateEcheance) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(facture.montant) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': facture.statut === 'Payé',
                      'bg-red-100 text-red-800': facture.statut.includes('En retard'),
                      'bg-yellow-100 text-yellow-800': facture.statut === 'À venir'
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ facture.statut }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="voirFacture(facture)" class="text-sky-600 hover:text-sky-800 mr-3 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Voir
                  </button>
                  <button v-if="facture.statut.includes('retard')" @click="relancerClient(facture)" class="text-orange-600 hover:text-orange-800 mr-3 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Relancer
                  </button>
                  <button v-if="facture.statut !== 'Payé'" @click="marquerPaye(facture)" class="text-green-600 hover:text-green-800 inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Payé
                  </button>
                </td>
              </tr>
              <tr v-if="filteredFactures.length === 0">
                <td colspan="9" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">Aucune facture trouvée.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Relance Groupée -->
      <div v-if="showRelanceGroupee" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Relance Groupée</h3>
            <button @click="showRelanceGroupee = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-600 mb-2">{{ selectedFactures.length }} factures sélectionnées</p>
            <div class="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
              <div v-for="id in selectedFactures" :key="id" class="text-xs text-gray-700">
                {{ factures.find(f => f.id === id)?.reference }} - {{ factures.find(f => f.id === id)?.client }}
              </div>
            </div>
          </div>

          <form @submit.prevent="envoyerRelanceGroupee">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Mode de relance</label>
              <select v-model="relanceForm.mode" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option value="email">Email</option>
                <option value="courrier">Courrier postal</option>
                <option value="appel">Appel téléphonique</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Objet</label>
              <input v-model="relanceForm.objet" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" value="Rappel paiement facture(s) en retard">
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea v-model="relanceForm.message" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">Cher Client,

Nos relevés indiquent un impayé pour les factures mentionnées ci-dessus.

Merci de régulariser votre situation dans les plus brefs délais.

Cordialement,
L'équipe Recouvrement</textarea>
            </div>

            <div class="flex justify-end gap-3">
              <button type="button" @click="showRelanceGroupee = false" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
                Envoyer les Relances
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

// KPIs
const kpis = reactive({
  totalEncours: 2450000,
  totalFactures: 156,
  retardsPlus30j: 380000,
  clientsEnRetard: 12,
  tauxRecouvrement: 78.5,
  relancesEnvoyees: 23
})

// Filtres
const filters = reactive({
  commercial: '',
  statut: '',
  module: '',
  montant: '',
})

const searchTerm = ref('')
const selectedFactures = ref([])
const showRelanceGroupee = ref(false)

// Formulaire de relance
const relanceForm = reactive({
  mode: 'email',
  objet: 'Rappel paiement facture(s) en retard',
  message: `Cher Client,

Nos relevés indiquent un impayé pour les factures mentionnées ci-dessus.

Merci de régulariser votre situation dans les plus brefs délais.

Cordialement,
L'équipe Recouvrement`
})

// Données des factures
const factures = ref([
  {
    id: 1,
    reference: 'FACT-2024-001',
    client: 'Entreprise ABC',
    commercial: 'Jean Dupont',
    module: 'Vente',
    dateEcheance: '2024-07-15',
    montant: 1200000,
    statut: 'En retard (15j)'
  },
  {
    id: 2,
    reference: 'FACT-2024-002',
    client: 'SARL Martin',
    commercial: 'Marie Martin',
    module: 'Maintenance',
    dateEcheance: '2024-07-20',
    montant: 750000,
    statut: 'Payé'
  },
  {
    id: 3,
    reference: 'FACT-2024-003',
    client: 'Cabinet Digital',
    commercial: 'Luc Bernard',
    module: 'Appel d\'offres',
    dateEcheance: '2024-08-25',
    montant: 3500000,
    statut: 'À venir'
  },
  {
    id: 4,
    reference: 'FACT-2024-004',
    client: 'Ets. Dubois',
    commercial: 'Jean Dupont',
    module: 'Vente',
    dateEcheance: '2024-06-30',
    montant: 890000,
    statut: 'En retard (25j)'
  },
  {
    id: 5,
    reference: 'FACT-2024-005',
    client: 'Sophie Laurent',
    commercial: 'Marie Martin',
    module: 'Maintenance',
    dateEcheance: '2024-08-10',
    montant: 450000,
    statut: 'À venir'
  }
])

// Computed
const filteredFactures = computed(() => {
  let result = factures.value

  if (filters.commercial) {
    result = result.filter(f => f.commercial === filters.commercial)
  }
  if (filters.statut) {
    result = result.filter(f => f.statut.includes(filters.statut))
  }
  if (filters.module) {
    result = result.filter(f => f.module === filters.module)
  }
  if (filters.montant) {
    result = result.filter(f => {
      const montant = f.montant / 1000 // Convertir en milliers pour simplifier
      if (filters.montant === '0-500') return montant <= 500
      if (filters.montant === '500-2000') return montant > 500 && montant <= 2000
      if (filters.montant === '2000+') return montant > 2000
      return true
    })
  }
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(f => 
      f.reference.toLowerCase().includes(term) ||
      f.client.toLowerCase().includes(term)
    )
  }

  return result
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedFactures.value = filteredFactures.value.map(f => f.id)
  } else {
    selectedFactures.value = []
  }
}

const voirFacture = (facture) => {
  console.log('Voir facture:', facture)
  // Rediriger vers la page de détail de la facture
}

const relancerClient = (facture) => {
  console.log('Relancer client pour facture:', facture)
  alert(`Relance envoyée pour la facture ${facture.reference}`)
}

const marquerPaye = (facture) => {
  if (confirm(`Marquer la facture ${facture.reference} comme payée ?`)) {
    facture.statut = 'Payé'
    alert('Facture marquée comme payée!')
  }
}

const envoyerRelanceGroupee = () => {
  if (selectedFactures.value.length === 0) {
    alert('Veuillez sélectionner au moins une facture')
    return
  }
  
  console.log('Envoi relance groupée:', {
    factures: selectedFactures.value,
    mode: relanceForm.mode,
    objet: relanceForm.objet,
    message: relanceForm.message
  })
  
  alert(`${selectedFactures.value.length} relances envoyées par ${relanceForm.mode}`)
  showRelanceGroupee.value = false
  selectedFactures.value = []
}

const exportData = () => {
  console.log('Export des données')
  alert('Export en cours...')
}
</script>