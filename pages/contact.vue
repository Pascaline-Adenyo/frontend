<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl h-[90vh] flex bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Section Formulaire -->
      <div class="flex-1 p-8 md:p-12 bg-white overflow-y-auto relative">
        <!-- Logo cliquable -->
        <NuxtLink to="/" class="absolute top-6 left-6 z-10">
          <img 
            src="C:\Users\Ambroise ADENYO\Desktop\stage_projet\images\télécharger.png" 
            alt="NeoStart Technology" 
            class="h-12 w-auto"
          />
        </NuxtLink>

        <div class="max-w-md mx-auto mt-16">
          <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Connexion
            </h1>
            <p class="text-gray-500">
              Accédez à votre espace professionnel
            </p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Champ E-mail -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail professionnel</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="votre@entreprise.com"
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 outline-none bg-white text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            
            <!-- Champ Mot de passe -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <NuxtLink to="/forgot-password" class="text-sm text-cyan-600 hover:text-cyan-800 transition-colors">
                  Mot de passe oublié ?
                </NuxtLink>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 outline-none bg-white text-gray-700 placeholder-gray-400"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  :aria-label="showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
                >
                  <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Options -->
            <div class="flex items-center justify-between">
              <label class="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  v-model="form.remember"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span class="text-sm">Se souvenir de moi</span>
              </label>
            </div>
            
            <!-- Bouton Connexion -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <span v-if="!isLoading">SE CONNECTER</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
            
            <!-- Lien d'inscription -->
            <p class="text-center text-sm text-gray-600">
              Nouveau sur la plateforme ? 
              <NuxtLink to="/signup" class="font-medium text-cyan-600 hover:text-cyan-800 transition-colors">
                Créer un compte
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
      
      <!-- Section Illustration -->
      <div class="hidden lg:flex flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-12 flex-col justify-center relative overflow-hidden">
        <!-- Motif de fond -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-xl"></div>
          <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        
        <div class="relative z-10">
          <div class="mb-8">
            <h2 class="text-4xl font-bold mb-4">NeoGestion Pro</h2>
            <p class="text-xl text-cyan-100">Votre solution tout-en-un pour :</p>
          </div>
          
          <ul class="space-y-6">
            <li class="flex items-start space-x-4">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="text-lg">Gestion centralisée des ventes et clients</span>
            </li>
            <li class="flex items-start space-x-4">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="text-lg">Suivi des appels d'offres et soumissions</span>
            </li>
            <li class="flex items-start space-x-4">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="text-lg">Maintenance informatique et gestion des tickets</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Meta tags pour SEO
useHead({
  title: 'Connexion - NeoGestion Pro',
  meta: [
    { name: 'description', content: 'Connectez-vous à votre espace professionnel NeoGestion Pro pour gérer vos ventes, appels d\'offres et maintenance informatique' }
  ]
})

// État du formulaire
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const isLoading = ref(false)

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Connexion avec:', form)
    
  } catch (error) {
    console.error('Erreur de connexion:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Animation d'entrée subtile */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-enter {
  animation: fade-in 0.6s ease-out forwards;
}

/* Transition pour les interactions */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personnalisée pour le panneau de formulaire */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>