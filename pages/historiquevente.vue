<template>
  <DefaultLayout>
    <main class="flex-1 p-6 bg-gray-50 min-h-screen">
      <!-- 1. Tableau de Bord Recouvrement -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- KPI 1 -->
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-red-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Factures en retard</h3>
                <p class="text-3xl font-extrabold text-red-600 mt-2">{{ kpis.facturesEnRetard }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Dont {{ kpis.retardGrave }} > 60 jours</p>
          </div>

          <!-- KPI 2 -->
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-yellow-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Montant impayé</h3>
                <p class="text-3xl font-extrabold text-yellow-600 mt-2">{{ formatCurrency(kpis.montantImpaye) }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">{{ kpis.nbClientsEnRetard }} clients concernés</p>
          </div>

          <!-- KPI 3 -->
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">À recouvrer (30j)</h3>
                <p class="text-3xl font-extrabold text-blue-600 mt-2">{{ formatCurrency(kpis.aRecouvrer30j) }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Échéance proche</p>
          </div>

          <!-- KPI 4 -->
          <div class="bg-white rounded-xl shadow-lg p-5 border-t-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Taux recouvrement</h3>
                <p class="text-3xl font-extrabold text-green-600 mt-2">{{ kpis.tauxRecouvrement }}%</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-2">Sur les 30 derniers jours</p>
          </div>
        </div>
      </div>

      <!-- 2. Liste des Factures -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div class="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 class="text-2xl font-bold text-gray-800">Suivi des factures</h2>
          
          <div class="flex flex-wrap gap-3 w-full md:w-auto">
            <!-- Filtres -->
            <select v-model="filters.commercial" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
              <option value="">Tous les commerciaux</option>
              <option v-for="com in commerciaux" :value="com.id">{{ com.nom }}</option>
            </select>
            
            <select v-model="filters.statut" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
              <option value="">Tous statuts</option>
              <option value="paye">Payé</option>
              <option value="attente">En attente</option>
              <option value="retard">En retard</option>
            </select>
            
            <select v-model="filters.module" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
              <option value="">Tous modules</option>
              <option value="vente">Vente</option>
              <option value="ao">Appel d'offres</option>
              <option value="maintenance">Maintenance</option>
            </select>
            
            <button @click="exportToExcel" class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Exporter
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Réf. Facture</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commercial</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Module</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Échéance</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Montant</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="facture in filteredFactures" :key="facture.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ facture.reference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ facture.client }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ facture.commercial }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span :class="{
                    'bg-blue-100 text-blue-800': facture.module === 'vente',
                    'bg-purple-100 text-purple-800': facture.module === 'ao',
                    'bg-green-100 text-green-800': facture.module === 'maintenance'
                  }" class="px-2 py-1 text-xs font-semibold rounded-full">
                    {{ formatModule(facture.module) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ formatDate(facture.echeance) }}
                  <div v-if="facture.statut === 'retard'" class="text-xs text-red-500">
                    (+{{ daysLate(facture.echeance) }}j)
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                  {{ formatCurrency(facture.montant) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-green-100 text-green-800': facture.statut === 'paye',
                    'bg-yellow-100 text-yellow-800': facture.statut === 'attente',
                    'bg-red-100 text-red-800': facture.statut === 'retard'
                  }" class="px-2 py-1 text-xs font-semibold rounded-full">
                    {{ formatStatut(facture.statut) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewFacture(facture)" class="text-sky-600 hover:text-sky-800 mr-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button @click="relancer(facture)" class="text-orange-600 hover:text-orange-800 mr-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button v-if="facture.statut !== 'paye'" @click="enregistrerPaiement(facture)" class="text-green-600 hover:text-green-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredFactures.length === 0">
                <td colspan="8" class="px-6 py-4 text-center text-gray-500">Aucune facture trouvée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3. Détail Facture Modal -->
      <div v-if="selectedFacture" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 class="text-xl font-bold text-gray-800">Détails de la facture {{ selectedFacture.reference }}</h3>
            <button @click="selectedFacture = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Client</h4>
                <p class="text-lg font-semibold">{{ selectedFacture.client }}</p>
                <p class="text-gray-600">{{ selectedFacture.clientAdresse }}</p>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Commercial</h4>
                <p class="text-lg font-semibold">{{ selectedFacture.commercial }}</p>
                <p class="text-gray-600">{{ selectedFacture.commercialEmail }}</p>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Dates</h4>
                <div class="space-y-1">
                  <p>Émission: {{ formatDate(selectedFacture.emission) }}</p>
                  <p>Échéance: {{ formatDate(selectedFacture.echeance) }}</p>
                  <p v-if="selectedFacture.statut === 'retard'" class="text-red-500">
                    Retard: {{ daysLate(selectedFacture.echeance) }} jours
                  </p>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Paiement</h4>
                <div class="space-y-1">
                  <p>Montant: {{ formatCurrency(selectedFacture.montant) }}</p>
                  <p>Statut: 
                    <span :class="{
                      'text-green-600': selectedFacture.statut === 'paye',
                      'text-yellow-600': selectedFacture.statut === 'attente',
                      'text-red-600': selectedFacture.statut === 'retard'
                    }">
                      {{ formatStatut(selectedFacture.statut) }}
                    </span>
                  </p>
                  <p v-if="selectedFacture.datePaiement">Payé le: {{ formatDate(selectedFacture.datePaiement) }}</p>
                </div>
              </div>
            </div>
            
            <div class="mb-8">
              <h4 class="text-lg font-semibold mb-4">Prestations</h4>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="font-medium">{{ selectedFacture.description }}</p>
                <p class="text-sm text-gray-500 mt-1">Module: {{ formatModule(selectedFacture.module) }}</p>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold">Historique des relances</h4>
                <button @click="showRelanceModal = true" class="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm hover:bg-sky-700 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Nouvelle relance
                </button>
              </div>
              
              <div class="space-y-4">
                <div v-for="relance in selectedFacture.relances" :key="relance.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">{{ formatRelanceType(relance.type) }}</p>
                      <p class="text-sm text-gray-500">{{ formatDateTime(relance.date) }}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      Par {{ relance.auteur }}
                    </span>
                  </div>
                  <p class="mt-2 text-gray-700">{{ relance.commentaire }}</p>
                </div>
                
                <div v-if="selectedFacture.relances.length === 0" class="text-center py-8 text-gray-500">
                  Aucune relance effectuée pour cette facture
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Modal Nouvelle Relance -->
      <div v-if="showRelanceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Nouvelle relance</h3>
            <button @click="showRelanceModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="ajouterRelance">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Type de relance</label>
                <select v-model="nouvelleRelance.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="email">Email</option>
                  <option value="appel">Appel téléphonique</option>
                  <option value="courrier">Courrier</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <textarea v-model="nouvelleRelance.commentaire" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder="Détails de la relance..."></textarea>
              </div>
              
              <div class="flex justify-end space-x-3">
                <button type="button" @click="showRelanceModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- 5. Modal Paiement -->
      <div v-if="showPaiementModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Enregistrer un paiement</h3>
            <button @click="showPaiementModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="validerPaiement">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Facture</label>
                <p class="font-medium">{{ factureAPayer.reference }} - {{ formatCurrency(factureAPayer.montant) }}</p>
                <p class="text-gray-600">{{ factureAPayer.client }}</p>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de paiement</label>
                <input v-model="paiement.date" type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Mode de paiement</label>
                <select v-model="paiement.mode" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required>
                  <option value="virement">Virement</option>
                  <option value="cheque">Chèque</option>
                  <option value="especes">Espèces</option>
                  <option value="carte">Carte bancaire</option>
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Référence</label>
                <input v-model="paiement.reference" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder="N° de chèque/virement...">
              </div>
              
              <div class="flex justify-end space-x-3">
                <button type="button" @click="showPaiementModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Valider le paiement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DefaultLayout from '@/layouts/default.vue'

// KPIs
const kpis = reactive({
  facturesEnRetard: 24,
  retardGrave: 8,
  montantImpaye: 1850000,
  nbClientsEnRetard: 15,
  aRecouvrer30j: 620000,
  tauxRecouvrement: 72
})

// Filtres
const filters = reactive({
  commercial: '',
  statut: '',
  module: ''
})

// Données factures
const factures = ref([
  {
    id: 1,
    reference: 'FACT-2024-001',
    client: 'Entreprise ABC',
    clientAdresse: '123 Rue des Exemples, Lomé',
    commercial: 'Jean Dupont',
    commercialEmail: 'j.dupont@example.com',
    module: 'vente',
    description: 'Vente de matériel informatique',
    emission: '2024-06-01',
    echeance: '2024-07-15',
    montant: 1200000,
    statut: 'retard',
    relances: [
      {
        id: 1,
        type: 'email',
        date: '2024-07-16T10:30:00',
        auteur: 'Paul Compta',
        commentaire: 'Relance envoyée par email, client promet paiement sous 8 jours'
      },
      {
        id: 2,
        type: 'appel',
        date: '2024-07-20T14:15:00',
        auteur: 'Sophie Recouvrement',
        commentaire: 'Appel téléphonique, le client dit avoir des problèmes de trésorerie'
      }
    ]
  },
  {
    id: 2,
    reference: 'FACT-2024-002',
    client: 'SARL Martin',
    clientAdresse: '456 Avenue des Tests, Kara',
    commercial: 'Marie Martin',
    commercialEmail: 'm.martin@example.com',
    module: 'maintenance',
    description: 'Contrat maintenance annuelle',
    emission: '2024-06-10',
    echeance: '2024-07-20',
    montant: 750000,
    statut: 'paye',
    datePaiement: '2024-07-18',
    relances: []
  },
  {
    id: 3,
    reference: 'FACT-2024-003',
    client: 'Cabinet Digital',
    clientAdresse: '789 Boulevard des Essais, Sokodé',
    commercial: 'Luc Bernard',
    commercialEmail: 'l.bernard@example.com',
    module: 'ao',
    description: 'Projet digitalisation - Appel d\'offres',
    emission: '2024-06-15',
    echeance: '2024-07-25',
    montant: 3500000,
    statut: 'attente',
    relances: []
  }
])

// Commerciaux
const commerciaux = ref([
  { id: 1, nom: 'Jean Dupont' },
  { id: 2, nom: 'Marie Martin' },
  { id: 3, nom: 'Luc Bernard' }
])

// Sélections et modals
const selectedFacture = ref(null)
const showRelanceModal = ref(false)
const showPaiementModal = ref(false)
const factureAPayer = ref(null)

// Nouvelle relance
const nouvelleRelance = reactive({
  type: 'email',
  commentaire: ''
})

// Paiement
const paiement = reactive({
  date: new Date().toISOString().split('T')[0],
  mode: 'virement',
  reference: ''
})

// Fonctions de formatage
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'decimal', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(amount) + ' FCFA'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr)
  return date.toLocaleDateString('fr-FR') + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const formatStatut = (statut) => {
  const statuts = {
    'paye': 'Payé',
    'attente': 'En attente',
    'retard': 'En retard'
  }
  return statuts[statut] || statut
}

const formatModule = (module) => {
  const modules = {
    'vente': 'Vente',
    'ao': 'Appel d\'offres',
    'maintenance': 'Maintenance'
  }
  return modules[module] || module
}

const formatRelanceType = (type) => {
  const types = {
    'email': 'Email',
    'appel': 'Appel téléphonique',
    'courrier': 'Courrier',
    'sms': 'SMS'
  }
  return types[type] || type
}

const daysLate = (echeance) => {
  const echeanceDate = new Date(echeance)
  const today = new Date()
  const diffTime = today - echeanceDate
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)))
}

// Filtrage des factures
const filteredFactures = computed(() => {
  return factures.value.filter(facture => {
    const matchesCommercial = !filters.commercial || facture.commercial === commerciaux.value.find(c => c.id == filters.commercial)?.nom
    const matchesStatut = !filters.statut || facture.statut === filters.statut
    const matchesModule = !filters.module || facture.module === filters.module
    return matchesCommercial && matchesStatut && matchesModule
  })
})

// Actions
const viewFacture = (facture) => {
  selectedFacture.value = facture
}

const relancer = (facture) => {
  selectedFacture.value = facture
  showRelanceModal.value = true
}

const ajouterRelance = () => {
  if (!selectedFacture.value) return
  
  const newRelance = {
    id: selectedFacture.value.relances.length + 1,
    type: nouvelleRelance.type,
    date: new Date().toISOString(),
    auteur: 'Vous',
    commentaire: nouvelleRelance.commentaire
  }
  
  selectedFacture.value.relances.unshift(newRelance)
  nouvelleRelance.type = 'email'
  nouvelleRelance.commentaire = ''
  showRelanceModal.value = false
}

const enregistrerPaiement = (facture) => {
  factureAPayer.value = facture
  showPaiementModal.value = true
}

const validerPaiement = () => {
  const facture = factures.value.find(f => f.id === factureAPayer.value.id)
  if (facture) {
    facture.statut = 'paye'
    facture.datePaiement = paiement.date
    facture.relances.push({
      id: facture.relances.length + 1,
      type: 'paiement',
      date: new Date().toISOString(),
      auteur: 'Vous',
      commentaire: `Paiement enregistré (${paiement.mode}, réf: ${paiement.reference})`
    })
  }
  
  // Réinitialiser
  paiement.mode = 'virement'
  paiement.reference = ''
  showPaiementModal.value = false
  factureAPayer.value = null
}

const exportToExcel = () => {
  alert('Export Excel en cours de développement')
}
</script>

<style scoped>
/* Styles spécifiques si nécessaires */
</style>