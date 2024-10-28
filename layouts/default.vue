<template>
  <main
    class="sm:p-12 p-6 grid grid-rows-[auto,1fr,auto] min-h-screen bg-yellow-50"
  >
    <header
      class="flex justify-between mb-8 pb-8 border-b-2 border-solid border-primary-700"
    >
      <NuxtLink to="/">
        <h1 class="text-3xl font-bold text-primary-700">Recipes</h1>
      </NuxtLink>
      <NuxtLink :to="{ name: 'recipe-new' }">
        <Button>New Recipe</Button>
      </NuxtLink>
    </header>
    <slot />
    <footer class="flex-1 place-content-end mt-8 w-full">
      <div class="border-t-2 border-solid border-primary-700 pt-8">
        <p>Made by Derek Martin</p>
      </div>
    </footer>
  </main>
</template>
