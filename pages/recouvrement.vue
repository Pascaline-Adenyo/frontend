<template>
  <DefaultLayout>
    <div class="flex-1 p-6 bg-ice-50">
      <!-- Section titre avec fond ice -->
      <div class="bg-ice-50 pb-6">
        <h1 class="text-3xl font-bold text-blue-600 text-center">Gestion du Recouvrement</h1>
      </div>

      <!-- Section principale avec fond ice -->
      <div class="container mx-auto">
        <!-- Échéanciers en attente -->
        <div class="mb-10 bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-gray-700">Échéanciers en attente</h2>
            <button 
              @click="generateSchedule"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 text-base font-medium"
            >
              Générer un échéancier
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr class="bg-[#BFDBFE] text-left text-gray-800 uppercase text-sm leading-normal">
                  <th class="py-3 px-6">Client</th>
                  <th class="py-3 px-6">Montant total</th>
                  <th class="py-3 px-6">Échéance</th>
                  <th class="py-3 px-6">Montant payé</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 text-sm">
                <tr 
                  v-for="(schedule, index) in pendingSchedules" 
                  :key="index"
                  class="hover:bg-gray-50 transition duration-150 border-b border-gray-200"
                >
                  <td class="py-3 px-6">{{ schedule.client }}</td>
                  <td class="py-3 px-6">{{ schedule.totalAmount }}</td>
                  <td class="py-3 px-6">{{ schedule.dueDate }}</td>
                  <td class="py-3 px-6">{{ schedule.paidAmount }}</td>
                  <td class="py-3 px-6 text-center space-x-2">
                    <button 
                      @click="sendReminder(schedule)"
                      class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200 text-xs md:text-sm"
                    >
                      Rappel
                    </button>
                    <button 
                      @click="markAsPaid(schedule)"
                      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 text-xs md:text-sm"
                    >
                      Marquer Payé
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Historique des relances -->
        <div class="mb-10 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Historique des relances</h2>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ul class="space-y-2">
              <li 
                v-for="(reminder, index) in reminderHistory" 
                :key="index" 
                class="flex items-center text-gray-700"
              >
                <span class="mr-2">📧</span> {{ reminder }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Suivi des paiements partiels -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Suivi des paiements partiels</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr class="bg-[#BFDBFE] text-left text-gray-800 uppercase text-sm leading-normal">
                  <th class="py-3 px-6">Client</th>
                  <th class="py-3 px-6">Montant dû</th>
                  <th class="py-3 px-6">Montant payé</th>
                  <th class="py-3 px-6">Solde Statut</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 text-sm">
                <tr 
                  v-for="(payment, index) in partialPayments" 
                  :key="index" 
                  class="hover:bg-gray-50 transition duration-150 border-b border-gray-200"
                >
                  <td class="py-3 px-6">{{ payment.client }}</td>
                  <td class="py-3 px-6">{{ payment.dueAmount }}</td>
                  <td class="py-3 px-6">{{ payment.paidAmount }}</td>
                  <td class="py-3 px-6">
                    <span class="bg-orange-200 text-orange-800 py-1 px-3 rounded-full text-xs font-semibold">
                      {{ payment.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'

export default {
  name: 'RecouvrementPage',
  components: {
    DefaultLayout
  },
  data() {
    return {
      pendingSchedules: [
        { client: 'Client Alpha', totalAmount: '250 000 FCFA', dueDate: '2025-07-25', paidAmount: '0 FCFA' },
        { client: 'Entreprise Beta', totalAmount: '180 000 FCFA', dueDate: '2025-07-20', paidAmount: '50 000 FCFA' },
      ],
      reminderHistory: [
        'Mail envoyé à Pascaline A. - le 10/07/2025 à 10h00',
        'Appel téléphonique à Jean D. - le 08/07/2025 à 14h30 (non répondu)',
        'Mail envoyé à Entreprise Z - le 05/07/2025 à 09h00',
      ],
      partialPayments: [
        { client: 'Client Gamma', dueAmount: '500 000 FCFA', paidAmount: '300 000 FCFA', status: 'Partiel' },
        { client: 'Société Delta', dueAmount: '100 000 FCFA', paidAmount: '20 000 FCFA', status: 'Partiel' },
      ],
    };
  },
  methods: {
    generateSchedule() {
      console.log('Generate Schedule button clicked');
      // Logic to initiate schedule generation
    },
    sendReminder(schedule) {
      console.log('Send Reminder for:', schedule);
      // Logic to send a reminder
      alert(`Rappel envoyé à ${schedule.client}`);
    },
    markAsPaid(schedule) {
      console.log('Mark as Paid for:', schedule);
      // Logic to mark a schedule as paid
      alert(`${schedule.client}'s payment marked as paid`);
    },
  },
};
</script>

<style>
.bg-ice-50 {
  background-color: #f0f9ff;
}
</style>