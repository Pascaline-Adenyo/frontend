<template>
  <div class="min-h-screen flex items-center justify-center bg-[#93C5FD]">
    <div class="w-full max-w-4xl flex bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="hidden md:flex md:w-1/2 bg-[#000080] text-white flex-col justify-center items-center p-8">
        <div class="text-center space-y-4">
          
          <h1 class="text-4xl font-bold tracking-tight">Neo-MNS</h1>
        </div>
      </div>
      <!--Formulaire -->
      <div class="w-full md:w-1/2 p-8 md:p-10">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-center text-gray-800">Connexion</h2>
        </div>
        <form class="space-y-6">
          <div class="space-y-2">
            <label for="email"></label>
            <input id="email" type="email"placeholder="Email" class="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none transition"required />
          </div>
          <div class="space-y-2">
            <label for="password"></label>
            <input id="password" type="password"  placeholder="Mot de passe" class="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required />
          </div>
          <div class="space-y-2">
            <label for="role"></label>
            <input type="text" id="role" placeholder="Role" class="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-blue-200 focus:border-transparent focus:ring-2 transition">
          </div>
          <div class="flex-col items-center ">
            <div class="flex justify-center">
              <input id="remember" type="checkbox"class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
              <label for="remember" class="ml-2 block text-sm text-gray-700">Se souvenir de moi</label>
            </div><br>
            <div class="flex justify-center">
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">Mot de passe oublié ?</a>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="w-80 text-center bg-[#000080] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>